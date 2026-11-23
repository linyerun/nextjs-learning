/*
const nextConfig: NextConfig = {
  /!* config options here *!/
  reactStrictMode: false,
  /!*关闭缓存需要cacheComponents、partialPrefetching都设置为缓存*!/
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
};
export default nextConfig;
*/

import { PHASE_PRODUCTION_SERVER, PHASE_TYPE } from "next/constants";
import { NextConfig } from "next";

export default function (phase: PHASE_TYPE): NextConfig {
  return {
    devIndicators:
      phase === PHASE_PRODUCTION_SERVER ? false : { position: "bottom-left" }, // 正式环境关闭调试指示器
    reactStrictMode: false,
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
  };
}
