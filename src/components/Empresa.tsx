"use client";

import { useReveal } from "@/hooks/useReveal";
import { ElectricEyebrow } from "@/components/brand/BrandBits";
import { SectionIcon } from "@/components/brand/SectionIcon";
import type { PortadaDoc } from "@/sanity/queries";
import FotoSeccion from "@/components/brand/FotoSeccion";

export default function Empresa({ portada = {} }: { portada?: PortadaDoc }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="empresa" className="relative py-16 md:py-24">
      <div ref={scope} className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <div data-reveal className="mb-5 flex items-center gap-4">
              <SectionIcon name="nosotros" className="h-12 w-12" />
              <ElectricEyebrow>NUESTRA EMPRESA</ElectricEyebrow>
            </div>
            <h2
              data-reveal
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
            >
              {portada.empresaTitulo ?? "Una empresa colombiana que"}{" "}
              <span className="text-gradient">
                {portada.empresaDestacado ?? "produce energía y confianza"}
              </span>
              .
            </h2>
            <p data-reveal className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
              {portada.empresaTexto ??
                "Producimos bienes y servicios en el ramo eléctrico para atender las necesidades crecientes del mercado colombiano e internacional."}
            </p>

            <div data-reveal className="mt-10 flex items-center gap-6">
              <span className="font-display text-6xl font-bold text-energy-gradient">65+</span>
              <span className="max-w-[12rem] text-sm leading-snug text-muted">
                años reafirmando nuestros principios fundacionales.
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:pt-2">
            <FotoSeccion imagen={portada.empresaImagen} alt="Metalandes" className="mb-8" />
            {/* Valores en lista editorial (antes, otra tanda de tarjetas). */}
            <ol className="border-t border-[var(--border)]">
              {(portada.valores ?? []).map((v, i) => (
                <li
                  key={v._key}
                  data-reveal
                  className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-[var(--border)] py-7 md:grid-cols-[3.5rem_minmax(0,1fr)]"
                >
                  <span className="pt-1 font-display text-sm tabular-nums text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[var(--text)] transition group-hover:text-electric md:text-[1.75rem]">
                      {v.titulo}
                    </h3>
                    {v.texto && <p className="mt-2 max-w-md leading-relaxed text-muted">{v.texto}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
