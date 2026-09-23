import { defineField, defineType } from "sanity";

/**
 * Producto del catálogo de subestaciones.
 *
 * Sustituye el arreglo ProductoItem de content.ts. Cada producto pertenece a
 * media o baja tensión y se ordena por el campo `orden`, para que marketing
 * pueda reordenarlos sin tocar código.
 */
export const producto = defineType({
  name: "producto",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      description: "Como aparece en la tarjeta. Ej: Celdas de transformador",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Tipo de subestación",
      type: "string",
      description: "En qué página aparece el producto",
      options: {
        list: [
          { title: "Media tensión", value: "media" },
          { title: "Baja tensión", value: "baja" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "galeria",
      title: "Fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description:
        "Arrastra las fotos aquí; se optimizan solas. La primera es la que se ve en la tarjeta del catálogo — arrástralas para cambiar el orden. Usa el recuadro de recorte para elegir qué parte se muestra.",
      options: { layout: "grid" },
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 4,
      description: "Se muestra en la ficha del producto. Opcional.",
    }),
    defineField({
      name: "destacado",
      title: "Mostrar en la portada",
      type: "boolean",
      description:
        "Actívalo en 4 o 5 productos con buena foto: aparecen en la sección «Fabricación de precisión» de la portada.",
      initialValue: false,
    }),
    defineField({
      name: "orden",
      title: "Orden",
      type: "number",
      description: "Menor número aparece primero dentro de su categoría.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Categoría y orden",
      name: "categoriaOrden",
      by: [
        { field: "categoria", direction: "asc" },
        { field: "orden", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "nombre", subtitle: "categoria", media: "galeria.0", destacado: "destacado" },
    prepare({ title, subtitle, media, destacado }) {
      const etiqueta = subtitle === "media" ? "Media tensión" : "Baja tensión";
      return { title, subtitle: destacado ? `${etiqueta} · en la portada` : etiqueta, media };
    },
  },
});
