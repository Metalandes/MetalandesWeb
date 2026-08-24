import type { StructureResolver } from "sanity/structure";

/**
 * Organización del panel lateral del Studio.
 *
 * En vez de una lista plana de tipos, agrupa el contenido por dónde aparece en
 * el sitio, que es como lo piensa quien edita: primero la portada, después el
 * catálogo, después el resto de páginas, y al final los ajustes.
 *
 * Los documentos únicos (portada, menú, contacto) se abren directo en su
 * formulario: no tiene sentido mostrar una lista con un solo elemento ni dejar
 * que alguien cree un segundo por error.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido del sitio")
    .items([
      S.listItem()
        .title("Portada")
        .id("portada")
        .child(S.document().schemaType("portada").documentId("portada").title("Portada")),

      S.listItem()
        .title("Menú de navegación")
        .id("navegacion")
        .child(
          S.document()
            .schemaType("navegacion")
            .documentId("navegacion")
            .title("Menú de navegación")
        ),

      S.divider(),

      S.listItem()
        .title("Catálogo")
        .child(
          S.list()
            .title("Catálogo")
            .items([
              S.documentTypeListItem("producto").title("Productos"),
              S.listItem()
                .title("Textos de las páginas de productos")
                .id("paginaProductos")
                .child(
                  S.document()
                    .schemaType("paginaProductos")
                    .documentId("paginaProductos")
                    .title("Textos de las páginas de productos")
                ),
              S.documentTypeListItem("servicio").title("Servicios"),
              S.documentTypeListItem("proyecto").title("Proyectos"),
            ])
        ),

      S.listItem()
        .title("Páginas")
        .child(
          S.list()
            .title("Páginas")
            .items([
              S.documentTypeListItem("politica").title("Páginas institucionales"),
              S.documentTypeListItem("certificacion").title("Certificaciones"),
              S.documentTypeListItem("faq").title("Preguntas frecuentes"),
            ])
        ),

      S.documentTypeListItem("post").title("Blog"),

      S.divider(),

      S.listItem()
        .title("Datos de contacto")
        .id("contacto")
        .child(
          S.document().schemaType("contacto").documentId("contacto").title("Datos de contacto")
        ),
    ]);

/** Tipos con un único documento: no se listan aparte ni se pueden duplicar. */
export const TIPOS_UNICOS = ["portada", "navegacion", "paginaProductos", "contacto"];
