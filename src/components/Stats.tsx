"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { PortadaDoc } from "@/sanity/queries";

export default function Stats({ cifras = [] }: { cifras?: NonNullable<PortadaDoc["cifras"]> }) {
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
            const v = Math.round(obj.v);
            // 1960 es un año: sin punto de miles. Sólo se agrupan cifras grandes.
            el.firstChild!.textContent = v < 10000 ? String(v) : v.toLocaleString("es-CO");
          },
        });
      });

      gsap.fromTo(
        ".stat-cell",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        }
      );
    },
    { scope: root }
  );

  // Sin cifras en el Studio no se muestra una franja vacía.
  if (!cifras.some((s) => typeof s.valor === "number")) return null;

  return (
    <section aria-label="Metalandes en cifras" className="relative overflow-hidden bg-[var(--text)] py-16 text-white md:py-24">
      <div className="brand-pattern pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <div ref={root} className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {cifras.filter((s) => typeof s.valor === "number").map((s, i) => (
            <div
              key={s._key}
              className={`stat-cell relative flex flex-col gap-3 px-2 sm:px-6 ${
                i % 2 === 1 ? "border-l border-white/15" : ""
              } ${i > 0 ? "lg:border-l lg:border-white/15" : ""}`}
            >
              <div className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-bold leading-none tracking-tight">
                <span className="stat-num tabular-nums" data-value={s.valor}>
                  <span>0</span>
                </span>
                <span className="text-electric">{s.sufijo}</span>
              </div>
              <p className="max-w-[14rem] text-sm leading-snug text-white/65">{s.etiqueta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
