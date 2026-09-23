import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Cliente de lectura del sitio público.
 *
 * `useCdn: false`: el caché lo lleva Next (ver REFRESCO en queries.ts), no la
 * CDN de Sanity. Con la CDN en medio, una publicación podía tardar un par de
 * minutos más en verse porque Next revalidaba y recibía la respuesta vieja.
 * Como Next sólo consulta a Sanity al revalidar, el volumen de peticiones
 * queda muy por debajo del límite del plan gratuito.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
