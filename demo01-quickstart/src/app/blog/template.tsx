"use client";
import { ReactNode, useEffect, useState } from "react";

export default function ({ children }: { children: ReactNode }) {
  // 一定要加[],不然重新渲染也会触发回调函数了
  useEffect(() => {
    console.log("template被挂载");
    return () => {
      console.log("template被卸载");
    };
  }, []);
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Blog Template Header</h1>
      <button onClick={() => setCount(count + 1)}>count++</button>
      <h1>count: {count}</h1>
      <hr />
      {children}
      <hr />
      <h1>Blog Template Footer</h1>
    </>
  );
}
