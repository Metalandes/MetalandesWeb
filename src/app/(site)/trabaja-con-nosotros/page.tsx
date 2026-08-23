import type { Metadata } from "next";
import TrabajaContent from "@/components/pages/TrabajaContent";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description:
    "Únete a Metalandes: fabricación metal eléctrica en Medellín desde 1960. Ingeniería, diseño, carpintería metálica, ensamble, pruebas y mantenimiento. Envía tu hoja de vida.",
};

export default function Page() {
  return <TrabajaContent />;
}
