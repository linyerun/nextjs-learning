export default async function () {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <>
      <h1>等待几秒后成功渲染</h1>
    </>
  );
}
