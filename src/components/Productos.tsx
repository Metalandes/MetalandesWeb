"use client";

import TituloSeccion, { type Titulo } from "@/components/brand/TituloSeccion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { urlFor } from "@/sanity/image";
import type { ProductoDestacadoDoc } from "@/sanity/queries";
import { ElectricEyebrow } from "@/components/brand/BrandBits";
import { SectionIcon } from "@/components/brand/SectionIcon";

const CATEGORIA = { media: "Media tensión", baja: "Baja tensión" } as const;
const ruta = (p: ProductoDestacadoDoc) => `/productos/${p.categoria}-tension`;

/** Foto del producto; sin foto, placa de marca. */
function Foto({ p, sizes }: { p: ProductoDestacadoDoc; sizes: string }) {
  return p.foto ? (
    <Image
      src={urlFor(p.foto).width(1200).height(900).url()}
      alt={p.nombre}
      fill
      sizes={sizes}
      className="object-cover"
    />
  ) : (
    <div className="absolute inset-0 bg-[var(--text)]">
      <div className="brand-pattern absolute inset-0 opacity-[0.18]" />
    </div>
  );
}

/**
 * Productos destacados de la portada. Cuáles aparecen se elige en el Studio
 * con «Mostrar en la portada» en cada producto.
 *
 * Escritorio: lista a la izquierda y panel con la foto a la derecha.
 * Celular: tarjetas que se deslizan de lado, cada una con su foto; con la
 * lista, el panel cambiaba más abajo, fuera de la pantalla.
 */
export default function Productos({
  productos = [],
  titulo,
}: {
  productos?: ProductoDestacadoDoc[];
  titulo?: Titulo;
}) {
  const scope = useReveal<HTMLDivElement>();
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!panel.current) return;
      gsap.fromTo(panel.current, { opacity: 0.4 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    },
    { dependencies: [active] }
  );

  if (!productos.length) return null;
  const p = productos[Math.min(active, productos.length - 1)];
  const total = String(productos.length).padStart(2, "0");

  return (
    <section id="productos" className="relative py-20 md:py-32">
      <div ref={scope} className="relative mx-auto max-w-7xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div className="max-w-2xl">
            <div data-reveal className="mb-5 flex items-center gap-4">
              <SectionIcon name="productos" className="h-12 w-12" />
              <ElectricEyebrow>PRODUCTOS</ElectricEyebrow>
            </div>
            <TituloSeccion titulo={titulo} fallback={{ texto: "Fabricación", destacado: "de precisión" }} />
          </div>
          <Link
            data-reveal
            href="/productos"
            className="hidden items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--text)] lg:inline-flex"
          >
            Ver todo el catálogo <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Celular y tablet: carrusel deslizable */}
        <div className="-mx-5 lg:hidden">
          <ul className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {productos.map((item, i) => (
              <li key={item._id} className="w-[82%] shrink-0 snap-start sm:w-[46%]">
                <Link href={ruta(item)} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-2)]">
                    <Foto p={item} sizes="(max-width: 640px) 82vw, 46vw" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[var(--text)] backdrop-blur">
                      {String(i + 1).padStart(2, "0")} / {total}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-semibold tracking-widest text-electric">
                    {CATEGORIA[item.categoria].toUpperCase()}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-[var(--text)]">{item.nombre}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                    Ver en el catálogo <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 px-5">
            <Link
              href="/productos"
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-3.5 text-sm font-semibold text-[var(--text)]"
            >
              Ver todo el catálogo <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Escritorio: lista + panel con foto */}
        <div className="hidden gap-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <ul data-reveal className="flex flex-col self-center border-t border-[var(--border)]">
            {productos.map((item, i) => {
              const on = i === active;
              return (
                <li key={item._id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex w-full items-center gap-5 border-b border-[var(--border)] py-5 text-left"
                  >
                    <span
                      className={`w-6 shrink-0 font-display text-sm tabular-nums transition ${
                        on ? "text-electric" : "text-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-display text-2xl font-semibold transition ${
                          on ? "text-[var(--text)]" : "text-muted group-hover:text-[var(--text)]"
                        }`}
                      >
                        {item.nombre}
                      </span>
                      <span className="mt-1 block text-xs tracking-wide text-faint">
                        {CATEGORIA[item.categoria]}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`text-electric transition-all duration-300 ${
                        on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="sticky top-28 h-fit">
            <Link href={ruta(p)} className="group block">
              <div ref={panel} className="clip-proto-lg relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
                <Foto p={p} sizes="(min-width: 1024px) 55vw, 100vw" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <span className="absolute right-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tabular-nums text-[var(--text)] backdrop-blur">
                  {String(active + 1).padStart(2, "0")} / {total}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-widest text-white/80">
                      {CATEGORIA[p.categoria].toUpperCase()}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-bold text-white xl:text-4xl">{p.nombre}</h3>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition group-hover:bg-electric group-hover:text-white">
                    Ver en el catálogo <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
            {p.descripcion && (
              <p className="mt-5 line-clamp-2 max-w-2xl leading-relaxed text-muted">{p.descripcion}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
