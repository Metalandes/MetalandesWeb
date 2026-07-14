"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { STATS } from "@/lib/content";

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.firstChild!.textContent = Math.round(obj.v).toLocaleString("es-CO");
          },
        });
      });

      gsap.from(".stat-cell", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div
          ref={root}
          className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="stat-cell relative flex flex-col items-center justify-center gap-2 p-8 text-center md:p-12"
            >
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-tight">
                <span className="stat-num text-gradient" data-value={s.value}>
                  <span>0</span>
                </span>
                <span className="text-gradient">{s.suffix}</span>
              </div>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
