import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        crawlDelay: 10,
      },
    ],
    sitemap: ["https://github.com"],
  };
}
