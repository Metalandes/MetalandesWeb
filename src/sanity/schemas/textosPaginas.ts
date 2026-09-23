import { defineField, defineType } from "sanity";

/**
 * Textos de introducción de las páginas internas: el párrafo que va bajo el
 * título grande de cada página. Documento único.
 *
 * Si un campo se deja vacío, la página usa el texto original.
 */
export const textosPaginas = defineType({
  name: "textosPaginas",
  title: "Introducciones de páginas",
  type: "document",
  groups: [
    { name: "empresa", title: "Empresa", default: true },
    { name: "otras", title: "Otras páginas" },
  ],
  fields: [
    defineField({
      name: "empresaIntro",
      title: "Empresa — introducción",
      type: "text",
      rows: 4,
      group: "empresa",
      description: "Bajo el título «Ingeniería metal eléctrica desde 1960».",
    }),
    defineField({
      name: "empresaTexto",
      title: "Empresa — qué ofrecemos",
      type: "text",
      rows: 4,
      group: "empresa",
      description: "Párrafo antes de las tarjetas de Gestión integral, Certificaciones, etc.",
    }),
    defineField({
      name: "empresaImagen",
      title: "Empresa — foto",
      type: "image",
      group: "empresa",
      options: { hotspot: true },
      description: "Foto ancha (21:9) entre el texto y las tarjetas. Opcional.",
    }),
    defineField({
      name: "certificacionesIntro",
      title: "Certificaciones — introducción",
      type: "text",
      rows: 3,
      group: "empresa",
    }),
    defineField({
      name: "certificacionesTexto",
      title: "Certificaciones — texto antes de los sellos",
      type: "text",
      rows: 4,
      group: "empresa",
    }),
    defineField({ name: "serviciosIntro", title: "Servicios — introducción", type: "text", rows: 3, group: "otras" }),
    defineField({ name: "proyectosIntro", title: "Proyectos — introducción", type: "text", rows: 3, group: "otras" }),
    defineField({ name: "blogIntro", title: "Blog — introducción", type: "text", rows: 3, group: "otras" }),
    defineField({
      name: "trabajaImagen",
      title: "Trabaja con nosotros — foto",
      type: "image",
      group: "otras",
      options: { hotspot: true },
      description: "Foto ancha (21:9) bajo el título de la página. Opcional.",
    }),
  ],
  preview: { prepare: () => ({ title: "Introducciones de páginas" }) },
});
