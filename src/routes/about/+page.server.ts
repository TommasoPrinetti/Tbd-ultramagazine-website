export async function load({
  parent,
}: {
  parent: () => Promise<{ issues: any[] }>;
}) {
  const { issues } = await parent();

  return {
    issues,
  };
}
