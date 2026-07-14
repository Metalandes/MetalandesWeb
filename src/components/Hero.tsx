"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

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

      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 })
        .from(
          ".hero-word",
          { yPercent: 120, duration: 1.1, stagger: 0.08 },
          "-=0.5"
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.6")
        .from(".hero-strip", { opacity: 0, duration: 1 }, "-=0.4")
        .from(".hero-cue", { opacity: 0, y: -10, duration: 0.8 }, "-=0.3");

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
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#12203f_0%,#05070d_55%)]" />
        <div className="grid-bg absolute inset-0" />
        <div className="blob-a absolute -left-20 top-10 h-[38rem] w-[38rem] rounded-full bg-electric/25 blur-[120px]" />
        <div className="blob-b absolute -right-24 top-40 h-[34rem] w-[34rem] rounded-full bg-cyan/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-energy/10 blur-[100px]" />
      </div>

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-5">
        <p className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur">
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
          65 años diseñando, fabricando y manteniendo{" "}
          <span className="text-white">subestaciones e infraestructura eléctrica</span> con
          compromiso, confianza e innovación.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contacto"
            className="hero-cta group relative overflow-hidden rounded-xl bg-white px-7 py-3.5 font-semibold text-[#05070d] transition"
          >
            <span className="relative z-10">Solicitar cotización</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-electric transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#servicios"
            className="hero-cta rounded-xl border border-[var(--border)] px-7 py-3.5 font-semibold text-white transition hover:bg-white/5"
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* Marquee strip at bottom */}
      <div className="hero-strip pointer-events-none absolute bottom-0 left-0 z-10 w-full border-t border-[var(--border)] bg-[#05070d]/60 py-4 backdrop-blur">
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

      <div className="hero-cue absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex">
        <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
        <span className="h-8 w-[1px] bg-gradient-to-b from-cyan to-transparent" />
      </div>
    </section>
  );
}
