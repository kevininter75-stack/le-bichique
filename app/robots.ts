import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://la-bichique.vercel.app/sitemap.xml", // ⚠️ à remplacer par l'URL Vercel réelle
  };
}
