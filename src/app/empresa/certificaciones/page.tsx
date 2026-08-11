import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import CertGallery from "@/components/CertGallery";
import { EMPRESA } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certificaciones",
  description:
    "Certificaciones de Metalandes: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 (Kiwa CQR) y certificados de producto RETIE 0307–0310 (Certicheck).",
};

export default function Page() {
  const { certificaciones } = EMPRESA;

  return (
    <SubPage
      parent="Empresa"
      parentHref="/empresa"
      kicker="/ EMPRESA · CERTIFICACIONES"
      title="Certificaciones"
      subtitle={certificaciones.lead}
    >
      <p data-reveal className="max-w-3xl text-lg leading-relaxed text-muted">
        Nuestros sistemas de gestión están certificados por Kiwa CQR SAS y nuestros productos
        cuentan con certificado de conformidad RETIE emitido por Certicheck S.A.S, ambos
        organismos acreditados ante la ONAC. Los documentos se publican únicamente para
        consulta.
      </p>

      <h2 data-reveal className="mt-14 font-display text-2xl font-bold">
        Sistemas de gestión
      </h2>
      <div className="mt-6">
        <CertGallery certs={certificaciones.iso} badge="ISO · KIWA CQR" />
      </div>

      <h2 data-reveal className="mt-16 font-display text-2xl font-bold">
        Certificados de producto RETIE
      </h2>
      <p data-reveal className="mt-3 max-w-3xl text-muted">
        Esquema 5 RETIE, conforme a la Resolución 40117 del 2 de abril de 2024 del Ministerio de
        Minas y Energía.
      </p>
      <div className="mt-6">
        <CertGallery certs={certificaciones.retie} badge="RETIE · CERTICHECK" />
      </div>

      <p data-reveal className="mt-10 text-sm text-faint">
        Los certificados aquí publicados son propiedad de Metalúrgica de los Andes S.A.S y de los
        organismos certificadores que los emiten. Se muestran solo para verificación; su
        reproducción o distribución no está autorizada. Para una copia oficial, escríbenos.
      </p>
    </SubPage>
  );
}
