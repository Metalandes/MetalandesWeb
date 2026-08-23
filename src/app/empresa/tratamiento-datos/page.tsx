import type { Metadata } from "next";
import Link from "next/link";
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
        <a
          data-reveal
          href={datos.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
        >
          Descargar {datos.pdfLabel}
          <span aria-hidden>↓</span>
        </a>

        <p data-reveal className="mt-6 text-sm text-faint">
          Para peticiones, quejas o reclamos sobre el tratamiento de tus datos personales, consulta
          nuestro{" "}
          <Link href="/pqr" className="text-electric underline-offset-4 hover:underline">
            canal de PQR
          </Link>
          .
        </p>
      </div>
    </SubPage>
  );
}
