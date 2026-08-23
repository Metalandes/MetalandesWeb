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
      name: "imagen",
      title: "Foto",
      type: "image",
      description:
        "Arrastra la foto aquí. Se optimiza sola, no hace falta prepararla. Usa el recuadro para elegir qué parte se ve en las tarjetas.",
      options: { hotspot: true },
    }),
    defineField({
      name: "descripcion",
      title: "Descripción corta",
      type: "string",
      description: "Opcional. Una línea bajo el nombre, por ejemplo para desplegar una sigla.",
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
    select: { title: "nombre", subtitle: "categoria", media: "imagen" },
    prepare({ title, subtitle, media }) {
      const etiqueta = subtitle === "media" ? "Media tensión" : "Baja tensión";
      return { title, subtitle: etiqueta, media };
    },
  },
});
