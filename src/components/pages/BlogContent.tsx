"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { NodeSeparator } from "@/components/brand/BrandBits";
import { BLOG, POSTS } from "@/lib/content";

export default function BlogContent() {
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
        {POSTS.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <article
                key={p.slug}
                data-reveal
                className="group glass clip-proto flex flex-col p-8 transition duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-3 text-xs tracking-widest text-electric">
                  {p.category}
                  <span className="text-faint">·</span>
                  <time className="text-faint" dateTime={p.date}>
                    {p.date}
                  </time>
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold text-[var(--text)]">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:gap-3">
                  Leer <span aria-hidden>→</span>
                </span>
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
                RETIE y mantenimiento preventivo. Mientras tanto, puedes escribirnos con la duda
                técnica que quieras que resolvamos primero.
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
