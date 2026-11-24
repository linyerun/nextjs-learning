import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      // 只处理全局 CSS；放过 *.module.css，交给 Turbopack 原生 CSS Modules（否则类名不会被哈希，styles 导出为空）
      "global.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
