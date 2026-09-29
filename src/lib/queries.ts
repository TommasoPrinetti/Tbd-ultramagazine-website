import groq from "groq";

// Single query to get all issues with all fields
// Images are fetched with their asset references
// Articles are included as nested objects with section, thumbnail, title, description
export const allIssuesQuery = groq`*[_type == "issue"] | order(coalesce(releaseOrder, 9999) asc, issueTitle asc) {
  _id,
  showPage,
  releaseOrder,
  showGallery,
  showManifesto,
  showCow,
  showArticles,
  isLatestIssue,
  issueTitle,
  issueHeroText,
  issueThumbnail{
    asset->,
    alt
  },
  issueCover{
    asset->,
    alt
  },
  issuePrice,
  issueCategory,
  issueNumber,
  galleryImgList[]{
    asset->,
    alt
  },
  articles[]{
    _key,
    section,
    thumbnail{
      asset->,
      alt
    },
    title,
    description,
    showReadAll,
    slug,
    legacyName,
    hero{
      asset->,
      alt
    },
    autore,
    note_autore,
    ultra,
    body[]{
      ...,
      asset->{
        url
      },
      images[]{
        ...,
        asset->{
          url
        }
      }
    },
    showDidascalie,
    didascalie,
    showBibliografia,
    bibliografie
  },
  CowElementText,
  CowElementImg{
    asset->,
    alt
  },
  CowImgDidascalia,
  isIssueUltra,
  ultraHoverImg{
    asset->,
    alt
  },
  UltraissueTitle,
  UltraissueHeroText,
  UltraissueThumbnail{
    asset->,
    alt
  },
  UltraCowElementText,
  UltraCowElementImg{
    asset->,
    alt
  },
  UltraCowImgDidascalia,
  UltraGalleryFolder[]{
    asset->,
    alt
  },
  manifestoTitle,
  manifestoText,
  fileDownloadButton,
  manifestoFile{
    asset->{
      url
    }
  },
  manifestoDownloadLabel
}`;

// Query to get all Temporary Calls
export const allTemporaryCallsQuery = groq`*[_type == "temporaryCall"] | order(_createdAt desc) {
  _id,
  showPage,
  _createdAt,
  title,
  image{
    asset->,
    alt
  },
  description,
  ctaText,
  openDate,
  endDate,
  hrefExternal,
  downloadPdf{
    asset->,
    url
  },
  // Homepage promo / top-banner controls (optional — absent on older docs)
  bannerEnabled,
  bannerText,
  bannerUrl,
  promoEnabled
}`;

// Singleton for homepage chrome: top banner toggle + promo feature.
// Create a `siteSettings` document with _id == "homepage" in Studio
// (project 8c5n4win). Absent → frontend falls back to temporaryCalls[0].
export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "homepage"][0] {
  topBanner {
    enabled,
    text,
    url
  },
  promoFeature {
    enabled,
    mode,
    title,
    image {
      asset->,
      alt
    },
    ctaLabel,
    ctaUrl
  }
}`;
