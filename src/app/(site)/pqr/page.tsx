import type { Metadata } from "next";
import PqrContent from "@/components/pages/PqrContent";
import { getPolitica } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "PQR",
  description:
    "Canal de peticiones, quejas y reclamos de Metalandes. Descarga el formato de reporte de PQR y envíalo a calidad@metalandes.com o entrégalo en nuestras instalaciones en Medellín.",
};

export default async function Page() {
  const pagina = await getPolitica("pqr");
  return <PqrContent pagina={pagina} />;
}
