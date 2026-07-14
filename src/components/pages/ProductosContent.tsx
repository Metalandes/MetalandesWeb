"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { PRODUCTOS_PAGE } from "@/lib/content";

function Block({
  index,
  id,
  data,
  flip,
}: {
  index: string;
  id: string;
  data: { title: string; body: string; specs: string[]; img: string };
  flip?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "" : ""}`}>
        <div className={flip ? "lg:order-2" : ""}>
          <p data-reveal className="text-sm tracking-widest text-electric">
            {index}
          </p>
          <h2 data-reveal className="mt-2 font-display text-3xl font-bold md:text-4xl">
            {data.title}
          </h2>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-muted">
            {data.body}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {data.specs.map((s) => (
              <li key={s} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
                <span className="mt-1 text-electric">◆</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className={flip ? "lg:order-1" : ""}>
          <div className="glass relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={data.img}
              alt={data.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-80 transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[var(--electric)]/10 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}

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

      <div className="mx-auto flex max-w-7xl flex-col gap-28 px-5 pb-28">
        <Block index="01" id="media" data={PRODUCTOS_PAGE.media} />
        <Block index="02" id="baja" data={PRODUCTOS_PAGE.baja} flip />

        <div data-reveal className="glass flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
          <h3 className="font-display text-2xl font-bold text-white">
            ¿Necesitas una solución a la medida?
          </h3>
          <p className="max-w-xl text-muted">
            Fabricamos según tus requerimientos y la norma aplicable. Cuéntanos tu proyecto.
          </p>
          <Link
            href="/contacto"
            className="mt-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#0c0f15] transition hover:bg-electric hover:text-white"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </main>
  );
}
