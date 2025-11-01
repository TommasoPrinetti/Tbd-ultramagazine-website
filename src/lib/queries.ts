import groq from "groq";

// Single query to get all issues with all fields
// Images are fetched with their asset references
// Articles are included as nested objects with section, thumbnail, title, description
export const allIssuesQuery = groq`*[_type == "issue"] | order(issueTitle asc) {
  _id,
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
  UltraissueTitle,
  UltraissueHeroText,
  UltraissueThumbnail{
    asset->,
    alt
  },
  UltraCowElementTitle,
  UltraCowElementText,
  UltraGalleryFolder[]{
    asset->,
    alt
  },
  layoutOption,
  manifestoTitle,
  manifestoText,
  fileDownloadButton
}`;
