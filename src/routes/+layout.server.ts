import { sanity } from "$lib/sanity.server";
import { allIssuesQuery } from "$lib/queries";
import { urlFor } from "$lib/imageUrl";

export const load = async () => {
  const allIssues = await sanity.fetch(allIssuesQuery);

  // Transform Sanity image objects to URLs, this is an internal processor
  const issues = allIssues.map((issue: any) => ({
    ...issue,
    issueThumbnail: urlFor(issue.issueThumbnail),
    issueCover: urlFor(issue.issueCover),
    CowElementImg: urlFor(issue.CowElementImg),
    ultraHoverImg: urlFor(issue.ultraHoverImg),
    UltraissueThumbnail: urlFor(issue.UltraissueThumbnail),
    // Transform gallery image arrays
    galleryImages: issue.galleryImgList
      ? issue.galleryImgList.map((img: any) => urlFor(img)).filter(Boolean)
      : [],
    UltraGalleryImages: issue.UltraGalleryFolder
      ? issue.UltraGalleryFolder.map((img: any) => urlFor(img)).filter(Boolean)
      : [],
  }));

  // This step is a conversion of the imported sanity query
  // Data loaded here is available to all child routes via $page.data

  return { issues };
};
