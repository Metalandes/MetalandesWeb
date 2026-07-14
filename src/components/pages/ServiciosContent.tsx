"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";

const CARDS = [
  {
    n: "01",
    title: "Automatización",
    desc: "Ingeniería en automatización industrial junto a ELICO GROUP: diseño de procesos, control y puesta en marcha.",
    href: "/servicios/automatizacion",
  },
  {
    n: "02",
    title: "Mantenimiento",
    desc: "Media y baja tensión, certificado ISO 45001. Operación 24/7 en todo el territorio nacional.",
    href: "/servicios/mantenimiento",
  },
];

export default function ServiciosContent() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ SERVICIOS"
        title="Soluciones eléctricas"
        highlight="integrales"
        subtitle="Automatización industrial y mantenimiento en media y baja tensión, con respaldo técnico y cobertura nacional."
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              data-reveal
              className="group glass relative flex flex-col overflow-hidden rounded-2xl p-8 transition duration-300 hover:-translate-y-2 hover:glow-ring"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="font-display text-sm text-faint">{c.n}</span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-[var(--text)]">{c.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{c.desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:gap-3">
                Ver más <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
