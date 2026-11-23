import { Suspense } from "react";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { cacheLife } from "next/cache";

/**
 * 动态内容展示
 * 适用场景：fetch请求、cookies、headers等动态数据
 *
 * 动态内容必须配合Suspense使用
 *
 * 文章: https://juejin.cn/post/7582958136258215972
 *
 * TODO 测试前把浏览器的Disable Cache关闭
 * */

const DynamicContent1 = async () => {
  const data = await fetch("https://www.mocklib.com/mock/random/name"); //随机生成一个名称

  const json = await data.json();
  console.log(json); // 浏览器打印的Server在打印json的内容

  const cookieStore = await cookies(); //获取cookie
  console.log(cookieStore);

  return (
    <div>
      <h2>动态内容</h2>
      <main>
        <ul>
          <li>名称：{json.name}</li>
        </ul>
      </main>
    </div>
  );
};

const DynamicContent2 = async () => {
  /**
   * 只有使用了fetch请求、cookies、headers等才被任务是动态组件，不然当静态组件了，但是random和now都是变化的导致程序爆粗提醒
   * 解决的办法就是加一个: await connection()或者使用fetch函数,还可以加"use cache;"变成缓存组件
   * */
  /**
   * connection() 的语义是：
   * "从这里开始，后面的代码必须等到真实请求到来才能执行"——它会让预渲染在此处停住，把后续内容推迟到请求时。
   * */
  await connection();
  // const data = await fetch("https://www.mocklib.com/mock/random/name");
  // const json = await data.json();
  const random = Math.random();
  const now = Date.now();
  return (
    <div>
      <h2>动态内容</h2>
      <main>
        <ul>
          <li>名称：{random}</li>
          <li>时间：{now}</li>
          {/*<li>data: {JSON.stringify(json)}</li>*/}
        </ul>
      </main>
    </div>
  );
};

const DynamicContent3 = async () => {
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

export default async function () {
  return (
    <>
      <div>
        <h1>DynamicPage</h1>
        <Suspense fallback={<div>动态内容Loading...</div>}>
          {/*<DynamicContent1 />*/}
          {/*<DynamicContent2 />*/}
          <DynamicContent3 />
        </Suspense>
      </div>
    </>
  );
}
