import type { Metadata } from "next";
import EmpresaContent from "@/components/pages/EmpresaContent";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Metalandes S.A.S — ramo metal eléctrico desde 1960. Gestión integral, certificaciones ISO y RETIE, y política de tratamiento de datos.",
};

export default function EmpresaPage() {
  return <EmpresaContent />;
}
