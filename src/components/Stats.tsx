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

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div
          ref={root}
          className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4"
        >
          {cifras.filter((s) => typeof s.valor === "number").map((s) => (
            <div
              key={s._key}
              className="stat-cell relative flex flex-col items-center justify-center gap-2 p-8 text-center md:p-12"
            >
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none tracking-tight">
                <span className="stat-num text-gradient" data-value={s.valor}>
                  <span>0</span>
                </span>
                <span className="text-gradient">{s.sufijo}</span>
              </div>
              <p className="text-sm text-muted">{s.etiqueta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
