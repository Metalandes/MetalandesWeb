import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /studio es el módulo de edición: no debe aparecer en buscadores.
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: "https://metalandes.net/sitemap.xml",
  };
}
