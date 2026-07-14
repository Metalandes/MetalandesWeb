"use client";

import { useReveal } from "@/hooks/useReveal";
import { SERVICES } from "@/lib/content";

export default function Servicios() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="servicios" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
      <div ref={scope} className="relative mx-auto max-w-7xl px-5">
        <div className="mb-16 max-w-2xl">
          <p data-reveal className="mb-4 text-sm font-medium tracking-widest text-cyan">
            / SERVICIOS
          </p>
          <h2
            data-reveal
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Soluciones eléctricas <span className="text-gradient">llave en mano</span>.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              data-reveal
              className="group glass relative flex flex-col overflow-hidden rounded-2xl p-8 transition duration-300 hover:-translate-y-2 hover:glow-ring"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="font-display text-sm text-faint">{s.n}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{s.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
