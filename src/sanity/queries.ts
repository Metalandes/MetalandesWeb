import type { Image } from "sanity";
import { client } from "./client";

export type ProductoDoc = {
  _id: string;
  nombre: string;
  categoria: "media" | "baja";
  descripcion?: string;
  imagen?: Image;
};

/**
 * Productos de una subestación, ordenados por el campo `orden` y, a igualdad,
 * alfabéticamente. El orden lo controla marketing desde el Studio.
 */
const PRODUCTOS_POR_CATEGORIA = `
  *[_type == "producto" && categoria == $categoria]
  | order(orden asc, nombre asc){
    _id, nombre, categoria, descripcion, imagen
  }
`;

export async function getProductos(categoria: "media" | "baja"): Promise<ProductoDoc[]> {
  return client.fetch(
    PRODUCTOS_POR_CATEGORIA,
    { categoria },
    // Etiqueta de caché: al publicar en el Studio se revalida sólo esto.
    { next: { revalidate: 60, tags: ["producto"] } }
  );
}
