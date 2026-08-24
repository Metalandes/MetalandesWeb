"use client";

import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { NodeSeparator } from "@/components/brand/BrandBits";
import { urlFor } from "@/sanity/image";
import type { PostDoc } from "@/sanity/queries";
import { BLOG } from "@/lib/content";

/** Fecha legible en español: "24 de agosto de 2026". */
function fechaLarga(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogContent({ posts }: { posts: PostDoc[] }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ BLOG"
        title="Notas del taller"
        highlight="eléctrico"
        subtitle={BLOG.intro}
        icon="servicios"
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p._id} data-reveal>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group glass clip-proto-lg flex h-full flex-col overflow-hidden p-4 transition duration-300 hover:-translate-y-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[var(--surface-2)]">
                    {p.portada ? (
                      <Image
                        src={urlFor(p.portada).width(800).height(500).url()}
                        alt={p.titulo}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="brand-pattern absolute inset-0 opacity-[0.15]" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                    <div className="flex items-center gap-3 text-xs tracking-widest text-electric">
                      {p.categoria && <span>{p.categoria}</span>}
                      {p.categoria && <span className="text-faint">·</span>}
                      <time className="text-faint" dateTime={p.fecha}>
                        {fechaLarga(p.fecha)}
                      </time>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-[var(--text)]">
                      {p.titulo}
                    </h2>
                    {p.extracto && (
                      <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-muted">
                        {p.extracto}
                      </p>
                    )}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:gap-3">
                      Leer <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div
            data-reveal
            className="glass clip-proto-lg relative overflow-hidden p-10 text-center md:p-16"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 transform-gpu rounded-full bg-electric/10 blur-[90px]" />
            <div className="relative mx-auto max-w-xl">
              <div className="flex justify-center">
                <NodeSeparator />
              </div>
              <h2 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight">
                Primer artículo <span className="text-gradient">en camino</span>.
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Estamos preparando contenido técnico sobre diseño de subestaciones, cumplimiento
                RETIE y mantenimiento preventivo.
              </p>
              <Link
                href="/contacto"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                Proponer un tema
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
