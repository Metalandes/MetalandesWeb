"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LogoWordmark } from "@/components/Logo";

const LINE_1 = "Energía que";
const LINE_2 = "enciende Colombia";

function SplitWords({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="hero-word inline-block will-change-transform">{word}</span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-logo", { y: 24, opacity: 0, duration: 0.9 })
        .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          ".hero-word",
          { yPercent: 120, duration: 1.1, stagger: 0.08 },
          "-=0.5"
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.6")
        .from(".hero-strip", { opacity: 0, duration: 1 }, "-=0.4");

      // Floating gradient blobs — subtle infinite drift
      gsap.to(".blob-a", { x: 60, y: -40, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".blob-b", { x: -50, y: 50, duration: 11, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // Parallax + fade on scroll out
      gsap.to(".hero-content", {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".blob-a", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".blob-b", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-dvh items-center overflow-hidden pt-28"
    >
      {/* Backdrop: video de subestación + overlay para legibilidad */}
      <div className="pointer-events-none absolute inset-0">
        {/* poster (fallback + reduced-motion) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay: suficiente blanco a la izquierda (texto) → video más visible a la derecha */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/45 to-white/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/5" />
        <div className="grid-bg absolute inset-0 opacity-35" />
      </div>

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-5">
        <div className="hero-logo mb-8">
          <LogoWordmark className="h-14 w-auto md:h-20" />
        </div>

        <p className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-black/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
          Sector eléctrico · Medellín, Colombia
        </p>

        <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight">
          <span className="block">
            <span className="text-gradient">
              <SplitWords text={LINE_1} delay={0} />
            </span>
          </span>
          <span className="block">
            <span className="text-gradient">
              <SplitWords text={LINE_2} delay={0.3} />
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-lg leading-relaxed text-muted">
          Más de 65 años diseñando, fabricando y manteniendo{" "}
          <span className="text-[var(--text)]">subestaciones e infraestructura eléctrica</span> con
          compromiso, confianza e innovación.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contacto"
            className="hero-cta group relative overflow-hidden rounded-xl bg-electric px-7 py-3.5 font-semibold text-white transition"
          >
            <span className="relative z-10">Solicitar cotización</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-electric transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#servicios"
            className="hero-cta rounded-xl border border-[var(--border)] px-7 py-3.5 font-semibold text-[var(--text)] transition hover:bg-black/[0.03]"
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* Marquee strip at bottom */}
      <div className="hero-strip pointer-events-none absolute bottom-0 left-0 z-10 w-full border-t border-[var(--border)] bg-white/70 py-4 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 text-sm font-medium tracking-widest text-faint">
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r} className="flex items-center gap-10">
                {["SUBESTACIONES", "MEDIA TENSIÓN", "ALTA TENSIÓN", "MANTENIMIENTO", "INGENIERÍA", "PUESTA A TIERRA"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-10">
                      {t} <span className="text-cyan">◆</span>
                    </span>
                  )
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
