"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

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
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
