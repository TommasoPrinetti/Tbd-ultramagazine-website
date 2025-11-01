import { error } from "@sveltejs/kit";

export async function load({
  params,
  parent,
  depends,
}: {
  params: { issue: string };
  parent: () => Promise<{ issues: any[] }>;
  depends: (id: string) => void;
}) {
  // Ensure this load function runs when params change
  depends(`issue:${params.issue}`);

  // Get issues from layout
  const { issues } = await parent();

  // Find issue by issueTitle (routing is based on issueTitle, not issueNumber)
  const issue = issues.find((issue: any) => issue.issueTitle === params.issue);

  if (!issue) {
    throw error(404, "Issue not found");
  }

  return {
    issue,
    issues, // Include issues from layout for use in component
  };
}
