"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { urlFor } from "@/sanity/image";
import type { ServicioDoc } from "@/sanity/queries";

export default function ServiciosContent({ servicios = [] }: { servicios?: ServicioDoc[] }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ SERVICIOS"
        title="Soluciones eléctricas"
        highlight="integrales"
        subtitle="Mantenimiento en media y baja tensión, con respaldo técnico y cobertura nacional."
        icon="servicios"
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        <div className="grid gap-6">
          {servicios.map((c, i) => (
            <Link
              key={c._id}
              href={c.enlace || "/contacto"}
              data-reveal
              className="group glass clip-proto-lg relative grid overflow-hidden transition duration-300 hover:-translate-y-1 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
            >
              {/* Foto del servicio (se cambia en el Studio); sin foto, placa de marca. */}
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[20rem]">
                {c.imagen ? (
                  <Image
                    src={urlFor(c.imagen).width(1100).url()}
                    alt={c.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--text)]">
                    <div className="brand-pattern absolute inset-0 opacity-[0.18]" />
                  </div>
                )}
              </div>

              <div className="flex flex-col p-7 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm tabular-nums text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-8 bg-electric/60" />
                </div>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-[var(--text)]">
                  {c.titulo}
                </h2>
                {c.descripcion && <p className="mt-4 leading-relaxed text-muted">{c.descripcion}</p>}
                {!!c.etiquetas?.length && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.etiquetas.map((t, j) => (
                      <span
                        key={`${j}-${t}`}
                        className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-electric transition group-hover:gap-3">
                  Ver más <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
