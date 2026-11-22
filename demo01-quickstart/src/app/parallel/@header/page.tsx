export default async function () {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      <h1>Header</h1>
    </>
  );
}
