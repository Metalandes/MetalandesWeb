import type { Image, PortableTextBlock } from "sanity";
import { client } from "./client";

/**
 * Segundos que una página puede mostrar contenido viejo antes de volver a
 * pedirlo a Sanity. Con el webhook configurado cada publicación se refleja al
 * instante y esto queda como red de seguridad; sin él (en local) se refresca
 * cada minuto.
 */
export const REFRESCO = process.env.SANITY_REVALIDATE_SECRET ? 3600 : 60;

/**
 * Una imagen cuya foto se borró en el Studio queda guardada como `{_type:
 * "image"}` sin archivo. Pedirle la URL a eso rompe la página, así que las
 * consultas sólo devuelven imágenes que de verdad tienen archivo.
 */
/** Lista de textos sin los renglones que quedaron vacíos en el Studio. */
const sinVacios = (lista?: (string | null)[]) =>
  lista?.filter((t): t is string => typeof t === "string" && t.trim() !== "");

const imagen = (campo: string) => `"${campo}": select(defined(${campo}.asset) => ${campo})`;

export type ProductoDoc = {
  _id: string;
  nombre: string;
  categoria: "media" | "baja";
  descripcion?: string;
  /** Viñetas técnicas de la ficha (corriente, tensión, protección…). */
  especificaciones?: string[];
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
    _id, nombre, categoria, descripcion, especificaciones, "galeria": galeria[defined(asset)]
  }
`;

export async function getProductos(categoria: "media" | "baja"): Promise<ProductoDoc[]> {
  const docs = await client.fetch<ProductoDoc[]>(
    PRODUCTOS_POR_CATEGORIA,
    { categoria },
    // Etiqueta de caché: al publicar en el Studio se revalida sólo esto.
    { next: { revalidate: REFRESCO, tags: ["producto"] } }
  );
  return docs.map((d) => ({ ...d, especificaciones: sinVacios(d.especificaciones) }));
}

/* --- Certificaciones --- */

export type CertificacionDoc = {
  _id: string;
  codigo: string;
  nombre: string;
  tipo: "iso" | "retie" | "sello";
  emisor?: string;
  validez?: string;
  /** Versión del documento: cambia al editarlo y renueva la imagen en caché. */
  rev: string;
  /** Dimensiones reales: los ISO son verticales y los RETIE horizontales. */
  ancho?: number;
  alto?: number;
};

export async function getCertificaciones(): Promise<CertificacionDoc[]> {
  return client.fetch(
    /* La imagen NO se consulta aquí: el navegador sólo recibe la versión con
       marca de agua de /api/certificado (los certificados se usaron para fraude). */
    `*[_type == "certificacion" && defined(imagen.asset)] | order(orden asc){
      _id, codigo, nombre, tipo, emisor, validez, "rev": _rev,
      "ancho": imagen.asset->metadata.dimensions.width,
      "alto": imagen.asset->metadata.dimensions.height
    }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["certificacion"] } }
  );
}

/* --- Preguntas frecuentes --- */

export type FaqDoc = { _id: string; pregunta: string; respuesta: string };

export async function getFaqs(): Promise<FaqDoc[]> {
  return client.fetch(
    `*[_type == "faq"] | order(orden asc){ _id, pregunta, respuesta }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["faq"] } }
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
  telefonoPqrs?: string;
  telefonoPqrsHref?: string;
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
    { next: { revalidate: REFRESCO, tags: ["contacto"] } }
  );
  return doc ?? {};
}

/* --- Páginas institucionales --- */

export type PoliticaDoc = {
  titulo?: string;
  intro?: string;
  cuerpo?: PortableTextBlock[];
  tarjetas?: { _key: string; titulo: string; texto: string }[];
  lista?: string[];
  cierre?: string;
  documentoUrl?: string;
};

export async function getPolitica(clave: string): Promise<PoliticaDoc | null> {
  const doc = await client.fetch<PoliticaDoc | null>(
    `*[_type == "politica" && clave == $clave][0]{
      titulo, intro, cuerpo, tarjetas, lista, cierre,
      "documentoUrl": documento.asset->url
    }`,
    { clave },
    { next: { revalidate: REFRESCO, tags: ["politica"] } }
  );
  return doc && { ...doc, lista: sinVacios(doc.lista) };
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
  _id, titulo, "slug": slug.current, fecha, categoria, extracto, ${imagen("portada")}
`;

/** Artículos publicados, del más reciente al más antiguo. */
export async function getPosts(): Promise<PostDoc[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(fecha desc){ ${CAMPOS_POST} }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["post"] } }
  );
}

export async function getPost(slug: string): Promise<PostDoc | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ${CAMPOS_POST},
      "contenido": contenido[_type != "image" || defined(asset)]
    }`,
    { slug },
    { next: { revalidate: REFRESCO, tags: ["post"] } }
  );
}

/* --- Portada --- */

export type TituloSeccionDoc = { texto?: string; destacado?: string };

export type PortadaDoc = {
  heroTitulo?: string;
  heroDestacado?: string;
  heroSubtitulo?: string;
  heroCta?: string;
  marquee?: string[];
  empresaTitulo?: string;
  empresaDestacado?: string;
  empresaTexto?: string;
  empresaImagen?: Image;
  valores?: { _key: string; titulo: string; texto: string }[];
  cifras?: { _key: string; valor: number; sufijo?: string; etiqueta: string }[];
  aliadosTitulo?: string;
  aliados?: string[];
  tituloServicios?: TituloSeccionDoc;
  tituloProductos?: TituloSeccionDoc;
  tituloCertificaciones?: TituloSeccionDoc;
  tituloFaq?: TituloSeccionDoc;
};

export async function getPortada(): Promise<PortadaDoc> {
  const doc = await client.fetch<PortadaDoc | null>(
    `*[_type == "portada"][0]{ ..., ${imagen("empresaImagen")} }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["portada"] } }
  );
  if (!doc) return {};
  return { ...doc, aliados: sinVacios(doc.aliados), marquee: sinVacios(doc.marquee) };
}

/* --- Servicios --- */

export type ServicioDoc = {
  _id: string;
  titulo: string;
  descripcion?: string;
  etiquetas?: string[];
  enlace?: string;
  imagen?: Image;
  items?: string[];
  detalle?: PortableTextBlock[];
  /** Tarjetas con foto de la página del servicio (preventivo, termografía…). */
  servicios?: { _key: string; titulo: string; descripcion?: string; imagen?: Image }[];
};

export async function getServicios(): Promise<ServicioDoc[]> {
  const docs = await client.fetch<ServicioDoc[]>(
    `*[_type == "servicio"] | order(orden asc){
      _id, titulo, descripcion, etiquetas, enlace, ${imagen("imagen")}, items, detalle,
      "servicios": servicios[defined(titulo) && titulo != ""]{ _key, titulo, descripcion, ${imagen("imagen")} }
    }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["servicio"] } }
  );
  return docs.map((d) => ({ ...d, etiquetas: sinVacios(d.etiquetas), items: sinVacios(d.items) }));
}

/* --- Proyectos --- */

export type ProyectoDoc = {
  _id: string;
  titulo: string;
  lugar?: string;
  anio?: string;
  categoria?: string;
  imagen?: Image;
};

export async function getProyectos(): Promise<ProyectoDoc[]> {
  return client.fetch(
    `*[_type == "proyecto"] | order(orden asc){
      _id, titulo, lugar, anio, categoria, ${imagen("imagen")}
    }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["proyecto"] } }
  );
}

/* --- Páginas de productos --- */

export type PaginaProductosDoc = {
  intro?: string;
  mediaTitulo?: string;
  mediaTexto?: string;
  mediaSpecs?: string[];
  mediaCatalogoTitulo?: string;
  mediaImagen?: Image;
  bajaTitulo?: string;
  bajaTexto?: string;
  bajaSpecs?: string[];
  bajaCatalogoTitulo?: string;
  bajaImagen?: Image;
};

/** Sin valores nulos: los campos vacíos quedan en undefined y la página usa su respaldo. */
const sinNulos = <T extends object>(o: T | null | undefined) =>
  Object.fromEntries(Object.entries(o ?? {}).filter(([, v]) => v != null)) as Partial<T>;

type CategoriaDoc = { titulo?: string; texto?: string; specs?: string[]; catalogoTitulo?: string; imagen?: Image };

/** Introducción del catálogo (Textos — Productos) y los textos de media y baja tensión. */
export async function getPaginaProductos(): Promise<PaginaProductosDoc> {
  const r = await client.fetch<{ intro?: string; media?: CategoriaDoc; baja?: CategoriaDoc }>(
    `{
      "intro": *[_id == "textos-productos"][0].intro,
      "media": *[_id == "categoria-media"][0]{ titulo, texto, specs, catalogoTitulo, ${imagen("imagen")} },
      "baja": *[_id == "categoria-baja"][0]{ titulo, texto, specs, catalogoTitulo, ${imagen("imagen")} }
    }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["textosPagina", "categoriaProductos"] } }
  );
  const m = sinNulos(r.media), b = sinNulos(r.baja);
  return sinNulos({
    intro: r.intro,
    mediaTitulo: m.titulo,
    mediaTexto: m.texto,
    mediaSpecs: sinVacios(m.specs),
    mediaCatalogoTitulo: m.catalogoTitulo,
    mediaImagen: m.imagen,
    bajaTitulo: b.titulo,
    bajaTexto: b.texto,
    bajaSpecs: sinVacios(b.specs),
    bajaCatalogoTitulo: b.catalogoTitulo,
    bajaImagen: b.imagen,
  });
}

export type ProductoDestacadoDoc = {
  _id: string;
  nombre: string;
  categoria: "media" | "baja";
  descripcion?: string;
  foto?: Image;
};

/**
 * Productos para la portada: los marcados «Mostrar en la portada» en el
 * Studio. Si nadie marcó ninguno, los primeros con foto, para que la sección
 * nunca quede vacía.
 */
export async function getProductosDestacados(): Promise<ProductoDestacadoDoc[]> {
  const campos = `_id, nombre, categoria, descripcion, "foto": galeria[defined(asset)][0]`;
  const { marcados, respaldo } = await client.fetch<{
    marcados: ProductoDestacadoDoc[];
    respaldo: ProductoDestacadoDoc[];
  }>(
    `{
      "marcados": *[_type == "producto" && destacado == true] | order(orden asc, nombre asc)[0...8]{ ${campos} },
      "respaldo": *[_type == "producto" && defined(galeria[0].asset)] | order(categoria desc, orden asc)[0...5]{ ${campos} }
    }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["producto"] } }
  );
  return marcados.length ? marcados : respaldo;
}

/** Cuántos productos hay publicados en cada tipo de subestación. */
export async function getConteoProductos(): Promise<{ media: number; baja: number }> {
  return client.fetch(
    `{
      "media": count(*[_type == "producto" && categoria == "media"]),
      "baja": count(*[_type == "producto" && categoria == "baja"])
    }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["producto"] } }
  );
}

/* --- Textos de las páginas internas --- */

export type TextosPaginasDoc = {
  empresaIntro?: string;
  empresaTexto?: string;
  certificacionesIntro?: string;
  certificacionesTexto?: string;
  serviciosIntro?: string;
  proyectosIntro?: string;
  blogIntro?: string;
  empresaImagen?: Image;
  trabajaImagen?: Image;
};

/**
 * Textos de las páginas internas: un documento por página en el Studio
 * (Textos — Empresa, Textos — Blog…). Campos vacíos quedan en undefined y
 * cada página usa su texto original.
 */
export async function getTextosPaginas(): Promise<TextosPaginasDoc> {
  const docs = await client.fetch<{ _id: string; intro?: string; texto?: string; imagen?: Image }[]>(
    `*[_type == "textosPagina"]{ _id, intro, texto, ${imagen("imagen")} }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["textosPagina"] } }
  );
  const de = (id: string) => docs.find((d) => d._id === `textos-${id}`);
  const textos: TextosPaginasDoc = {
    empresaIntro: de("empresa")?.intro,
    empresaTexto: de("empresa")?.texto,
    empresaImagen: de("empresa")?.imagen,
    certificacionesIntro: de("certificaciones")?.intro,
    certificacionesTexto: de("certificaciones")?.texto,
    serviciosIntro: de("servicios")?.intro,
    proyectosIntro: de("proyectos")?.intro,
    blogIntro: de("blog")?.intro,
    trabajaImagen: de("trabaja")?.imagen,
  };
  // Textos vacíos y fotos sin archivo se descartan: la página usa su respaldo.
  return Object.fromEntries(
    Object.entries(textos).filter(([, v]) => (typeof v === "string" ? v.trim() !== "" : v != null))
  ) as TextosPaginasDoc;
}

/* --- Navegación --- */

export type NavItemDoc = {
  _key?: string;
  label: string;
  href: string;
  children?: { _key?: string; label: string; href: string }[];
};

/** Una entrada sólo sirve si tiene texto y destino: sin uno de los dos no se
 *  puede pintar ni enlazar. Se descartan en vez de romper el menú entero,
 *  porque se editan a mano desde el Studio y quedan a medias con facilidad. */
const entradaUsable = (n: Partial<NavItemDoc> | undefined): n is NavItemDoc =>
  Boolean(n?.label?.trim() && n?.href?.trim());

/** Menú del sitio. Cae al menú del código si aún no se definió en el Studio. */
export async function getNavegacion(): Promise<NavItemDoc[] | null> {
  const doc = await client.fetch<{ items?: NavItemDoc[] } | null>(
    `*[_type == "navegacion"][0]{ items }`,
    {},
    { next: { revalidate: REFRESCO, tags: ["navegacion"] } }
  );
  const items = (doc?.items ?? []).filter(entradaUsable).map((item) => ({
    ...item,
    href: item.href.trim(),
    label: item.label.trim(),
    children: item.children?.filter(entradaUsable),
  }));
  return items.length ? items : null;
}
