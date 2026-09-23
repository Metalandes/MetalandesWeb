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
            {
              name: "label",
              title: "Nombre",
              type: "string",
              validation: (r: import("sanity").Rule) => r.required(),
            },
            {
              name: "href",
              title: "Enlace",
              type: "string",
              description: "Página a la que lleva. Ej: /productos",
              validation: (r: import("sanity").Rule) =>
                r.required().custom((v?: string) =>
                  !v || v.startsWith("/") || v.startsWith("https://")
                    ? true
                    : "Empezá con / para una página del sitio (ej: /productos) o con https:// para otro sitio."
                ),
            },
            {
              name: "children",
              title: "Submenú",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "label",
                      title: "Nombre",
                      type: "string",
                      validation: (r: import("sanity").Rule) => r.required(),
                    },
                    {
                      name: "href",
                      title: "Enlace",
                      type: "string",
                      description: "Página a la que lleva. Ej: /empresa/certificaciones",
                      validation: (r: import("sanity").Rule) =>
                        r.required().custom((v?: string) =>
                          !v || v.startsWith("/") || v.startsWith("https://")
                            ? true
                            : "Empezá con / para una página del sitio (ej: /productos) o con https:// para otro sitio."
                        ),
                    },
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
