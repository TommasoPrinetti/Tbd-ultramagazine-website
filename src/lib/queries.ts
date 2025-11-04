import groq from "groq";

// Single query to get all issues with all fields
// Images are fetched with their asset references
// Articles are included as nested objects with section, thumbnail, title, description
export const allIssuesQuery = groq`*[_type == "issue"] | order(issueTitle asc) {
  _id,
  showPage,
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
    section,
    thumbnail{
      asset->,
      alt
    },
    title,
    description
  },
  CowElementText,
  CowElementImg{
    asset->,
    alt
  },
  CowImgDidascalia,
  isIssueUltra,
  ultraCover{
    asset->,
    alt
  },
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
  UltraCowElementTitle,
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
  layoutOption,
  manifestoTitle,
  manifestoText,
  fileDownloadButton
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
  referenceEmail,
  hrefExternal,
  downloadPdf{
    asset->,
    url
  }
}`;
