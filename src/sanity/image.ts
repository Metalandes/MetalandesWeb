import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Construye la URL de una imagen subida desde el Studio.
 *
 * Sanity redimensiona y convierte el formato en su CDN, así que la foto que
 * suba marketing —aunque venga pesada del celular— se sirve optimizada sin que
 * nadie tenga que prepararla.
 */
export function urlFor(source: Image) {
  return builder.image(source).auto("format").fit("max");
}
