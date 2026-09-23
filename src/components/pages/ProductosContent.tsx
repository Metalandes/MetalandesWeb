"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { PRODUCTOS_PAGE } from "@/lib/content";
import type { PaginaProductosDoc } from "@/sanity/queries";

export default function ProductosContent({
  pagina = {},
  conteo,
}: {
  pagina?: PaginaProductosDoc;
  conteo?: { media: number; baja: number };
}) {
  const scope = useReveal<HTMLDivElement>();
  const { media, baja } = PRODUCTOS_PAGE;

  // Textos del Studio ("Textos de las páginas de productos"), con el código de respaldo.
  const tarjetas = [
    {
      n: "01",
      etiqueta: "MEDIA TENSIÓN",
      titulo: pagina.mediaTitulo || media.title,
      texto: pagina.mediaTexto || media.body,
      specs: pagina.mediaSpecs?.length ? pagina.mediaSpecs : media.specs,
      total: conteo?.media,
      href: "/productos/media-tension",
    },
    {
      n: "02",
      etiqueta: "BAJA TENSIÓN",
      titulo: pagina.bajaTitulo || baja.title,
      texto: pagina.bajaTexto || baja.body,
      specs: pagina.bajaSpecs?.length ? pagina.bajaSpecs : baja.specs,
      total: conteo?.baja,
      href: "/productos/baja-tension",
    },
  ];

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ PRODUCTOS"
        title="Fabricación de"
        highlight="subestaciones"
        subtitle={pagina.intro || PRODUCTOS_PAGE.intro}
        icon="productos"
      />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 md:pt-16">
        <div className="grid gap-5 md:grid-cols-2">
          {tarjetas.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              data-reveal
              className="group glass clip-proto-lg relative flex flex-col overflow-hidden p-7 transition duration-300 hover:-translate-y-2 md:p-10"
            >
              {/* Número de gran formato como ancla visual, en lugar de foto. */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-12 top-5 select-none font-display text-[5.5rem] font-bold leading-none text-[var(--text)]/[0.05] transition duration-500 group-hover:text-electric/[0.1] md:right-16 md:top-7 md:text-[7.5rem]"
              >
                {c.n}
              </span>

              <div className="relative flex items-center gap-3">
                <span className="h-px w-8 bg-electric" />
                <span className="text-xs font-semibold tracking-widest text-electric">{c.etiqueta}</span>
              </div>

              <h2 className="relative mt-6 max-w-sm font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-[var(--text)]">
                {c.titulo}
              </h2>
              <p className="relative mt-4 leading-relaxed text-muted">{c.texto}</p>

              <ul className="relative mt-7 grid gap-2.5 border-t border-[var(--border)] pt-6">
                {c.specs.map((s, i) => (
                  <li key={`${i}-${s}`} className="flex items-start gap-3 text-sm text-[var(--text)]">
                    <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-electric" />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                {typeof c.total === "number" && c.total > 0 ? (
                  <span className="text-sm text-faint">
                    {c.total} {c.total === 1 ? "producto" : "productos"} en catálogo
                  </span>
                ) : (
                  <span />
                )}
                <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--text)] px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-electric">
                  Ver catálogo <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
