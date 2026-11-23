import LocalFont from "next/font/local"; //引入字体库

// https://fonts.google.com/, 到这个网站找需要的字体即可

// 字体加载要连接外网，失败了重新npm run dev一下

// src 是相对"当前文件"的路径，不是项目根目录；文件实际在 src/ZhiyongDatongFont.ttf
const localFont = LocalFont({
  src: "./ZhiyongDatongFont.ttf", // 字体放在local目录下,下载地址https://link.juejin.cn/?target=https%3A%2F%2Fnextjs-docs-henna-six.vercel.app%2FZhiyongDatongFont.ttf
  weight: "400", //静态字体要显式声明字重
  display: "swap", //字体显示方式, 字体还没加载到本地使用备用字体渲染
});

export default function () {
  return (
    <div className={localFont.className}>
      <h1>你好111</h1>
      <h1>Nice to meet you!</h1>
    </div>
  );
}
