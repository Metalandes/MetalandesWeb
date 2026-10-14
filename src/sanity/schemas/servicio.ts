import { defineField, defineType } from "sanity";

/** Servicio que ofrece la empresa: aparece en la portada y en /servicios. */
export const servicio = defineType({
  name: "servicio",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "descripcion", title: "Descripción", type: "text", rows: 4 }),
    defineField({
      name: "etiquetas",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "string" }],
      description: "Las píldoras pequeñas bajo la descripción. Ej: 24/7, Media tensión.",
    }),
    defineField({ name: "imagen", title: "Imagen", type: "image", options: { hotspot: true } }),
    defineField({
      name: "enlace",
      title: "Enlace",
      type: "string",
      description: "A dónde lleva la tarjeta. Ej: /servicios/mantenimiento",
    }),
    defineField({
      name: "detalle",
      title: "Detalle del servicio",
      type: "array",
      of: [{ type: "block" }],
      description: "Texto largo, si el servicio tiene página propia.",
    }),
    defineField({
      name: "servicios",
      title: "Tipos de servicio (con foto)",
      type: "array",
      description:
        "Tarjetas con foto, título y descripción en la página del servicio. Ej: Mantenimiento preventivo, Termografía. Arrástralas para cambiar el orden.",
      of: [
        {
          type: "object",
          name: "tipoServicio",
          title: "Tipo de servicio",
          fields: [
            defineField({ name: "titulo", title: "Título", type: "string", validation: (r) => r.required() }),
            defineField({ name: "descripcion", title: "Descripción", type: "text", rows: 4 }),
            defineField({ name: "imagen", title: "Foto", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "titulo", subtitle: "descripcion", media: "imagen" } },
        },
      ],
    }),
    defineField({
      name: "items",
      title: "Alcance",
      type: "array",
      of: [{ type: "string" }],
      description: "Lista de lo que cubre el servicio.",
    }),
    defineField({
      name: "orden",
      title: "Orden",
      type: "number",
      description: "Menor número aparece primero en el sitio.",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "Orden", name: "orden", by: [{ field: "orden", direction: "asc" }] }],
  preview: { select: { title: "titulo", subtitle: "descripcion", media: "imagen" } },
});
