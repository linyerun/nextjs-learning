import fs from "node:fs";

/**
 * 静态内容展示
 * 适用场景：仅依赖同步 I/O（如 fs.readFileSync）、模块导入、纯计算的组件
 * */

export default async function () {
  const data = fs.readFileSync("src/app/server/static/data.json", "utf-8"); //本地文件读取
  const json = JSON.parse(data);

  const impData = await import("@/app/server/static/data.json"); //模块导入
  const names = impData.list.map((item) => item.name).join(","); //纯计算

  // 可以看到浏览器打印下面日志都带上Prerender
  console.log(json);
  console.log(impData);
  console.log(names);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {json.list.map((item: any) => (
          <li key={item.id}>
            {item.name} - {item.age}
          </li>
        ))}
      </ul>
    </div>
  );
}
