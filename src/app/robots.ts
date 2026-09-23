import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /studio es el módulo de edición y /api el aviso de Sanity: nada que indexar.
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
    sitemap: "https://metalandes.net/sitemap.xml",
  };
}
