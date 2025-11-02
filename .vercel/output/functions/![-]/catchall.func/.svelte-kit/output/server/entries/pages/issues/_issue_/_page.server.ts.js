import { error } from "@sveltejs/kit";
async function load({
  params,
  parent,
  depends
}) {
  depends(`issue:${params.issue}`);
  const { issues, temporaryCalls } = await parent();
  const issue = issues.find((issue2) => issue2.issueTitle === params.issue);
  if (!issue) {
    throw error(404, "Issue not found");
  }
  return {
    issue,
    issues,
    temporaryCalls
  };
}
export {
  load
};
