"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { urlFor } from "@/sanity/image";
import type { ProyectoDoc } from "@/sanity/queries";

export default function ProjectsGrid({ proyectos = [] }: { proyectos?: ProyectoDoc[] }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div ref={scope} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {proyectos.map((p, i) => (
        <article
          key={p._id}
          data-reveal
          className="group glass relative overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-2 hover:glow-ring"
        >
          <div
            className="relative flex h-44 items-end overflow-hidden p-5"
          >
            {p.imagen ? (
              <>
                <Image
                  src={urlFor(p.imagen).width(800).height(440).url()}
                  alt={p.titulo}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </>
            ) : (
              /* Sin foto: placa de marca con el número del proyecto, en vez de
                 un bloque de color vacío que se ve sin terminar. */
              <>
                <div className="absolute inset-0 bg-[var(--text)]" />
                <div className="brand-pattern absolute inset-0 opacity-[0.18]" />
                <span
                  aria-hidden
                  className="absolute right-5 top-3 font-display text-7xl font-bold leading-none text-white/[0.08]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </>
            )}
            {p.categoria && (
              <span className="relative rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                {p.categoria}
              </span>
            )}
          </div>
          <div className="p-6">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]">{p.titulo}</h2>
            {(p.lugar || p.anio) && (
              <p className="mt-1 text-sm text-muted">
                {[p.lugar, p.anio].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
