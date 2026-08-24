import type { Metadata } from "next";
import TrabajaContent from "@/components/pages/TrabajaContent";
import { getPolitica } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description:
    "Únete a Metalandes: fabricación metal eléctrica en Medellín desde 1960. Ingeniería, diseño, carpintería metálica, ensamble, pruebas y mantenimiento. Envía tu hoja de vida.",
};

export default async function Page() {
  const pagina = await getPolitica("trabaja-con-nosotros");
  return <TrabajaContent pagina={pagina} />;
}
