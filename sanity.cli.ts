import { defineCliConfig } from "sanity/cli";

/**
 * Configuración para la línea de comandos de Sanity (`npx sanity ...`):
 * validar documentos, exportar respaldos del contenido, etc.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
