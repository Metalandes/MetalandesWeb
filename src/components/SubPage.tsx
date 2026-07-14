"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";

export default function SubPage({
  parent,
  parentHref,
  kicker,
  title,
  highlight,
  subtitle,
  children,
}: {
  parent: string;
  parentHref: string;
  kicker: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero kicker={kicker} title={title} highlight={highlight} subtitle={subtitle} />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        {/* Breadcrumb */}
        <nav
          data-reveal
          className="mb-12 flex items-center gap-2 text-sm text-faint"
          aria-label="Ruta"
        >
          <Link href="/" className="transition hover:text-white">
            Inicio
          </Link>
          <span>/</span>
          <Link href={parentHref} className="transition hover:text-white">
            {parent}
          </Link>
          <span>/</span>
          <span className="text-muted">{title}</span>
        </nav>

        {children}

        <div data-reveal className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-8">
          <Link
            href={parentHref}
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
          >
            <span aria-hidden>←</span> Volver a {parent}
          </Link>
          <Link
            href="/contacto"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-[#0c0f15] transition hover:bg-electric hover:text-white"
          >
            Contactar
          </Link>
        </div>
      </div>
    </main>
  );
}
