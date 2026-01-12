import { sanity } from "$lib/sanity.server";
import { allIssuesQuery, allTemporaryCallsQuery } from "$lib/queries";
import { urlFor } from "$lib/imageUrl";

export const load = async () => {
  const [allIssues, allTemporaryCalls] = await Promise.all([
    sanity.fetch(allIssuesQuery),
    sanity.fetch(allTemporaryCallsQuery),
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

  return { issues, temporaryCalls };
};
