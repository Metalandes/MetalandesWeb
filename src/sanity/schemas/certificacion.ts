import { defineField, defineType } from "sanity";

/**
 * Certificado ISO, de producto RETIE o sello del certificador. Solo de consulta:
 * el sitio nunca publica el archivo subido; muestra una copia reducida y con
 * marca de agua (ver /api/certificado).
 */
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
          { title: "Sello de certificación (logo horizontal)", value: "sello" },
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
      description:
        "El sitio la muestra reducida y con la marca de agua «SOLO CONSULTA · NO VÁLIDO COMO DOCUMENTO»; nunca publica este archivo ni ofrece descarga. Basta un escaneo legible (unos 1.300 px de ancho), no hace falta la máxima resolución.",
    }),
    defineField({
      name: "orden",
      title: "Orden",
      type: "number",
      description: "Menor número aparece primero en el sitio.",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "codigo", subtitle: "nombre", media: "imagen" },
  },
});
