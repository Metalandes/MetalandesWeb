/**
 * Pasa los textos de las páginas a un documento por página, para que en el
 * Studio cada sección del menú tenga los suyos:
 *
 *   «Introducciones de páginas» (textosPaginas)  → Textos — Empresa, Certificaciones,
 *                                                   Servicios, Proyectos, Blog, Trabaja
 *   «Páginas de productos» (paginaProductos)     → Textos — Productos (introducción),
 *                                                   media tensión y baja tensión
 *
 * Seguro de repetir: sólo crea los documentos nuevos que no existan, así que
 * nunca pisa lo editado en el Studio. Los documentos viejos se borran aparte,
 * cuando el sitio ya lee los nuevos:
 *
 *   node scripts/migrar-textos-por-pagina.mjs
 *   node scripts/migrar-textos-por-pagina.mjs --borrar-viejos
 */
import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("\nFalta SANITY_API_WRITE_TOKEN en .env.local\n");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token,
  apiVersion: "2026-08-23",
  useCdn: false,
});

const t = (await client.getDocument("textosPaginas")) ?? {};
const p = (await client.getDocument("paginaProductos")) ?? {};

const nuevos = [
  { _id: "textos-empresa", _type: "textosPagina", intro: t.empresaIntro, texto: t.empresaTexto, imagen: t.empresaImagen },
  { _id: "textos-certificaciones", _type: "textosPagina", intro: t.certificacionesIntro, texto: t.certificacionesTexto },
  { _id: "textos-productos", _type: "textosPagina", intro: p.intro },
  { _id: "textos-servicios", _type: "textosPagina", intro: t.serviciosIntro },
  { _id: "textos-proyectos", _type: "textosPagina", intro: t.proyectosIntro },
  { _id: "textos-blog", _type: "textosPagina", intro: t.blogIntro },
  { _id: "textos-trabaja", _type: "textosPagina", imagen: t.trabajaImagen },
  {
    _id: "categoria-media",
    _type: "categoriaProductos",
    titulo: p.mediaTitulo,
    texto: p.mediaTexto,
    specs: p.mediaSpecs,
    catalogoTitulo: p.mediaCatalogoTitulo,
    imagen: p.mediaImagen,
  },
  {
    _id: "categoria-baja",
    _type: "categoriaProductos",
    titulo: p.bajaTitulo,
    texto: p.bajaTexto,
    specs: p.bajaSpecs,
    catalogoTitulo: p.bajaCatalogoTitulo,
    imagen: p.bajaImagen,
  },
].map((d) => Object.fromEntries(Object.entries(d).filter(([, v]) => v != null)));

const tx = client.transaction();
for (const d of nuevos) tx.createIfNotExists(d);
await tx.commit();
console.log("✓ documentos por página:", nuevos.map((d) => d._id).join(", "));

if (process.argv.includes("--borrar-viejos")) {
  const faltan = await client.fetch(`count(*[_id in $ids])`, { ids: nuevos.map((d) => d._id) });
  if (faltan !== nuevos.length) {
    console.error("\nNo están todos los documentos nuevos; no se borra nada.\n");
    process.exit(1);
  }
  const viejos = ["textosPaginas", "paginaProductos", "drafts.textosPaginas", "drafts.paginaProductos"];
  const b = client.transaction();
  for (const id of viejos) b.delete(id);
  await b.commit();
  console.log("✓ borrados los documentos viejos (Introducciones de páginas y Páginas de productos)");
}
