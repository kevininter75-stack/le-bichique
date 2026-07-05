import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://la-bichique.vercel.app", // ⚠️ à remplacer par l'URL Vercel réelle
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
