"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { ElectricEyebrow } from "@/components/brand/BrandBits";

const GALLERY = [
  { src: "/img/capacitores-1.jpg", alt: "Banco de capacitores Metalandes — gabinete cerrado con controlador de factor de potencia" },
  { src: "/img/capacitores-2.jpg", alt: "Banco de capacitores Metalandes — vista interior con capacitores por pasos" },
  { src: "/img/capacitores-3.jpg", alt: "Banco de capacitores Metalandes — arreglo de interruptores y contactores" },
];

const SPECS = [
  "Corrección de factor de potencia automática",
  "Conmutación por pasos con contactores",
  "Controlador automático de FP",
  "Baja tensión · fabricación a la medida",
  "Certificación RETIE",
];

export default function ProductoDestacado() {
  const scope = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);

  return (
    <section id="bancos-capacitores" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-[45%] rounded-full bg-electric/10 blur-[150px]" />
      <div
        ref={scope}
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16"
      >
        {/* Galería */}
        <div data-reveal className="order-2 lg:order-1">
          <div className="clip-proto-lg relative aspect-[4/5] overflow-hidden bg-[var(--surface-2)] shadow-[0_30px_80px_-30px_var(--glow-blue)]">
            <Image
              key={active}
              src={GALLERY[active].src}
              alt={GALLERY[active].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {GALLERY.map((g, i) => (
              <button
                key={g.src}
                onClick={() => setActive(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border transition ${
                  i === active
                    ? "border-electric ring-2 ring-electric/30"
                    : "border-[var(--border)] opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={g.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="order-1 lg:order-2">
          <div data-reveal className="mb-5">
            <ElectricEyebrow>PRODUCTO DESTACADO</ElectricEyebrow>
          </div>
          <h2
            data-reveal
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Bancos de <span className="text-gradient">capacitores</span>.
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Corregimos el factor de potencia de tu instalación con bancos de capacitores diseñados y
            fabricados a la medida. Reducen el consumo reactivo, evitan penalizaciones y mejoran la
            eficiencia de la red.
          </p>

          <ul data-reveal className="mt-8 flex flex-col gap-3">
            {SPECS.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[var(--text)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <a
            data-reveal
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
          >
            Solicitar cotización
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
