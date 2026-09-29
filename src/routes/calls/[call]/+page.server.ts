import { error } from "@sveltejs/kit";

// Helper function to create a slug from a title
function createSlug(title: string | null | undefined): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function load({
  params,
  parent,
}: {
  params: { call: string };
  parent: () => Promise<{ issues: any[]; temporaryCalls: any[] }>;
}) {
  const { issues, temporaryCalls } = await parent();

  // Find call by _id, slugified title, or raw title (for backwards compatibility)
  const call = temporaryCalls.find(
    (c: any) =>
      c._id === params.call ||
      createSlug(c.title) === params.call.toLowerCase() ||
      c.title?.toLowerCase() === params.call.toLowerCase()
  );

  if (!call) {
    throw error(404, "Call not found");
  }

  return {
    issues,
    call,
  };
}
