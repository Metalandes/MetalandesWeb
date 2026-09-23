import type { Metadata } from "next";
import ContactoContent from "@/components/pages/ContactoContent";
import { resolverContacto } from "@/lib/contacto";
import { getContacto } from "@/sanity/queries";

/** La descripción para buscadores usa los mismos datos que se editan en el Studio. */
export async function generateMetadata(): Promise<Metadata> {
  const c = resolverContacto(await getContacto());
  return {
    title: "Contacto",
    description: `Contacta a Metalandes: WhatsApp ${c.whatsapp}, línea de emergencia 24/7, teléfono ${c.phone}, ${c.email}. Medellín, Colombia.`,
  };
}

export default function ContactoPage() {
  return <ContactoContent />;
}
