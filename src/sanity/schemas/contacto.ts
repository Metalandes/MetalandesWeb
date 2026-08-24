import { defineField, defineType } from "sanity";

/**
 * Datos de contacto de la empresa. Documento único: alimenta el pie de página,
 * la página de contacto, el botón de WhatsApp y el formulario.
 */
export const contacto = defineType({
  name: "contacto",
  title: "Datos de contacto",
  type: "document",
  fields: [
    defineField({ name: "direccion", title: "Dirección", type: "string" }),
    defineField({ name: "telefono", title: "Teléfono fijo", type: "string" }),
    defineField({
      name: "telefonoHref",
      title: "Teléfono para marcar",
      type: "string",
      description: "El mismo número sin espacios ni signos. Ej: +576044446153",
    }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({
      name: "whatsappHref",
      title: "WhatsApp para enlace",
      type: "string",
      description: "Solo dígitos, con indicativo y sin el +. Ej: 573243515023",
    }),
    defineField({ name: "email", title: "Correo", type: "string" }),
    defineField({ name: "emailCalidad", title: "Correo de calidad (PQR)", type: "string" }),
    defineField({ name: "emergencia", title: "Línea de emergencia 24/7", type: "string" }),
    defineField({ name: "emergenciaHref", title: "Emergencia para marcar", type: "string" }),
    defineField({
      name: "extensiones",
      title: "Extensiones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "area", title: "Área", type: "string" },
            { name: "ext", title: "Extensión", type: "string" },
          ],
          preview: { select: { title: "area", subtitle: "ext" } },
        },
      ],
    }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({ name: "youtube", title: "YouTube", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Datos de contacto" }) },
});
