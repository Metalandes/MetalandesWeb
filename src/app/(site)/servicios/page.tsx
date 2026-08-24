import type { Metadata } from "next";
import ServiciosContent from "@/components/pages/ServiciosContent";
import { getServicios } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Mantenimiento eléctrico en media y baja tensión certificado ISO 45001, 24/7 en todo Colombia.",
};

export default async function ServiciosPage() {
  const servicios = await getServicios();
  return <ServiciosContent servicios={servicios} />;
}
