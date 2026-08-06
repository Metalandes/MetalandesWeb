import type { Metadata } from "next";
import Image from "next/image";
import SubPage from "@/components/SubPage";
import { EMPRESA } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certificaciones",
  description:
    "Certificaciones de Metalandes: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 (Kiwa CQR) y certificados de producto RETIE 0307–0310 (Certicheck). Consulta y descarga en PDF.",
};

type Cert = {
  code: string;
  name: string;
  issuer: string;
  validez: string;
  img: string;
  pdf: string;
};

/**
 * Ficha de certificado: el documento real a un lado, los datos y la descarga
 * al otro. Tanto la imagen como el enlace inferior abren el PDF oficial.
 */
function CertItem({ cert, badge }: { cert: Cert; badge: string }) {
  return (
    <div
      data-reveal
      className="glass clip-proto grid gap-6 p-6 sm:grid-cols-[minmax(0,180px)_1fr] sm:items-center"
    >
      <a
        href={cert.pdf}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${cert.code} en PDF`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-white ring-1 ring-[var(--border)] transition hover:ring-electric"
      >
        <Image
          src={cert.img}
          alt={`Certificado ${cert.code} — ${cert.name}`}
          fill
          sizes="180px"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/85 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
          Abrir PDF →
        </span>
      </a>

      <div>
        <div className="text-xs font-semibold tracking-widest text-electric">{badge}</div>
        <h3 className="mt-2 font-display text-2xl font-bold text-[var(--text)]">{cert.code}</h3>
        <p className="mt-2 leading-relaxed text-muted">{cert.name}</p>

        <dl className="mt-5 space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-faint">Emitido por:</dt>
            <dd className="text-muted">{cert.issuer}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-faint">Vigencia:</dt>
            <dd className="text-muted">{cert.validez}</dd>
          </div>
        </dl>

        <a
          href={cert.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-electric"
        >
          Ver certificado en PDF
          <span aria-hidden className="transition group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
}

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
        organismos acreditados ante la ONAC. Cada documento puede consultarse y descargarse en
        PDF.
      </p>

      <h2 data-reveal className="mt-14 font-display text-2xl font-bold">
        Sistemas de gestión
      </h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {certificaciones.iso.map((c) => (
          <CertItem key={c.code} cert={c} badge="ISO · KIWA CQR" />
        ))}
      </div>

      <h2 data-reveal className="mt-16 font-display text-2xl font-bold">
        Certificados de producto RETIE
      </h2>
      <p data-reveal className="mt-3 max-w-3xl text-muted">
        Esquema 5 RETIE, conforme a la Resolución 40117 del 2 de abril de 2024 del Ministerio de
        Minas y Energía.
      </p>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {certificaciones.retie.map((c) => (
          <CertItem key={c.code} cert={c} badge="RETIE · CERTICHECK" />
        ))}
      </div>
    </SubPage>
  );
}
