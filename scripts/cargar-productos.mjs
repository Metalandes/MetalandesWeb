/**
 * Carga inicial del catálogo de productos en Sanity.
 *
 * Lee las carpetas MEDIA_TENSION y BAJA_TENSION, agrupa las fotos por producto
 * según el prefijo del nombre de archivo (SWTCHGEAR1.jpg, SWTCHGEAR2.jpg → un
 * solo producto con dos fotos) y crea un documento por producto con su galería.
 *
 * Es idempotente: usa un _id derivado del producto, así que volver a correrlo
 * actualiza en vez de duplicar.
 *
 *   node scripts/cargar-productos.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "\nFalta SANITY_API_WRITE_TOKEN en .env.local.\n" +
      "Generalo en sanity.io/manage → proyecto → API → Tokens (permiso Editor).\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-23",
  useCdn: false,
});

/**
 * Catálogo: prefijo del archivo → nombre visible.
 * El orden del arreglo es el orden en que se muestran en la web.
 */
const CATALOGO = {
  media: [
    ["SWTCHGEAR", "Switchgear"],
    ["SUBESTACIONESMOVILES", "Subestaciones móviles"],
    ["SUBESTACIONESENSAMBLADAS", "Subestaciones ensambladas"],
    ["SISTEMASDEMEDIATENSION", "Sistemas de media tensión"],
    ["SECCIONADOR", "Seccionador"],
    ["FABRICACIONSUBESTACIONES", "Fabricación de subestaciones"],
    ["CENTROSDETRANSFORMADOR", "Centros de transformación"],
    ["CELDASDETRANSFORMADOR", "Celdas de transformador"],
  ],
  baja: [
    ["TRANSFERENCIASENBAJATENSION", "Transferencias en baja tensión"],
    ["TABLEROSENACEROINOX", "Tableros en acero inoxidable"],
    ["TABLEROSDEDISTRIBUCIONDEBT", "Tableros de distribución de baja tensión"],
    ["RACKS", "Racks"],
    ["GABINETES_INTEMPERIE", "Gabinetes intemperie"],
    ["GABINETESDEMEDIDACODENSA", "Gabinete de medida Codensa"],
    ["FILTROSYUPS", "Filtros y UPS"],
    ["CCM", "CCM"],
    ["BOMBEOS", "Bombeos"],
    ["BARRAJES", "Barrajes"],
    ["BANCOSDECAPACITORES", "Bancos de capacitores"],
  ],
};

const CARPETAS = { media: "MEDIA_TENSION", baja: "BAJA_TENSION" };

/** Archivos de una carpeta que pertenecen a un producto, en orden numérico. */
function fotosDe(carpeta, prefijo, todosLosPrefijos) {
  return readdirSync(carpeta)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .filter((f) => {
      const base = f.toUpperCase();
      if (!base.startsWith(prefijo)) return false;
      // Evita que "RACKS" capture archivos de un prefijo más largo que lo contenga.
      const masEspecifico = todosLosPrefijos.find(
        (p) => p !== prefijo && p.startsWith(prefijo) && base.startsWith(p)
      );
      return !masEspecifico;
    })
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
}

async function main() {
  let productos = 0;
  let fotos = 0;

  for (const [categoria, lista] of Object.entries(CATALOGO)) {
    const carpeta = CARPETAS[categoria];
    const prefijos = lista.map(([p]) => p);

    for (const [indice, [prefijo, nombre]] of lista.entries()) {
      const archivos = fotosDe(carpeta, prefijo, prefijos);

      if (archivos.length === 0) {
        console.warn(`  ⚠ ${nombre}: sin fotos (prefijo ${prefijo})`);
        continue;
      }

      const galeria = [];
      for (const archivo of archivos) {
        const ruta = join(carpeta, archivo);
        const asset = await client.assets.upload("image", readFileSync(ruta), {
          filename: archivo,
        });
        galeria.push({
          _type: "image",
          _key: archivo.replace(/[^a-zA-Z0-9]/g, "").slice(0, 40),
          asset: { _type: "reference", _ref: asset._id },
        });
        fotos++;
      }

      await client.createOrReplace({
        _id: `producto-${categoria}-${prefijo.toLowerCase().replace(/_/g, "-")}`,
        _type: "producto",
        nombre,
        categoria,
        orden: (indice + 1) * 10,
        galeria,
      });

      productos++;
      console.log(`  ✓ ${nombre} — ${archivos.length} foto(s)`);
    }
  }

  console.log(`\nListo: ${productos} productos, ${fotos} fotos subidas.`);
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
