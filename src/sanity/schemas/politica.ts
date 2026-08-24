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
      name: "tarjetas",
      title: "Tarjetas",
      type: "array",
      description:
        "Bloques destacados que se muestran en fila (pasos para radicar una PQR, razones para postularse, pilares del sistema de gestión).",
      of: [
        {
          type: "object",
          fields: [
            { name: "titulo", title: "Título", type: "string" },
            { name: "texto", title: "Texto", type: "text", rows: 3 },
          ],
          preview: { select: { title: "titulo", subtitle: "texto" } },
        },
      ],
    }),
    defineField({
      name: "lista",
      title: "Lista de puntos",
      type: "array",
      of: [{ type: "string" }],
      description: "Viñetas simples: compromisos, áreas de trabajo, requisitos.",
    }),
    defineField({
      name: "cierre",
      title: "Texto de cierre",
      type: "text",
      rows: 3,
      description: "Nota final: alcance de la política, firma, aviso legal.",
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
