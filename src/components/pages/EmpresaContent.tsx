"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { EMPRESA } from "@/lib/content";
import type { TextosPaginasDoc } from "@/sanity/queries";
import FotoSeccion from "@/components/brand/FotoSeccion";

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
    desc: "Certificados de producto RETIE (0307–0310).",
    href: "/empresa/certificaciones",
  },
  {
    n: "03",
    title: "Tratamiento de datos",
    desc: "Política de manejo de datos personales según Decreto 1074 de 2015.",
    href: "/empresa/tratamiento-datos",
  },
  {
    n: "04",
    title: "PQRS",
    desc: "Peticiones, quejas, reclamos y sugerencias: radícalas por correo o con el formato oficial.",
    href: "/pqr",
  },
  {
    n: "05",
    title: "Trabaja con nosotros",
    desc: "Áreas de trabajo y cómo postularse a nuestro equipo en Medellín.",
    href: "/trabaja-con-nosotros",
  },
];

export default function EmpresaContent({ textos = {} }: { textos?: TextosPaginasDoc }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ EMPRESA"
        title="Ingeniería metal eléctrica"
        highlight="desde 1960"
        subtitle={textos.empresaIntro ?? EMPRESA.intro}
        icon="nosotros"
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 md:pt-16">
        <p data-reveal className="max-w-3xl text-lg leading-relaxed text-muted">
          {textos.empresaTexto ?? EMPRESA.fortaleza}
        </p>

        <FotoSeccion
          imagen={textos.empresaImagen}
          alt="Metalandes"
          proporcion="aspect-[16/10] md:aspect-[21/9]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="mt-12"
        />

        {/* Índice de la sección Empresa: filas con línea fina, número y flecha. */}
        <nav aria-label="Secciones de Empresa" className="mt-14 border-t border-[var(--border)]">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              data-reveal
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-[var(--border)] py-6 transition-colors hover:bg-[var(--tint)] md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-x-8 md:py-8"
            >
              <span className="font-display text-sm tabular-nums text-electric md:pl-4">{c.n}</span>
              <h2 className="font-display text-2xl font-semibold text-[var(--text)] md:text-3xl">{c.title}</h2>
              <p className="col-start-2 row-start-2 mt-2 text-sm leading-relaxed text-muted md:col-start-3 md:row-start-1 md:mt-0 md:text-base">
                {c.desc}
              </p>
              <span
                aria-hidden
                className="col-start-3 row-span-2 row-start-1 grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--text)] transition group-hover:border-electric group-hover:bg-electric group-hover:text-white md:col-start-4 md:row-span-1 md:mr-4"
              >
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
