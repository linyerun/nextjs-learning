import { Suspense } from "react";
import { cacheLife } from "next/cache";

const DynamicContent = async () => {
  /**
   * "use cache" 的语义是："这个函数体是一个可缓存单元，
   * 没有请求也必须能完整跑完"——Next 会在 prerender/build 阶段执行它来填充缓存，之后所有请求复用结果。
   *
   * use cache后面不能跟connection,不然直接程序开死了,所以程序会直接报错
   * */
  "use cache";
  cacheLife("hours"); //使用预设参数
  const random = Math.random();
  const now = Date.now();
  return (
    <div>
      <h2>动态内容</h2>
      <main>
        <ul>
          <li>名称：{random}</li>
          <li>时间：{now}</li>
        </ul>
      </main>
    </div>
  );
};

export default DynamicContent;

/*export default function () {
  return (
    <>
      <div>
        <h1>DynamicPage</h1>
        <Suspense fallback={<div>动态内容Loading...</div>}>
          <DynamicContent />
        </Suspense>
      </div>
    </>
  );
}*/
