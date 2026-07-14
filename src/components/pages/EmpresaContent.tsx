"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { EMPRESA } from "@/lib/content";

const CARDS = [
  {
    n: "01",
    title: "Gestión integral",
    desc: "Política del Sistema Integrado de Gestión: calidad, seguridad, salud y ambiente.",
    href: "/empresa/gestion-integral",
  },
  {
    n: "02",
    title: "Certificaciones",
    desc: "ISO 9001, 14001, 45001 y certificados RETIE 2013 (0307–0310).",
    href: "/empresa/certificaciones",
  },
  {
    n: "03",
    title: "Tratamiento de datos",
    desc: "Política de manejo de datos personales según Decreto 1074 de 2015.",
    href: "/empresa/tratamiento-datos",
  },
];

export default function EmpresaContent() {
  const scope = useReveal<HTMLDivElement>();

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

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              data-reveal
              className="group glass relative flex flex-col overflow-hidden rounded-2xl p-8 transition duration-300 hover:-translate-y-2 hover:glow-ring"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="font-display text-sm text-faint">{c.n}</span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-white">{c.title}</h2>
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
