"use client";

import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { EMPRESA } from "@/lib/content";

export default function EmpresaContent() {
  const scope = useReveal<HTMLDivElement>();
  const { gestion, certificaciones, datos } = EMPRESA;

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ EMPRESA"
        title="Ingeniería metal eléctrica"
        highlight="desde 1960"
        subtitle={EMPRESA.intro}
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        <p data-reveal className="max-w-3xl text-lg leading-relaxed text-muted">
          {EMPRESA.fortaleza}
        </p>

        {/* Gestión integral */}
        <section id="gestion" className="mt-24 scroll-mt-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p data-reveal className="text-sm tracking-widest text-electric">01</p>
              <h2 data-reveal className="mt-2 font-display text-3xl font-bold md:text-4xl">
                {gestion.title}
              </h2>
              <p data-reveal className="mt-4 text-muted">
                {gestion.lead}
              </p>
            </div>
            <div>
              <p data-reveal className="text-lg leading-relaxed text-muted">
                {gestion.body}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {gestion.points.map((p) => (
                  <li key={p} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
                    <span className="mt-1 text-electric">◆</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Certificaciones */}
        <section id="certificaciones" className="mt-28 scroll-mt-28">
          <p data-reveal className="text-sm tracking-widest text-electric">02</p>
          <h2 data-reveal className="mt-2 font-display text-3xl font-bold md:text-4xl">
            {certificaciones.title}
          </h2>
          <p data-reveal className="mt-3 max-w-xl text-muted">{certificaciones.lead}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {certificaciones.iso.map((c) => (
              <div key={c.code} data-reveal className="glass rounded-2xl p-6">
                <div className="font-display text-xl font-bold text-white">{c.code}</div>
                <p className="mt-2 text-sm text-muted">{c.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certificaciones.retie.map((c) => (
              <div key={c.code} data-reveal className="glass rounded-2xl p-5">
                <div className="text-xs tracking-widest text-electric">RETIE 2013</div>
                <div className="mt-1 font-display font-semibold text-white">{c.code}</div>
                <p className="mt-1 text-sm text-muted">{c.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tratamiento de datos */}
        <section id="datos" className="mt-28 scroll-mt-28">
          <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-electric/15 blur-3xl" />
            <p data-reveal className="text-sm tracking-widest text-electric">03</p>
            <h2 data-reveal className="mt-2 font-display text-3xl font-bold md:text-4xl">
              {datos.title}
            </h2>
            <p data-reveal className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
              {datos.body}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
