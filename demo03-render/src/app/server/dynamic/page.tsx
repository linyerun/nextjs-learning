import fs from "node:fs";
import mysql, { RowDataPacket } from "mysql2/promise";
import { connection } from "next/server";

// 允许阻塞：跳过静态壳校验，构建接受空prerender
export const instant = false;

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root123456",
  database: "catering",
});

export default async function () {
  await connection(); // 标记是动态组件内容
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM goods");
  const data = fs.readFileSync("src/app/server/data.json", "utf-8");
  const json = JSON.parse(data);
  return (
    <div>
      <h1>Server Page</h1>
      {json.age}///{json.name}///{json.city}
      <h3>mysql</h3>
      {rows.map((item: any) => (
        <div key={item.id}>
          {item.name}-{item.goods_price}
        </div>
      ))}
    </div>
  );
}
