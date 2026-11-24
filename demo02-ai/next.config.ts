import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  /*输出精简的 standalone 产物，供 Docker 运行（.next/standalone/server.js）*/
  output: "standalone",
  /*cacheComponents + partialPrefetching 是一套组合（PPR / 组件级缓存 + 局部预取），负责服务端渲染、路由预加载加速*/
  /*关闭缓存需要cacheComponents、partialPrefetching都设置为缓存*/
  cacheComponents: true,
  partialPrefetching: true,
  /*reactCompiler 是 React 编译优化器，负责客户端组件自动 memo 减少重渲染*/
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
