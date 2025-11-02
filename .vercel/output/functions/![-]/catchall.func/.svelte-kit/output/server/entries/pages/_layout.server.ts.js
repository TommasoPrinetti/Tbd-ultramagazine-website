import { createClient } from "@sanity/client";
import { b as private_env } from "../../chunks/shared-server.js";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
const sanity = createClient({
  projectId: private_env.SANITY_PROJECT_ID,
  dataset: private_env.SANITY_DATASET,
  apiVersion: private_env.SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
  token: private_env.SANITY_READ_TOKEN
});
const allIssuesQuery = groq`*[_type == "issue"] | order(issueTitle asc) {
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
const allTemporaryCallsQuery = groq`*[_type == "temporaryCall"] | order(_createdAt desc) {
  _id,
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
const builder = imageUrlBuilder({
  projectId: private_env.SANITY_PROJECT_ID,
  dataset: private_env.SANITY_DATASET
});
function urlFor(source) {
  if (!source || !source.asset) return null;
  return builder.image(source).url();
}
const load = async () => {
  const [allIssues, allTemporaryCalls] = await Promise.all([
    sanity.fetch(allIssuesQuery),
    sanity.fetch(allTemporaryCallsQuery)
  ]);
  const issues = allIssues.map((issue) => ({
    ...issue,
    issueThumbnail: urlFor(issue.issueThumbnail),
    issueCover: urlFor(issue.issueCover),
    CowElementImg: urlFor(issue.CowElementImg),
    ultraHoverImg: urlFor(issue.ultraHoverImg),
    UltraissueThumbnail: urlFor(issue.UltraissueThumbnail),
    UltraCowElementImg: urlFor(issue.UltraCowElementImg),
    // Transform gallery image arrays
    galleryImages: issue.galleryImgList ? issue.galleryImgList.map((img) => urlFor(img)).filter(Boolean) : [],
    UltraGalleryImages: issue.UltraGalleryFolder ? issue.UltraGalleryFolder.map((img) => urlFor(img)).filter(Boolean) : []
  }));
  const temporaryCalls = allTemporaryCalls.map((call) => ({
    ...call,
    image: urlFor(call.image),
    downloadPdfUrl: call.downloadPdf?.asset?.url || null
  }));
  return { issues, temporaryCalls };
};
export {
  load
};
