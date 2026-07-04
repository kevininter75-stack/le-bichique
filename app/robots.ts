import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://timahimahi.vercel.app/sitemap.xml", // ⚠️ à remplacer par le domaine définitif
  };
}
