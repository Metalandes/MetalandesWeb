import { defineField, defineType } from "sanity";

/**
 * Textos de la portada. Documento único.
 *
 * Cubre el encabezado, la sección de empresa, las cifras y los aliados. Los
 * títulos de cada sección también son editables, porque son la voz de la marca
 * y cambian más de lo que uno cree.
 */
export const portada = defineType({
  name: "portada",
  title: "Portada",
  type: "document",
  groups: [
    { name: "hero", title: "Encabezado" },
    { name: "empresa", title: "Empresa" },
    { name: "cifras", title: "Cifras" },
    { name: "aliados", title: "Aliados" },
    { name: "secciones", title: "Títulos de sección" },
  ],
  fields: [
    /* Encabezado */
    defineField({
      name: "heroTitulo",
      title: "Titular",
      type: "string",
      group: "hero",
      description: "El texto grande de la primera pantalla.",
    }),
    defineField({
      name: "heroDestacado",
      title: "Parte destacada del titular",
      type: "string",
      group: "hero",
      description: "Se muestra con el degradado rojo, al final del titular.",
    }),
    defineField({ name: "heroSubtitulo", title: "Subtítulo", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroCta", title: "Texto del botón", type: "string", group: "hero" }),
    defineField({
      name: "marquee",
      title: "Cinta deslizante",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
      description: "Frases que pasan en la banda animada del encabezado.",
    }),

    /* Empresa */
    defineField({ name: "empresaTitulo", title: "Título", type: "string", group: "empresa" }),
    defineField({ name: "empresaDestacado", title: "Parte destacada", type: "string", group: "empresa" }),
    defineField({ name: "empresaTexto", title: "Texto", type: "text", rows: 5, group: "empresa" }),
    defineField({
      name: "valores",
      title: "Valores",
      type: "array",
      group: "empresa",
      of: [
        {
          type: "object",
          fields: [
            { name: "titulo", title: "Título", type: "string" },
            { name: "texto", title: "Descripción", type: "text", rows: 2 },
          ],
          preview: { select: { title: "titulo", subtitle: "texto" } },
        },
      ],
    }),

    /* Cifras */
    defineField({
      name: "cifras",
      title: "Cifras",
      type: "array",
      group: "cifras",
      description: "Los números que se animan al aparecer (1960, 65+, 24/7).",
      of: [
        {
          type: "object",
          fields: [
            { name: "valor", title: "Número", type: "number" },
            { name: "sufijo", title: "Sufijo", type: "string", description: "Ej: +, /7" },
            { name: "etiqueta", title: "Etiqueta", type: "string" },
          ],
          preview: {
            select: { title: "valor", subtitle: "etiqueta" },
            prepare: ({ title, subtitle }) => ({ title: String(title), subtitle }),
          },
        },
      ],
    }),

    /* Aliados */
    defineField({ name: "aliadosTitulo", title: "Título", type: "string", group: "aliados" }),
    defineField({
      name: "aliados",
      title: "Aliados",
      type: "array",
      of: [{ type: "string" }],
      group: "aliados",
      description: "Nombres que aparecen en la banda de aliados.",
    }),

    /* Títulos de sección */
    defineField({
      name: "tituloServicios",
      title: "Servicios",
      type: "string",
      group: "secciones",
    }),
    defineField({
      name: "tituloProductos",
      title: "Productos",
      type: "string",
      group: "secciones",
    }),
    defineField({
      name: "tituloCertificaciones",
      title: "Certificaciones",
      type: "string",
      group: "secciones",
    }),
    defineField({ name: "tituloFaq", title: "Preguntas frecuentes", type: "string", group: "secciones" }),
  ],
  preview: { prepare: () => ({ title: "Portada" }) },
});
