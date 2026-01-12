export async function load({
  parent,
}: {
  parent: () => Promise<{ issues: any[]; temporaryCalls: any[] }>;
}) {
  const { issues, temporaryCalls } = await parent();

  return {
    issues,
    temporaryCalls,
  };
}
