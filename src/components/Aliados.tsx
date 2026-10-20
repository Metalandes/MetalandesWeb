"use client";

/* eslint-disable @next/next/no-img-element -- la CDN de Sanity ya entrega el logo al tamaño justo */
import type { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import { urlFor } from "@/sanity/image";
import type { AliadoDoc } from "@/sanity/queries";

/**
 * Tamaño de cada logo para que todos "pesen" lo mismo a la vista: se iguala el
 * área y no la altura. Un logo muy ancho queda más bajo y uno cuadrado un poco
 * más alto; así ninguno parece más importante que otro.
 */
const AREA = 42 * 132;
const ALTO = { min: 26, max: 58 };
const ANCHO_MAX = 184;

function medida(ancho: number, alto: number) {
  const proporcion = ancho / alto;
  let h = Math.min(ALTO.max, Math.max(ALTO.min, Math.sqrt(AREA / proporcion)));
  if (h * proporcion > ANCHO_MAX) h = ANCHO_MAX / proporcion;
  return { h: Math.round(h), w: Math.round(h * proporcion) };
}

function Marca({ aliado }: { aliado: AliadoDoc }) {
  if (aliado.logo && aliado.ancho && aliado.alto) {
    const { h, w } = medida(aliado.ancho, aliado.alto);
    return (
      <img
        src={urlFor(aliado.logo).height(h * 2).fit("max").auto("format").url()}
        alt={aliado.nombre}
        title={aliado.nombre}
        width={w}
        height={h}
        // Inmediata: en una banda en movimiento un logo no debe "aparecer de golpe" al entrar.
        loading="eager"
        decoding="async"
        draggable={false}
        style={{ "--h": `${h}px` } as CSSProperties}
        className="h-[calc(var(--h)*0.78)] w-auto max-w-none select-none object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-[var(--h)]"
      />
    );
  }
  return (
    <span className="font-display text-2xl font-semibold text-muted/70 transition hover:text-[var(--text)] md:text-3xl">
      {aliado.nombre}
    </span>
  );
}

export default function Aliados({ aliados = [], titulo }: { aliados?: AliadoDoc[]; titulo?: string }) {
  const scope = useReveal<HTMLDivElement>();
  if (!aliados.length) return null;

  return (
    <section data-aliados className="relative border-y border-[var(--border)] py-16">
      <div ref={scope} className="mx-auto max-w-7xl px-5">
        <p data-reveal className="mb-10 text-center text-sm tracking-widest text-faint">
          {titulo ?? "SECTORES Y ALIADOS QUE CONFÍAN EN LA INGENIERÍA METALANDES"}
        </p>

        {/* Banda en movimiento: se detiene al pasar el mouse para mirar un logo con calma. */}
        <div
          data-reveal
          className="marquee-pausa relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
        >
          <div className="marquee-track flex shrink-0 items-center gap-14 whitespace-nowrap pr-14 md:gap-20 md:pr-20">
            {Array.from({ length: 2 }).map((_, r) => (
              // La segunda copia sólo existe para que el movimiento no tenga cortes.
              <span key={r} aria-hidden={r === 1 || undefined} className="flex items-center gap-14 md:gap-20">
                {aliados.map((a, i) => (
                  <span key={`${a._key ?? i}-${a.nombre}`} className="flex h-16 shrink-0 items-center">
                    <Marca aliado={a} />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
