import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { apiVersion } from "./env";

/**
 * Organización del panel lateral del Studio.
 *
 * Copia la barra de navegación del sitio: Inicio, Empresa, Productos,
 * Servicios, Proyectos, Blog, Trabaja con nosotros y Contacto, cada una con
 * sus subpáginas en el mismo orden. Quien edita busca por el nombre que ve en
 * la página y ahí mismo encuentra todo lo que se cambia en ella.
 *
 * Las piezas fijas (portada, textos de cada página, páginas institucionales,
 * contacto, menú) se abren directo en su formulario: no tiene sentido mostrar
 * una lista con un solo elemento ni dejar que alguien cree un segundo por
 * error.
 */

/** Un documento fijo que se abre directo en su formulario. */
const unico = (S: StructureBuilder, titulo: string, tipo: string, id: string) =>
  S.listItem()
    .title(titulo)
    .id(id)
    .schemaType(tipo)
    .child(S.document().schemaType(tipo).documentId(id).title(titulo));

/** "Textos de la página" de una sección. */
const textos = (S: StructureBuilder, id: string, titulo = "Textos de la página") =>
  unico(S, titulo, "textosPagina", id);

/** Carpeta del panel con las piezas de una página. */
const carpeta = (S: StructureBuilder, titulo: string, id: string, items: ReturnType<StructureBuilder["listItem"]>[]) =>
  S.listItem().title(titulo).id(id).child(S.list().title(titulo).id(id).items(items));

/** Productos de un tipo de subestación; los nuevos ya nacen en esa categoría. */
const productos = (S: StructureBuilder, categoria: "media" | "baja", titulo: string) =>
  S.listItem()
    .title(titulo)
    .id(`productos-${categoria}`)
    .schemaType("producto")
    .child(
      S.documentList()
        .title(titulo)
        .schemaType("producto")
        .apiVersion(apiVersion)
        .filter('_type == "producto" && categoria == $categoria')
        .params({ categoria })
        .defaultOrdering([{ field: "orden", direction: "asc" }])
        .initialValueTemplates([S.initialValueTemplateItem(`producto-${categoria}`)])
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido del sitio")
    .items([
      carpeta(S, "Inicio", "inicio", [
        unico(S, "Portada", "portada", "portada"),
        S.documentTypeListItem("faq").title("Preguntas frecuentes"),
      ]),

      carpeta(S, "Empresa", "empresa", [
        textos(S, "textos-empresa"),
        unico(S, "Gestión integral", "politica", "politica-gestion-integral"),
        carpeta(S, "Certificaciones", "certificaciones", [
          textos(S, "textos-certificaciones"),
          S.documentTypeListItem("certificacion").title("Certificados"),
        ]),
        unico(S, "Tratamiento de datos", "politica", "politica-tratamiento-datos"),
        unico(S, "PQRS", "politica", "politica-pqr"),
      ]),

      carpeta(S, "Productos", "productos", [
        textos(S, "textos-productos"),
        carpeta(S, "Subestaciones media tensión", "media-tension", [
          unico(S, "Textos de la página", "categoriaProductos", "categoria-media"),
          productos(S, "media", "Productos de media tensión"),
        ]),
        carpeta(S, "Subestaciones baja tensión", "baja-tension", [
          unico(S, "Textos de la página", "categoriaProductos", "categoria-baja"),
          productos(S, "baja", "Productos de baja tensión"),
        ]),
      ]),

      carpeta(S, "Servicios", "servicios", [
        textos(S, "textos-servicios"),
        S.documentTypeListItem("servicio").title("Servicios (Mantenimiento, Subestaciones…)"),
      ]),

      carpeta(S, "Proyectos", "proyectos", [
        textos(S, "textos-proyectos"),
        S.documentTypeListItem("proyecto").title("Proyectos"),
      ]),

      carpeta(S, "Blog", "blog", [
        textos(S, "textos-blog"),
        S.documentTypeListItem("post").title("Artículos"),
      ]),

      carpeta(S, "Trabaja con nosotros", "trabaja", [
        unico(S, "Textos de la página", "politica", "politica-trabaja-con-nosotros"),
        textos(S, "textos-trabaja", "Foto de la página"),
      ]),

      unico(S, "Contacto", "contacto", "contacto"),

      S.divider(),

      unico(S, "Menú de navegación", "navegacion", "navegacion"),
    ]);

/** Tipos de documento fijo: no se crean desde el botón «+», ni se duplican ni se borran. */
export const TIPOS_UNICOS = ["portada", "navegacion", "contacto", "textosPagina", "categoriaProductos", "politica"];
