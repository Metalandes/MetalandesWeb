import { defineField, defineType } from "sanity";

/**
 * Menú del sitio. Documento único: alimenta el navbar, el menú móvil y el pie.
 *
 * Cambiar el orden o el nombre de una entrada es seguro. Cambiar el enlace no:
 * debe apuntar a una página que exista, o el visitante llega a un error.
 */
export const navegacion = defineType({
  name: "navegacion",
  title: "Menú de navegación",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Entradas del menú",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Nombre", type: "string" },
            {
              name: "href",
              title: "Enlace",
              type: "string",
              description: "Ruta interna. Ej: /productos",
            },
            {
              name: "children",
              title: "Submenú",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Nombre", type: "string" },
                    { name: "href", title: "Enlace", type: "string" },
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                },
              ],
            },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Menú de navegación" }) },
});
