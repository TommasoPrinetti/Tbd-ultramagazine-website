import { sanity } from "$lib/sanity.server";
import { allIssuesQuery, allTemporaryCallsQuery, siteSettingsQuery } from "$lib/queries";
import { urlForOptimized } from "$lib/imageUrl";

// Display width per image role (proportional downscale + auto format + q80).
// One URL per image keeps the CDN cache efficient.
const W = {
  thumb: 800, // cards, article thumbnails
  hero: 1200, // issue/article heroes, og:image
  editorial: 1600, // full-width cow elements, article body images
  gallery: 1920, // full-viewport previews
  call: 1200, // temporary-call artwork
  promo: 1200, // homepage promo artwork
};

// Rewrites an expanded asset.url in place with an optimized CDN URL.
// Keeps object shape ({asset, alt, crop…}) so components need no changes.
function swapUrl<T extends { asset?: any }>(img: T, width: number): T {
  if (!img?.asset) return img;
  const next = urlForOptimized(img as any, width);
  if (next) img.asset = { ...img.asset, url: next };
  return img;
}

// Nested articles keep raw {asset->{...}} objects (thumbnails, hero, PT
// body). Optimize them here so components never touch raw asset.url.
function optimizeNestedArticle(article: any) {
  if (!article || typeof article !== 'object') return article;
  const out = { ...article };
  if (out.thumbnail) out.thumbnail = swapUrl({ ...out.thumbnail }, W.thumb);
  if (out.hero) out.hero = swapUrl({ ...out.hero }, W.hero);
  if (Array.isArray(out.body)) {
    out.body = out.body.map((blk: any) => {
      if (!blk || typeof blk !== 'object') return blk;
      if (blk._type === 'bodyImage' && blk.asset?.url) {
        const next = urlForOptimized(blk, W.editorial);
        if (next) return { ...blk, asset: { ...blk.asset, url: next } };
      }
      if (blk._type === 'gallery' && Array.isArray(blk.images)) {
        return {
          ...blk,
          images: blk.images.map((im: any) => {
            if (!im?.asset?.url) return im;
            const next = urlForOptimized(im, W.gallery);
            return next ? { ...im, asset: { ...im.asset, url: next } } : im;
          }),
        };
      }
      return blk;
    });
  }
  return out;
}

export const load = async () => {
  const [allIssues, allTemporaryCalls, siteSettings] = await Promise.all([
    sanity.fetch(allIssuesQuery),
    sanity.fetch(allTemporaryCallsQuery),
    // Optional singleton — null until created in Studio, never throws
    sanity.fetch(siteSettingsQuery).catch(() => null),
  ]);

  // Transform Sanity image objects to optimized CDN URLs, this is an internal processor.
  // Raw gallery arrays are destructured out: nothing consumes them client-side
  // and their bare asset.urls would leak unoptimized URLs into the payload.
  const issues = allIssues.map((issue: any) => {
    const { galleryImgList, UltraGalleryFolder, ...rest } = issue;
    return {
      ...rest,
    issueThumbnail: urlForOptimized(issue.issueThumbnail, W.hero),
    issueCover: urlForOptimized(issue.issueCover, W.thumb),
    CowElementImg: urlForOptimized(issue.CowElementImg, W.editorial),
    ultraHoverImg: urlForOptimized(issue.ultraHoverImg, W.thumb),
    UltraissueThumbnail: urlForOptimized(issue.UltraissueThumbnail, W.hero),
    UltraCowElementImg: urlForOptimized(issue.UltraCowElementImg, W.editorial),
    // Transform gallery image arrays
    galleryImages: galleryImgList
      ? galleryImgList.map((img: any) => urlForOptimized(img, W.gallery)).filter(Boolean)
      : [],
    UltraGalleryImages: UltraGalleryFolder
      ? UltraGalleryFolder.map((img: any) => urlForOptimized(img, W.gallery)).filter(Boolean)
      : [],
    // Nested articles (thumbnails, hero, portable-text body)
    articles: Array.isArray(issue.articles)
      ? issue.articles.map(optimizeNestedArticle)
      : issue.articles,
    };
  });

  // Transform Sanity image and file objects to URLs for temporary calls
  const temporaryCalls = allTemporaryCalls.map((call: any) => ({
    ...call,
    image: urlForOptimized(call.image, W.call),
    downloadPdfUrl: call.downloadPdf?.asset?.url || null,
  }));

  // Homepage chrome: prefer siteSettings singleton, fall back to
  // temporaryCalls[0] so existing Studio docs keep working.
  const primaryCall = temporaryCalls[0] ?? null;
  const topBanner = siteSettings?.topBanner ?? {
    enabled: primaryCall?.bannerEnabled ?? true,
    text:
      primaryCall?.bannerText ??
      (primaryCall?.title ? ` © TBD ULTRAMAGAZINE - ${primaryCall.title} - ` : " © TBD ULTRAMAGAZINE - "),
    url: primaryCall?.bannerUrl ?? primaryCall?.hrefExternal ?? null,
  };
  const promoImage = siteSettings?.promoFeature?.image
    ? urlForOptimized(siteSettings.promoFeature.image, W.promo)
    : null;
  const homepagePromo = siteSettings?.promoFeature ?? {
    enabled: primaryCall?.promoEnabled ?? true,
    mode: "temporaryCall" as const,
    title: null,
    image: null,
    ctaLabel: null,
    ctaUrl: null,
  };

  return { issues, temporaryCalls, siteSettings, topBanner, homepagePromo: { ...homepagePromo, image: promoImage ?? homepagePromo.image } };
};
