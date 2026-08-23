"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { NodeSeparator } from "@/components/brand/BrandBits";
import { PQR, CONTACT } from "@/lib/content";

export default function PqrContent() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ PQR"
        title="Peticiones, quejas"
        highlight="y reclamos"
        subtitle={PQR.intro}
        icon="contacto"
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        {/* Cómo radicar */}
        <div className="grid gap-5 md:grid-cols-3">
          {PQR.pasos.map((p) => (
            <div key={p.n} data-reveal className="glass clip-proto p-8">
              <span className="font-display text-sm text-faint">{p.n}</span>
              <h2 className="mt-5 font-display text-xl font-semibold text-[var(--text)]">
                {p.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Formato y canales */}
        <div
          data-reveal
          className="glass clip-proto-lg relative mt-16 overflow-hidden p-10 md:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 transform-gpu rounded-full bg-electric/10 blur-[90px]" />
          <div className="relative">
            <NodeSeparator />
            <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight">
              Radica tu <span className="text-gradient">PQR</span>.
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={PQR.formato}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                Descargar formato
                <span aria-hidden>↓</span>
              </a>
              <a
                href={`mailto:${PQR.email}?subject=${encodeURIComponent("Reporte de PQR")}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] transition hover:text-electric"
              >
                Enviar a {PQR.email}
                <span aria-hidden>→</span>
              </a>
            </div>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold tracking-widest text-electric">CORREO</dt>
                <dd className="mt-2 text-muted">{PQR.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-widest text-electric">TELÉFONO</dt>
                <dd className="mt-2 text-muted">{CONTACT.phone}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-widest text-electric">
                  PRESENCIAL
                </dt>
                <dd className="mt-2 text-muted">{CONTACT.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* PQR sobre datos personales */}
        <div data-reveal className="glass clip-proto mt-8 p-8 md:p-10">
          <h2 className="font-display text-xl font-semibold text-[var(--text)]">
            PQR sobre tratamiento de datos personales
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{PQR.datosPersonales}</p>
          <Link
            href="/empresa/tratamiento-datos"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-electric"
          >
            Ver la política de tratamiento de datos
            <span aria-hidden className="transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
