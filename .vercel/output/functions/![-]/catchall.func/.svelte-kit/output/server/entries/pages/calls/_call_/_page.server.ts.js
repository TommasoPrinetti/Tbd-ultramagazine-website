import { error } from "@sveltejs/kit";
function createSlug(title) {
  if (!title) return "";
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
async function load({
  params,
  parent
}) {
  const { issues, temporaryCalls } = await parent();
  const call = temporaryCalls.find(
    (c) => c._id === params.call || createSlug(c.title) === params.call.toLowerCase() || c.title?.toLowerCase() === params.call.toLowerCase()
  );
  if (!call) {
    throw error(404, "Call not found");
  }
  return {
    issues,
    call
  };
}
export {
  load
};
