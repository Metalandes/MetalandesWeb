import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Cliente de lectura del sitio público.
 *
 * `useCdn: true` sirve el contenido desde la CDN de Sanity: las páginas siguen
 * siendo rápidas aunque el contenido ya no esté en el código. Next revalida el
 * caché cuando el contenido cambia, así que editar en el Studio se refleja en
 * el sitio sin recompilar.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
