import { CONTACT } from "@/lib/content";
import type { ContactoDoc } from "@/sanity/queries";

export type Contacto = typeof CONTACT;

/**
 * Traduce el documento de Sanity a la forma que ya consumen los componentes.
 * Cada campo cae a su valor del código si en el Studio está vacío, de modo que
 * el sitio nunca quede sin teléfono ni correo.
 *
 * Vive fuera del provider porque lo invoca el layout, que es de servidor.
 */
export function resolverContacto(doc: ContactoDoc | null | undefined): Contacto {
  if (!doc) return CONTACT;
  const whatsappHref = doc.whatsappHref || CONTACT.whatsappHref;
  return {
    ...CONTACT,
    address: doc.direccion || CONTACT.address,
    phone: doc.telefono || CONTACT.phone,
    phoneHref: doc.telefonoHref || CONTACT.phoneHref,
    whatsapp: doc.whatsapp || CONTACT.whatsapp,
    whatsappHref,
    waLink: `https://wa.me/${whatsappHref}`,
    email: doc.email || CONTACT.email,
    emergencia: doc.emergencia || CONTACT.emergencia,
    emergenciaHref: doc.emergenciaHref || CONTACT.emergenciaHref,
    extensiones: doc.extensiones?.length
      ? doc.extensiones.map((e) => ({ area: e.area, ext: e.ext }))
      : CONTACT.extensiones,
    instagram: doc.instagram || CONTACT.instagram,
    facebook: doc.facebook || CONTACT.facebook,
    linkedin: doc.linkedin || CONTACT.linkedin,
    youtube: doc.youtube || CONTACT.youtube,
  };
}
