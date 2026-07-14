import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { EMPRESA } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tratamiento de datos",
  description:
    "Política de Tratamiento de Datos Personales de Metalúrgica de los Andes S.A.S según el Decreto 1074 de 2015.",
};

export default function Page() {
  const { datos } = EMPRESA;
  return (
    <SubPage
      parent="Empresa"
      parentHref="/empresa"
      kicker="/ EMPRESA · TRATAMIENTO DE DATOS"
      title="Tratamiento de datos personales"
    >
      <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-electric/15 blur-3xl" />
        <p data-reveal className="max-w-3xl text-lg leading-relaxed text-muted">
          {datos.body}
        </p>
        <p data-reveal className="mt-6 text-sm text-faint">
          Para peticiones, quejas o reclamos sobre el tratamiento de sus datos, contáctenos en{" "}
          <span className="text-[var(--text)]">info@metalandes.com</span>.
        </p>
      </div>
    </SubPage>
  );
}
