import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "demo04-ch15+",
  description: "Chapter 15+ demo built on the demo01-quickstart scaffold",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/*全局引入, 放在其他page里面就属于局部引入了; beforeInteractive 会被 Next.js 注入到 <head> 并在 hydration 前执行, 保证下面的内联脚本能拿到 Vue*/}
        <Script
          id="1111"
          src="https://unpkg.com/vue@3/dist/vue.global.js"
          strategy="beforeInteractive"
        />
        {/*内联脚本: lazyOnload 在页面 load 之后、浏览器空闲时执行, 此时 React hydration 已完成, 页面 DOM 不会被再次替换*/}
        <Script id="VGUBHJMK6" strategy="lazyOnload">
          {`
            const el = document.querySelector('#app')
            if (window.Vue && el) {
              const { createApp } = Vue
              createApp({
                template: '<h1>{{ message }}</h1>',
                setup() {
                  return {
                    message: 'Next.js + Vue.js'
                  }
                }
              }).mount(el)
            }
          `}
        </Script>
      </body>
    </html>
  );
}
