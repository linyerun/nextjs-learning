import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  /*关闭缓存需要cacheComponents、partialPrefetching都设置为缓存*/
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // 协议
        hostname: "eo-img.521799.xyz", // 主机名
        pathname: "/i/pc/**", // 路径
        port: "", // 端口
      },
    ],
    formats: ["image/avif", "image/webp"], //默认是 ['image/webp']，把本地图片转格式返回
  },
};

export default nextConfig;
