import { defineField, defineType } from "sanity";

/** Artículo del blog. */
export const post = defineType({
  name: "post",
  title: "Artículo del blog",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Dirección web",
      type: "slug",
      description: "Se genera del título. Es la parte final de la URL del artículo.",
      options: { source: "titulo", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha de publicación",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      description: "Ej: Normativa, Mantenimiento, Proyectos",
    }),
    defineField({
      name: "extracto",
      title: "Resumen",
      type: "text",
      rows: 3,
      description: "Dos o tres líneas; es lo que se ve en el listado del blog.",
    }),
    defineField({ name: "portada", title: "Imagen de portada", type: "image", options: { hotspot: true } }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      description: "El cuerpo del artículo. Admite títulos, listas, negritas, enlaces e imágenes.",
    }),
  ],
  orderings: [
    { title: "Más recientes", name: "fechaDesc", by: [{ field: "fecha", direction: "desc" }] },
  ],
  preview: { select: { title: "titulo", subtitle: "fecha", media: "portada" } },
});
