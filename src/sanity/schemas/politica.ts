import { defineField, defineType } from "sanity";

/**
 * Páginas de texto institucional: política SIG, tratamiento de datos, PQR y
 * trabaja con nosotros. Se identifican por `clave`, que es lo que usa cada
 * página del sitio para encontrar su contenido — no debe cambiarse.
 */
export const politica = defineType({
  name: "politica",
  title: "Página institucional",
  type: "document",
  fields: [
    defineField({
      name: "clave",
      title: "Página",
      type: "string",
      description: "Identifica a qué página del sitio corresponde. No cambiar.",
      options: {
        list: [
          { title: "Gestión integral (SIG)", value: "gestion-integral" },
          { title: "Tratamiento de datos", value: "tratamiento-datos" },
          { title: "PQR", value: "pqr" },
          { title: "Trabaja con nosotros", value: "trabaja-con-nosotros" },
        ],
      },
      validation: (r) => r.required(),
      readOnly: ({ value }) => Boolean(value),
    }),
    defineField({ name: "titulo", title: "Título", type: "string" }),
    defineField({
      name: "intro",
      title: "Introducción",
      type: "text",
      rows: 4,
      description: "El párrafo que aparece bajo el título.",
    }),
    defineField({
      name: "cuerpo",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
      description: "Texto principal. Admite títulos, listas, negritas y enlaces.",
    }),
    defineField({
      name: "documento",
      title: "Documento adjunto",
      type: "file",
      description:
        "Opcional. El PDF o formato que se ofrece para descargar en esa página (política de datos, formato de PQR).",
    }),
  ],
  preview: { select: { title: "titulo", subtitle: "clave" } },
});
