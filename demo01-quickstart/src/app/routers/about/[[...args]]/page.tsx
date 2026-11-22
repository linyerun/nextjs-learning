"use client";
import { useParams } from "next/navigation";

export default function () {
  /**
   * [参数名]: 必须是/about/xxx
   * [...参数名]: 必须是 /about/xxx/[.../xxx]
   * 想要变成可选的, 那就在加一层[], eg: [[参数名]]、[[...参数名]]
   * */
  const pathParams = useParams<{ args: string[] }>();
  return (
    <>
      <h1>About</h1>
      <div>pathParams: [{pathParams.args.toString()}]</div>
    </>
  );
}
