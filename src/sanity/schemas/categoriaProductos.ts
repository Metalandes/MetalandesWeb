import { defineField, defineType } from "sanity";

/**
 * Textos de la página de cada tipo de subestación (media y baja tensión):
 * título, descripción, especificaciones y foto. Un documento por página.
 * Los productos de la página se editan aparte, en su lista.
 */
export const CATEGORIAS: Record<string, string> = {
  "categoria-media": "Subestaciones media tensión",
  "categoria-baja": "Subestaciones baja tensión",
};

export const categoriaProductos = defineType({
  name: "categoriaProductos",
  title: "Textos de la página",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string" }),
    defineField({ name: "texto", title: "Descripción", type: "text", rows: 4 }),
    defineField({
      name: "specs",
      title: "Especificaciones técnicas",
      type: "array",
      of: [{ type: "string" }],
      description: "Cada línea es una viñeta. Ej: Rango 13.2 kV – 34.5 kV",
    }),
    defineField({
      name: "catalogoTitulo",
      title: "Título del catálogo",
      type: "string",
      description: 'El encabezado sobre las tarjetas de productos. Ej: "Gabinetes de media tensión".',
    }),
    defineField({ name: "imagen", title: "Foto", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { id: "_id" },
    prepare: ({ id }) => ({ title: CATEGORIAS[(id ?? "").replace(/^drafts\./, "")] ?? "Tipo de subestación" }),
  },
});
