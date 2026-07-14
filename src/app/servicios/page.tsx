import type { Metadata } from "next";
import ServiciosContent from "@/components/pages/ServiciosContent";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Automatización industrial (ELICO GROUP) y mantenimiento eléctrico certificado ISO 45001, 24/7 en todo Colombia.",
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
