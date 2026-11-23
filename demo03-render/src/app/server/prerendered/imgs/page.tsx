import { Suspense } from "react";

const DynamicComp = async function () {
  //这个接口随机返回一个二次元图片
  // const randomImage = await fetch("https://www.loliapi.com/acg/pc?type=json");
  // const data = await randomImage.json();
  // console.log(data);

  const data = await fetch("https://picflare.netlify.app/api/picflare");
  const buffer = await data.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  return (
    <div>
      {/*<img width={500} height={500} src={data.url} alt="random image" />*/}
      <img
        className="w-100 h-100"
        src={`data:image/jpeg;base64,${base64}`}
        alt="random image"
      />
    </div>
  );
};

export default function () {
  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <DynamicComp />
      </Suspense>
    </>
  );
}
