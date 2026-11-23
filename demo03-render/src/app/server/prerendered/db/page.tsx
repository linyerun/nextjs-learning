import fs from "node:fs"; //引入fs模块
import mysql, { RowDataPacket } from "mysql2/promise";
import { Suspense } from "react";
import { connection } from "next/server"; //操作数据库 仅供演示 非最佳实践

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root123456",
  database: "catering",
});

/**
 * 只有使用了fetch请求、cookies、headers等才被认为是动态内容，不然当静态内容了，但是pool.query是变化的导致程序报错提醒
 * 解决的办法就是加一个: await connection()
 *
 * connection() 的语义是："从这里开始，后面的代码必须等到真实请求到来才能执行"——它会让预渲染在此处停住，把后续内容推迟到请求时。
 *   意思是, await connection()可以进行服务端预渲染, 后面的内容收到浏览器请求到服务端后再渲染, 最后以gzip格式返回给浏览器
 * */

const DynamicComp = async function () {
  const data = fs.readFileSync("src/app/server/data.json", "utf-8");
  const json = JSON.parse(data);
  await connection(); // nextjs无法识别这个是动态内容, 所以我们加一下这个标志
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM goods");
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
