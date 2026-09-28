import { sanity } from "$lib/sanity.server";
import { allIssuesQuery, allTemporaryCallsQuery, siteSettingsQuery } from "$lib/queries";
import { urlFor } from "$lib/imageUrl";

export const load = async () => {
  const [allIssues, allTemporaryCalls, siteSettings] = await Promise.all([
    sanity.fetch(allIssuesQuery),
    sanity.fetch(allTemporaryCallsQuery),
    // Optional singleton — null until created in Studio, never throws
    sanity.fetch(siteSettingsQuery).catch(() => null),
  ]);

  // Transform Sanity image objects to URLs, this is an internal processor
  const issues = allIssues.map((issue: any) => ({
    ...issue,
    issueThumbnail: urlFor(issue.issueThumbnail),
    issueCover: urlFor(issue.issueCover),
    CowElementImg: urlFor(issue.CowElementImg),
    ultraHoverImg: urlFor(issue.ultraHoverImg),
    UltraissueThumbnail: urlFor(issue.UltraissueThumbnail),
    UltraCowElementImg: urlFor(issue.UltraCowElementImg),
    // Transform gallery image arrays
    galleryImages: issue.galleryImgList
      ? issue.galleryImgList.map((img: any) => urlFor(img)).filter(Boolean)
      : [],
    UltraGalleryImages: issue.UltraGalleryFolder
      ? issue.UltraGalleryFolder.map((img: any) => urlFor(img)).filter(Boolean)
      : [],
  }));

  // Transform Sanity image and file objects to URLs for temporary calls
  const temporaryCalls = allTemporaryCalls.map((call: any) => ({
    ...call,
    image: urlFor(call.image),
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
    ? urlFor(siteSettings.promoFeature.image)
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
