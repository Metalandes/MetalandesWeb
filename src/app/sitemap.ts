import type { MetadataRoute } from "next";

const BASE = "https://metalandes.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/empresa", "/servicios", "/productos", "/contacto", "/proyectos"];
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
}
