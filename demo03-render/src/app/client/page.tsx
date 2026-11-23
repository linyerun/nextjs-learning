"use client";
import { useEffect, useState } from "react";
console.log("client");

/*客户端组件，带交互的页面*/

export default function ServerPage() {
  const [count, setCount] = useState(0);
  console.log("client X");
  useEffect(() => {
    console.log(document, window);
  }, []);
  return (
    <div>
      <h1>Server Page</h1>
      <button onClick={() => setCount(count + 1)}>点击</button>
      <p>{count}</p>
    </div>
  );
}
