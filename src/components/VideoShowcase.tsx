"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { ElectricEyebrow, NodeSeparator } from "@/components/brand/BrandBits";

/**
 * Sección showcase: video vertical (presentación de la empresa) en marco
 * "protoboard". Carga diferida — el <video> no descarga hasta que el usuario
 * pulsa play. Reproduce con audio y controles nativos.
 */
export default function VideoShowcase() {
  const scope = useReveal<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.play();
  };

  return (
    <section id="conocenos" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-[45%] transform-gpu rounded-full bg-electric/10 blur-[120px]" />
      <div
        ref={scope}
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
      >
        {/* Reproductor vertical */}
        <div data-reveal className="mx-auto w-full max-w-[360px]">
          <div className="clip-proto-lg relative aspect-[9/16] overflow-hidden bg-[var(--text)] shadow-[0_30px_80px_-30px_var(--glow-blue)]">
            <video
              ref={videoRef}
              className={`h-full w-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
              playsInline
              controls={playing}
              preload="none"
              poster="/empresa-video-poster.jpg"
              onEnded={() => setPlaying(false)}
            >
              <source src="/empresa-video.mp4" type="video/mp4" />
            </video>

            {!playing && (
              <button
                onClick={play}
                aria-label="Reproducir video de Metalandes Electric"
                className="group absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/empresa-video-poster.jpg"
                  alt="Presentación de Metalandes Electric"
                  fill
                  sizes="360px"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/70 via-transparent to-transparent" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-electric text-white shadow-lg transition group-hover:scale-110">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-electric/40" />
                  <svg viewBox="0 0 24 24" className="relative ml-1 h-8 w-8" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Texto */}
        <div>
          <div data-reveal className="mb-5">
            <ElectricEyebrow>CONÓCENOS</ElectricEyebrow>
          </div>
          <h2
            data-reveal
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Mira lo que <span className="text-gradient">fabricamos</span>.
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Más de 65 años en el mercado eléctrico colombiano. Diseñamos, fabricamos y mantenemos{" "}
            <span className="text-[var(--text)]">tableros, subestaciones y sistemas de potencia</span>,
            con cumplimiento RETIE. En el mundo eléctrico, la seguridad y la confiabilidad no son una
            opción.
          </p>

          <div data-reveal className="mt-8 flex items-center gap-4">
            <NodeSeparator />
            <span className="font-display text-lg font-semibold text-[var(--text)]">
              Tu próximo proyecto ya tiene energía: la nuestra
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
