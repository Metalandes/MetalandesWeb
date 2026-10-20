import { defineField, defineType } from "sanity";

/**
 * Textos de la portada. Documento único.
 *
 * Cubre el encabezado, la sección de empresa, las cifras y los aliados. Los
 * títulos de cada sección también son editables, porque son la voz de la marca
 * y cambian más de lo que uno cree.
 */
export const portada = defineType({
  name: "portada",
  title: "Portada",
  type: "document",
  groups: [
    { name: "hero", title: "Encabezado" },
    { name: "empresa", title: "Empresa" },
    { name: "cifras", title: "Cifras" },
    { name: "aliados", title: "Aliados" },
    { name: "secciones", title: "Títulos de sección" },
  ],
  fields: [
    /* Encabezado */
    defineField({
      name: "heroTitulo",
      title: "Titular",
      type: "string",
      group: "hero",
      description: "El texto grande de la primera pantalla.",
    }),
    defineField({
      name: "heroDestacado",
      title: "Parte destacada del titular",
      type: "string",
      group: "hero",
      description: "Se muestra con el degradado rojo, al final del titular.",
    }),
    defineField({ name: "heroSubtitulo", title: "Subtítulo", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroCta", title: "Texto del botón", type: "string", group: "hero" }),
    defineField({
      name: "marquee",
      title: "Cinta deslizante",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
      description: "Frases que pasan en la banda animada del encabezado.",
    }),

    /* Empresa */
    defineField({ name: "empresaTitulo", title: "Título", type: "string", group: "empresa" }),
    defineField({ name: "empresaDestacado", title: "Parte destacada", type: "string", group: "empresa" }),
    defineField({ name: "empresaTexto", title: "Texto", type: "text", rows: 5, group: "empresa" }),
    defineField({
      name: "empresaImagen",
      title: "Foto",
      type: "image",
      group: "empresa",
      options: { hotspot: true },
      description: "Horizontal (16:10). Va sobre los valores Compromiso, Confianza e Innovación. Opcional.",
    }),
    defineField({
      name: "valores",
      title: "Valores",
      type: "array",
      group: "empresa",
      of: [
        {
          type: "object",
          fields: [
            { name: "titulo", title: "Título", type: "string" },
            { name: "texto", title: "Descripción", type: "text", rows: 2 },
          ],
          preview: { select: { title: "titulo", subtitle: "texto" } },
        },
      ],
    }),

    /* Cifras */
    defineField({
      name: "cifras",
      title: "Cifras",
      type: "array",
      group: "cifras",
      description: "Los números que se animan al aparecer (1960, 65+, 24/7).",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "valor",
              title: "Número",
              type: "number",
              validation: (r: import("sanity").Rule) => r.required(),
            },
            { name: "sufijo", title: "Sufijo", type: "string", description: "Ej: +, /7" },
            { name: "etiqueta", title: "Etiqueta", type: "string" },
          ],
          preview: {
            select: { title: "valor", subtitle: "etiqueta" },
            prepare: ({ title, subtitle }) => ({ title: String(title), subtitle }),
          },
        },
      ],
    }),

    /* Aliados */
    defineField({ name: "aliadosTitulo", title: "Título", type: "string", group: "aliados" }),
    defineField({
      name: "aliados",
      title: "Aliados",
      type: "array",
      group: "aliados",
      description:
        "Marcas de la banda en movimiento de la portada. Arrástralas para cambiar el orden. Si una marca no tiene logo, se muestra su nombre.",
      of: [
        {
          type: "object",
          name: "aliado",
          title: "Aliado",
          fields: [
            defineField({
              name: "nombre",
              title: "Nombre",
              type: "string",
              validation: (r) => r.required(),
              description: "Se muestra si no hay logo; también lo leen Google y los lectores de pantalla.",
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { accept: "image/svg+xml,image/png,image/webp,image/jpeg" },
              description:
                "Súbelo sólo cuando la marca haya dado permiso. Ideal: SVG o PNG con fondo transparente, versión horizontal y para fondo claro (no la versión blanca). En la web se ve en gris y toma su color al pasar el mouse.",
            }),
          ],
          preview: {
            select: { title: "nombre", media: "logo" },
            prepare: ({ title, media }) => ({
              title,
              subtitle: media ? "Con logo" : "Sin logo · se muestra el nombre",
              media,
            }),
          },
        },
      ],
    }),

    /* Títulos de sección */
    ...["Servicios", "Productos", "Certificaciones", "Faq"].map((seccion) =>
      defineField({
        name: `titulo${seccion}`,
        title: seccion === "Faq" ? "Preguntas frecuentes" : seccion,
        type: "object",
        group: "secciones",
        options: { columns: 2 },
        fields: [
          { name: "texto", title: "Texto", type: "string" },
          {
            name: "destacado",
            title: "Parte destacada",
            type: "string",
            description: "Se pinta con el degradado rojo, al final del título.",
          },
        ],
      })
    ),
  ],
  preview: { prepare: () => ({ title: "Portada" }) },
});
