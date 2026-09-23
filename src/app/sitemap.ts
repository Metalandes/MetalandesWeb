import type { MetadataRoute } from "next";
import { getPosts } from "@/sanity/queries";

const BASE = "https://metalandes.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = [
    "",
    "/empresa",
    "/empresa/gestion-integral",
    "/empresa/certificaciones",
    "/empresa/tratamiento-datos",
    "/servicios",
    "/servicios/mantenimiento",
    "/productos",
    "/productos/media-tension",
    "/productos/baja-tension",
    "/contacto",
    "/proyectos",
    "/blog",
    "/trabaja-con-nosotros",
    "/pqr",
  ];
  const paginas = routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  // Los artículos se publican desde el Studio: se listan solos para que los buscadores los encuentren.
  const articulos = (await getPosts()).map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(`${p.fecha}T12:00:00`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...paginas, ...articulos];
}
