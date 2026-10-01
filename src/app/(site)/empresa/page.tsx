import type { Metadata } from "next";
import EmpresaContent from "@/components/pages/EmpresaContent";
import { getTextosPaginas } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Metalandes S.A.S — ramo metal eléctrico desde 1960. Gestión integral, certificados de producto RETIE, PQRS y política de tratamiento de datos.",
};

export default async function EmpresaPage() {
  return <EmpresaContent textos={await getTextosPaginas()} />;
}
