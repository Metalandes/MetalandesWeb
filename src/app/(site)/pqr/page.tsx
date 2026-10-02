import type { Metadata } from "next";
import PqrContent from "@/components/pages/PqrContent";
import { resolverContacto } from "@/lib/contacto";
import { getContacto, getPolitica } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const c = resolverContacto(await getContacto());
  return {
    title: "PQRS",
    description: `Canal de peticiones, quejas, reclamos y sugerencias (PQRS) de Metalandes. Descarga el formato o escribe tu PQRS a ${c.emailCalidad} o entrégalo en nuestras instalaciones en Medellín.`,
  };
}

export default async function Page() {
  const pagina = await getPolitica("pqr");
  return <PqrContent pagina={pagina} />;
}
