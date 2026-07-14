"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { PRODUCTS } from "@/lib/content";

export default function Productos() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current!;
      // Only pin+scrub on wider screens; mobile falls back to native scroll.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const distance = el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.kill();
      });

      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return (
    <section id="productos" ref={root} className="relative overflow-hidden py-24 md:py-0">
      <div className="mx-auto max-w-7xl px-5 md:absolute md:left-1/2 md:top-16 md:z-10 md:-translate-x-1/2 md:px-0">
        <p className="mb-4 text-center text-sm font-medium tracking-widest text-cyan md:text-left">
          / PRODUCTOS
        </p>
        <h2 className="text-center font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight md:text-left">
          Fabricación <span className="text-gradient">de precisión</span>.
        </h2>
      </div>

      <div className="md:flex md:min-h-dvh md:items-center">
        <div
          ref={track}
          className="mt-10 flex flex-col gap-5 md:mt-0 md:flex-row md:gap-8 md:px-[8vw] md:pt-24 md:will-change-transform"
        >
          {PRODUCTS.map((p, i) => (
            <article
              key={p.title}
              className="glass group relative flex min-h-[16rem] shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-8 md:h-[22rem] md:w-[24rem]"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan/10 blur-3xl transition group-hover:bg-cyan/25" />
              <span className="font-display text-6xl font-bold text-white/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-muted">{p.spec}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm text-cyan">
                  Ficha técnica
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
