"use client";
import { ReactNode, useEffect, useState } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  // 一定要加[],不然重新渲染也会触发回调函数了
  useEffect(() => {
    console.log("layout被挂载");
    return () => {
      console.log("layout被卸载");
    };
  }, []);
  return (
    <>
      <h1>Blog Layout Header</h1>
      <button onClick={() => setCount(count + 1)}>count++</button>
      <h1>count: {count}</h1>
      <hr />
      {children}
      <hr />
      <h1>Blog Layout Footer</h1>
    </>
  );
}
