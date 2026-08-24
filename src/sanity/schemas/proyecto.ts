import { defineField, defineType } from "sanity";

/** Proyecto ejecutado, para la galería de /proyectos. */
export const proyecto = defineType({
  name: "proyecto",
  title: "Proyecto",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "lugar", title: "Lugar", type: "string", description: "Ej: Antioquia" }),
    defineField({ name: "anio", title: "Año", type: "string" }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      description: "Ej: Media tensión, Mantenimiento, Fabricación",
    }),
    defineField({ name: "imagen", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "orden", title: "Orden", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Orden", name: "orden", by: [{ field: "orden", direction: "asc" }] }],
  preview: {
    select: { title: "titulo", subtitle: "lugar", media: "imagen" },
  },
});
