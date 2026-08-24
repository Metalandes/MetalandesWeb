import type { Image, PortableTextBlock } from "sanity";
import { client } from "./client";

export type ProductoDoc = {
  _id: string;
  nombre: string;
  categoria: "media" | "baja";
  descripcion?: string;
  /** La primera foto es la que representa al producto en el catálogo. */
  galeria?: Image[];
};

/**
 * Productos de una subestación, ordenados por el campo `orden` y, a igualdad,
 * alfabéticamente. El orden lo controla marketing desde el Studio.
 */
const PRODUCTOS_POR_CATEGORIA = `
  *[_type == "producto" && categoria == $categoria]
  | order(orden asc, nombre asc){
    _id, nombre, categoria, descripcion, galeria
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

/* --- Blog --- */

export type PostDoc = {
  _id: string;
  titulo: string;
  slug: string;
  fecha: string;
  categoria?: string;
  extracto?: string;
  portada?: Image;
  contenido?: PortableTextBlock[];
};

const CAMPOS_POST = `
  _id, titulo, "slug": slug.current, fecha, categoria, extracto, portada
`;

/** Artículos publicados, del más reciente al más antiguo. */
export async function getPosts(): Promise<PostDoc[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(fecha desc){ ${CAMPOS_POST} }`,
    {},
    { next: { revalidate: 60, tags: ["post"] } }
  );
}

export async function getPost(slug: string): Promise<PostDoc | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ ${CAMPOS_POST}, contenido }`,
    { slug },
    { next: { revalidate: 60, tags: ["post"] } }
  );
}
