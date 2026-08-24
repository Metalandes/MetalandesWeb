"use client";

import TituloSeccion, { type Titulo } from "@/components/brand/TituloSeccion";
import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { urlFor } from "@/sanity/image";
import type { ServicioDoc } from "@/sanity/queries";
import { ElectricEyebrow } from "@/components/brand/BrandBits";
import { SectionIcon } from "@/components/brand/SectionIcon";

export default function Servicios({ servicios = [], titulo }: { servicios?: ServicioDoc[]; titulo?: Titulo }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="servicios" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 transform-gpu rounded-full bg-electric/10 blur-[120px]" />
      <div ref={scope} className="relative mx-auto max-w-7xl px-5">
        <div className="mb-16 max-w-2xl">
          <div data-reveal className="mb-5 flex items-center gap-4">
            <SectionIcon name="servicios" className="h-12 w-12" />
            <ElectricEyebrow>SERVICIOS</ElectricEyebrow>
          </div>
          <TituloSeccion
            titulo={titulo}
            fallback={{ texto: "Soluciones eléctricas", destacado: "llave en mano" }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {servicios.map((s, i) => (
            <article
              key={s._id}
              data-reveal
              className="group glass clip-proto-lg relative flex flex-col overflow-hidden transition duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-x-0 -top-px z-20 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 transition group-hover:opacity-100" />

              {s.imagen ? (
                <div className="relative h-56 w-full overflow-hidden md:h-64">
                  <Image
                    src={urlFor(s.imagen).width(900).url()}
                    alt={s.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="scale-105 object-cover opacity-70 grayscale-[0.2] transition duration-500 group-hover:scale-100 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent" />
                  <div className="absolute inset-0 bg-[var(--electric)]/10 mix-blend-overlay" />
                </div>
              ) : (
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[var(--electric)]/20 to-transparent md:h-64">
                  <div className="grid-bg absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-8 pt-6">
              <span className="font-display text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-[var(--text)]">{s.titulo}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{s.descripcion}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(s.etiquetas ?? []).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={s.enlace ?? "/"}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:gap-3"
              >
                Ver más <span aria-hidden>→</span>
              </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
