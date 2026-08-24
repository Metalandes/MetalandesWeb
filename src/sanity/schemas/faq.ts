import { defineField, defineType } from "sanity";

/** Pregunta frecuente de la portada. */
export const faq = defineType({
  name: "faq",
  title: "Pregunta frecuente",
  type: "document",
  fields: [
    defineField({
      name: "pregunta",
      title: "Pregunta",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "respuesta",
      title: "Respuesta",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "orden", title: "Orden", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Orden", name: "orden", by: [{ field: "orden", direction: "asc" }] }],
  preview: { select: { title: "pregunta", subtitle: "respuesta" } },
});
