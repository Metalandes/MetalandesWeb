import { defineField, defineType } from "sanity";

/** Certificado ISO o de producto RETIE. Solo de consulta: no se descarga. */
export const certificacion = defineType({
  name: "certificacion",
  title: "Certificación",
  type: "document",
  fields: [
    defineField({
      name: "codigo",
      title: "Código",
      type: "string",
      description: "Ej: ISO 9001:2015 o Cert. 0307",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nombre",
      title: "Alcance",
      type: "string",
      description: "Qué certifica. Ej: Sistema de Gestión de la Calidad",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Sistema de gestión (ISO)", value: "iso" },
          { title: "Producto (RETIE)", value: "retie" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "emisor", title: "Emitido por", type: "string" }),
    defineField({
      name: "validez",
      title: "Vigencia",
      type: "string",
      description: "Ej: Vigente hasta agosto 2027",
    }),
    defineField({
      name: "imagen",
      title: "Imagen del certificado",
      type: "image",
      description: "Se muestra solo para consulta; el sitio no ofrece descarga.",
    }),
    defineField({ name: "orden", title: "Orden", type: "number", initialValue: 100 }),
  ],
  preview: {
    select: { title: "codigo", subtitle: "nombre", media: "imagen" },
  },
});
