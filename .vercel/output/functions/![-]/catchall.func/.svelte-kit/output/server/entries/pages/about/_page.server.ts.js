async function load({
  parent
}) {
  const { issues, temporaryCalls } = await parent();
  return {
    issues,
    temporaryCalls
  };
}
export {
  load
};
