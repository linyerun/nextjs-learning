import type { MetadataRoute } from "next";

/*
// 一份sitemap的写法
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://example.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
      images: ["http://localhost:3000/xxxxxxxxxx.jpg"],
    },
    {
      url: "https://example.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      videos: [
        {
          thumbnail_loc: "http://localhost:3000/xxxxxxxxxx.jpg",
          title: "视频标题",
          description: "视频描述",
          duration: 100,
          publication_date: new Date(),
        },
      ],
    },
    {
      url: "https://example.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
*/

// 多份sitemap的写法
/** 每个 id 对应一份子 sitemap */
export async function generateSitemaps() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

const SEGMENT_BY_ID: Record<string, string> = {
  "1": "post",
  "2": "user",
  "3": "new",
};

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  const segment = SEGMENT_BY_ID[id]; //根据id获取对应的segment
  if (!segment) return [];

  const num = 5; //模拟生成5条URL
  const entries: MetadataRoute.Sitemap = [];

  for (let i = 0; i < num; i++) {
    entries.push({
      url: `http://localhost:3000/demo/${segment}/${i}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
