"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { ElectricEyebrow, NodeSeparator } from "@/components/brand/BrandBits";
import { EMPRESA } from "@/lib/content";

const HREF = "/empresa/certificaciones";

/**
 * Bloque de certificaciones de la landing. Deliberadamente breve: enuncia el
 * respaldo normativo y manda a /empresa/certificaciones, donde están los
 * documentos. La landing no debe cargar con ese detalle.
 */
export default function Certificaciones() {
  const scope = useReveal<HTMLDivElement>();
  const { iso, retie } = EMPRESA.certificaciones;

  return (
    <section id="certificaciones" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-[45%] transform-gpu rounded-full bg-electric/10 blur-[120px]" />

      <div ref={scope} className="relative mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <div data-reveal className="mb-5">
            <ElectricEyebrow>CERTIFICACIONES</ElectricEyebrow>
          </div>
          <h2
            data-reveal
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Respaldados por <span className="text-gradient">norma</span>.
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
            Sistemas de gestión certificados y certificados de producto RETIE vigentes, emitidos
            por organismos acreditados ante la ONAC.
          </p>

          <div data-reveal className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href={HREF}
              className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
            >
              Ver certificaciones
              <span aria-hidden>→</span>
            </Link>
            <span className="text-sm text-faint">
              {iso.length} ISO · {retie.length} RETIE
            </span>
          </div>

          <div data-reveal className="mt-10">
            <NodeSeparator />
          </div>
        </div>
      </div>
    </section>
  );
}
