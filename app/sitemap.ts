import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://timahimahi.vercel.app", // ⚠️ à remplacer par le domaine définitif
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
