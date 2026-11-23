import { Ma_Shan_Zheng } from "next/font/google"; //引入字体库

// https://fonts.google.com/, 到这个网站找需要的字体即可

// 字体加载要连接外网，失败了重新npm run dev一下

const bbhHegarty = Ma_Shan_Zheng({
  weight: "400", //字体粗细 (不是所有字体都支持可变字体)
  display: "swap", //字体显示方式, 字体还没加载到本地使用备用字体渲染
});

export default function () {
  return (
    <div className={bbhHegarty.className}>
      <h1>你好111</h1>
      <h1>Nice to meet you!</h1>
    </div>
  );
}
