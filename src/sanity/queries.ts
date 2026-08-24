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

/* --- Certificaciones --- */

export type CertificacionDoc = {
  _id: string;
  codigo: string;
  nombre: string;
  tipo: "iso" | "retie";
  emisor?: string;
  validez?: string;
  imagen?: Image;
  /** Dimensiones reales: los ISO son verticales y los RETIE horizontales. */
  ancho?: number;
  alto?: number;
};

export async function getCertificaciones(): Promise<CertificacionDoc[]> {
  return client.fetch(
    `*[_type == "certificacion"] | order(orden asc){
      _id, codigo, nombre, tipo, emisor, validez, imagen,
      "ancho": imagen.asset->metadata.dimensions.width,
      "alto": imagen.asset->metadata.dimensions.height
    }`,
    {},
    { next: { revalidate: 60, tags: ["certificacion"] } }
  );
}

/* --- Preguntas frecuentes --- */

export type FaqDoc = { _id: string; pregunta: string; respuesta: string };

export async function getFaqs(): Promise<FaqDoc[]> {
  return client.fetch(
    `*[_type == "faq"] | order(orden asc){ _id, pregunta, respuesta }`,
    {},
    { next: { revalidate: 60, tags: ["faq"] } }
  );
}

/* --- Datos de contacto --- */

export type ContactoDoc = {
  direccion?: string;
  telefono?: string;
  telefonoHref?: string;
  whatsapp?: string;
  whatsappHref?: string;
  email?: string;
  emailCalidad?: string;
  emergencia?: string;
  emergenciaHref?: string;
  extensiones?: { _key: string; area: string; ext: string }[];
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
};

/**
 * Documento único de contacto. Si aún no existe en Sanity se devuelven los
 * valores del código, para que el sitio nunca quede sin teléfono ni correo.
 */
export async function getContacto(): Promise<ContactoDoc> {
  const doc = await client.fetch<ContactoDoc | null>(
    `*[_type == "contacto"][0]`,
    {},
    { next: { revalidate: 60, tags: ["contacto"] } }
  );
  return doc ?? {};
}

/* --- Páginas institucionales --- */

export type PoliticaDoc = {
  titulo?: string;
  intro?: string;
  cuerpo?: PortableTextBlock[];
  documentoUrl?: string;
};

export async function getPolitica(clave: string): Promise<PoliticaDoc | null> {
  return client.fetch(
    `*[_type == "politica" && clave == $clave][0]{
      titulo, intro, cuerpo, "documentoUrl": documento.asset->url
    }`,
    { clave },
    { next: { revalidate: 60, tags: ["politica"] } }
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
