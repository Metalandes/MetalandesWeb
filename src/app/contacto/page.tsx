import type { Metadata } from "next";
import ContactoContent from "@/components/pages/ContactoContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Metalandes: WhatsApp +57 314 662 1062, línea de emergencia 24/7, teléfono (57) 604 444 6153, info@metalandes.com. Medellín, Colombia.",
};

export default function ContactoPage() {
  return <ContactoContent />;
}
