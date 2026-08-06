"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { ElectricEyebrow, NodeSeparator } from "@/components/brand/BrandBits";
import { EMPRESA } from "@/lib/content";

const HREF = "/empresa/certificaciones";

type Cert = {
  code: string;
  name: string;
  issuer: string;
  validez: string;
  img: string;
};

/**
 * Tarjeta de certificado: muestra el documento real. Al hover se levanta,
 * el sello se acerca y aparece la llamada a acción; el card completo es el
 * enlace a la página de certificaciones.
 */
function CertCard({ cert, sizes }: { cert: Cert; sizes: string }) {
  return (
    <Link
      href={HREF}
      data-reveal
      aria-label={`${cert.code} — ${cert.name}. Ver certificaciones completas`}
      className="group glass clip-proto relative flex flex-col overflow-hidden p-3 transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_var(--glow-blue)]"
    >
      {/* Filo eléctrico superior en hover */}
      <span className="absolute inset-x-0 -top-px z-10 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white ring-1 ring-[var(--border)]">
        <Image
          src={cert.img}
          alt={`Certificado ${cert.code} — ${cert.name}`}
          fill
          sizes={sizes}
          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
        />
        {/* Velo + CTA que se revelan al pasar el cursor */}
        <span className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/85 via-[var(--text)]/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 p-4 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Ver certificado <span aria-hidden>→</span>
        </span>
      </div>

      <div className="px-1 pb-1 pt-4">
        <div className="font-display font-semibold text-[var(--text)]">{cert.code}</div>
        <p className="mt-1 text-xs leading-snug text-muted">{cert.name}</p>
        <p className="mt-2 text-[11px] tracking-wide text-faint">{cert.validez}</p>
      </div>
    </Link>
  );
}

/**
 * Sección de certificaciones para la landing. Muestra los siete certificados
 * reales (3 ISO + 4 RETIE); cada uno enlaza a /empresa/certificaciones, donde
 * se ven completos y se descargan en PDF.
 */
export default function Certificaciones() {
  const scope = useReveal<HTMLDivElement>();
  const { iso, retie } = EMPRESA.certificaciones;

  return (
    <section id="certificaciones" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-[45%] transform-gpu rounded-full bg-electric/10 blur-[120px]" />

      <div ref={scope} className="relative mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <div data-reveal className="mb-5">
            <ElectricEyebrow>CERTIFICACIONES</ElectricEyebrow>
          </div>
          <h2
            data-reveal
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Respaldados por <span className="text-gradient">norma</span>.
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
            Tres sistemas de gestión certificados y cuatro certificados de producto RETIE
            vigentes. Documentos reales, emitidos por organismos acreditados ante la ONAC.
          </p>
        </div>

        {/* Sistemas de gestión */}
        <div data-reveal className="mt-14 flex items-center gap-4">
          <span className="font-display text-sm font-semibold tracking-widest text-faint">
            SISTEMAS DE GESTIÓN
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {iso.map((c) => (
            <CertCard
              key={c.code}
              cert={c}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ))}
        </div>

        {/* Certificados de producto */}
        <div data-reveal className="mt-16 flex items-center gap-4">
          <span className="font-display text-sm font-semibold tracking-widest text-faint">
            PRODUCTO · RETIE
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {retie.map((c) => (
            <CertCard
              key={c.code}
              cert={c}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </div>

        <div data-reveal className="mt-12 flex flex-wrap items-center gap-5">
          <NodeSeparator />
          <Link
            href={HREF}
            className="group inline-flex items-center gap-2 font-display text-lg font-semibold text-[var(--text)] transition hover:text-electric"
          >
            Ver todos los certificados
            <span aria-hidden className="transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
