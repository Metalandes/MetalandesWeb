import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import CertGallery from "@/components/CertGallery";
import { EMPRESA } from "@/lib/content";
import { getCertificaciones, getTextosPaginas } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Certificaciones",
  description:
    "Certificaciones de Metalandes: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 (Kiwa CQR) y certificados de producto RETIE 0307–0310 (Certicheck).",
};

const CERT_TEXTO =
  "Nuestros sistemas de gestión están certificados por Kiwa CQR SAS y nuestros productos cuentan con certificado de conformidad RETIE emitido por Certicheck S.A.S, ambos organismos acreditados ante la ONAC. Los documentos se publican únicamente para consulta.";

export default async function Page() {
  const { certificaciones } = EMPRESA;
  const [certs, textos] = await Promise.all([getCertificaciones(), getTextosPaginas()]);
  const iso = certs.filter((c) => c.tipo === "iso");
  const retie = certs.filter((c) => c.tipo === "retie");
  const sellos = certs.filter((c) => c.tipo === "sello");

  return (
    <SubPage
      parent="Empresa"
      parentHref="/empresa"
      kicker="/ EMPRESA · CERTIFICACIONES"
      title="Certificaciones"
      subtitle={textos.certificacionesIntro ?? certificaciones.lead}
    >
      <p data-reveal className="max-w-3xl text-lg leading-relaxed text-muted">
        {textos.certificacionesTexto ?? CERT_TEXTO}
      </p>

      {sellos.length > 0 && (
        <>
          <h2 data-reveal className="mt-14 font-display text-2xl font-bold">
            Sellos de certificación
          </h2>
          <p data-reveal className="mt-3 max-w-3xl text-muted">
            Sellos otorgados por Kiwa CQR SAS, organismo acreditado por la ONAC con código
            09-CSG-003 bajo la norma ISO/IEC 17021-1:2015.
          </p>
          <div className="mt-6">
            <CertGallery certs={sellos} badge="SELLO · KIWA CQR" formato="sello" />
          </div>
        </>
      )}

      <h2 data-reveal className="mt-14 font-display text-2xl font-bold">
        Sistemas de gestión
      </h2>
      <div className="mt-6">
        <CertGallery certs={iso} badge="ISO · KIWA CQR" />
      </div>

      <h2 data-reveal className="mt-16 font-display text-2xl font-bold">
        Certificados de producto RETIE
      </h2>
      <p data-reveal className="mt-3 max-w-3xl text-muted">
        Esquema 5 RETIE, conforme a la Resolución 40117 del 2 de abril de 2024 del Ministerio de
        Minas y Energía.
      </p>
      <div className="mt-6">
        <CertGallery certs={retie} badge="RETIE · CERTICHECK" />
      </div>

      <p data-reveal className="mt-10 text-sm text-faint">
        Los certificados aquí publicados son propiedad de Metalúrgica de los Andes S.A.S y de los
        organismos certificadores que los emiten. Se muestran solo para verificación; su
        reproducción o distribución no está autorizada. Para una copia oficial, escríbenos.
      </p>
    </SubPage>
  );
}
