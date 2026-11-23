import fs from "node:fs"; //引入fs模块
import mysql, { RowDataPacket } from "mysql2/promise";
import { Suspense } from "react";
import { connection } from "next/server"; //操作数据库 仅供演示 非最佳实践

/*服务端组件，不带交互的，它里面可以嵌套客户端组件，但是客户端组件不能嵌套服务端组件*/

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root123456",
  database: "catering",
});

const DynamicComp = async function () {
  await connection(); // nextjs无法识别这个是动态组件, 所以我们加一下这个标志
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
};

export default function () {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComp />
      </Suspense>
    </>
  );
}
