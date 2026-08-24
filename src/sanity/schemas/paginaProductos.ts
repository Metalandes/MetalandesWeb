import { defineField, defineType } from "sanity";

/**
 * Textos de las páginas de productos: la introducción del catálogo y la ficha
 * de cada tipo de subestación, con sus especificaciones técnicas.
 */
export const paginaProductos = defineType({
  name: "paginaProductos",
  title: "Páginas de productos",
  type: "document",
  fields: [
    defineField({ name: "intro", title: "Introducción del catálogo", type: "text", rows: 4 }),

    defineField({ name: "mediaTitulo", title: "Media tensión — título", type: "string" }),
    defineField({ name: "mediaTexto", title: "Media tensión — descripción", type: "text", rows: 4 }),
    defineField({
      name: "mediaSpecs",
      title: "Media tensión — especificaciones",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "mediaCatalogoTitulo",
      title: "Media tensión — título del catálogo",
      type: "string",
      description: 'El encabezado sobre las tarjetas. Ej: "Gabinetes de media tensión".',
    }),
    defineField({ name: "mediaImagen", title: "Media tensión — imagen", type: "image", options: { hotspot: true } }),

    defineField({ name: "bajaTitulo", title: "Baja tensión — título", type: "string" }),
    defineField({ name: "bajaTexto", title: "Baja tensión — descripción", type: "text", rows: 4 }),
    defineField({
      name: "bajaSpecs",
      title: "Baja tensión — especificaciones",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bajaCatalogoTitulo",
      title: "Baja tensión — título del catálogo",
      type: "string",
    }),
    defineField({ name: "bajaImagen", title: "Baja tensión — imagen", type: "image", options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: "Páginas de productos" }) },
});
