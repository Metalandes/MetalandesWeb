"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { PRODUCTOS_PAGE } from "@/lib/content";

const CARDS = [
  {
    n: "01",
    title: "Subestaciones de media tensión",
    desc: PRODUCTOS_PAGE.media.body,
    href: "/productos/media-tension",
    img: PRODUCTOS_PAGE.media.img,
  },
  {
    n: "02",
    title: "Subestaciones de baja tensión",
    desc: PRODUCTOS_PAGE.baja.body,
    href: "/productos/baja-tension",
    img: PRODUCTOS_PAGE.baja.img,
  },
];

export default function ProductosContent() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ PRODUCTOS"
        title="Fabricación de"
        highlight="subestaciones"
        subtitle={PRODUCTOS_PAGE.intro}
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              data-reveal
              className="group glass relative flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-2 hover:glow-ring"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[var(--electric)]/10 mix-blend-overlay" />
              </div>
              <div className="flex flex-1 flex-col p-8 pt-6">
                <span className="font-display text-sm text-faint">{c.n}</span>
                <h2 className="mt-4 font-display text-2xl font-semibold text-white">{c.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{c.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric transition group-hover:gap-3">
                  Ver detalle <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
