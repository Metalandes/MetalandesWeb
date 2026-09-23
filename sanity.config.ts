"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { esESLocale } from "@sanity/locale-es-es";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";
import { structure, TIPOS_UNICOS } from "@/sanity/structure";

/**
 * Studio embebido en el propio sitio, servido en /studio.
 *
 * Se monta dentro de la app en vez de como proyecto aparte: un solo
 * repositorio, un solo despliegue, y marketing entra a metalandes.net/studio
 * sin tener que ir a otra aplicación.
 */
export default defineConfig({
  name: "metalandes",
  title: "Metalandes — contenido",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Menús, botones y avisos del Studio en español.
    esESLocale(),
    /* Vision es una consola de consultas para programadores: sólo en local,
       para que quien edita no vea una pestaña que no le sirve. */
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
  /* Funciones de los planes pagos que este proyecto no usa. Apagadas, el
     Studio deja de consultar por ellas (cada consulta devolvía 403 en la
     consola) y no muestra botones que no harían nada en el plan gratuito. */
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  tasks: { enabled: false },
  // Novedades de Sanity en la esquina de la pantalla: ruido para quien edita.
  announcements: { enabled: false },
  document: {
    // Los comentarios son del plan pago: al vencer la prueba dejarían de funcionar.
    comments: { enabled: false },
    /* En los documentos únicos no ofrecemos duplicar ni borrar: son piezas
       fijas del sitio y perderlas dejaría páginas sin contenido. */
    actions: (prev, { schemaType }) =>
      TIPOS_UNICOS.includes(schemaType)
        ? prev.filter(({ action }) => action !== "duplicate" && action !== "delete")
        : prev,
  },
});
