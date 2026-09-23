import type { Metadata } from "next";
import PqrContent from "@/components/pages/PqrContent";
import { resolverContacto } from "@/lib/contacto";
import { getContacto, getPolitica } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const c = resolverContacto(await getContacto());
  return {
    title: "PQR",
    description: `Canal de peticiones, quejas y reclamos de Metalandes. Descarga el formato de reporte de PQR y envíalo a ${c.emailCalidad} o entrégalo en nuestras instalaciones en Medellín.`,
  };
}

export default async function Page() {
  const pagina = await getPolitica("pqr");
  return <PqrContent pagina={pagina} />;
}
