"use client";

import TituloSeccion, { type Titulo } from "@/components/brand/TituloSeccion";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import type { FaqDoc } from "@/sanity/queries";

function Row({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(panel.current, {
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [open] }
  );

  return (
    <div data-reveal className="glass overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-lg font-medium text-[var(--text)]">{q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--border)] text-cyan transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div ref={panel} className="h-0 opacity-0">
        <p className="px-6 pb-6 leading-relaxed text-muted">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ({ items, titulo }: { items: FaqDoc[]; titulo?: Titulo }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div ref={scope} className="mx-auto max-w-3xl px-5">
        <p data-reveal className="mb-4 text-center text-sm font-medium tracking-widest text-cyan">
          / PREGUNTAS FRECUENTES
        </p>
        <TituloSeccion titulo={titulo} fallback={{ texto: "Todo lo que", destacado: "necesitas saber" }} />

        <div className="flex flex-col gap-3">
          {items.map((it) => (
            <Row key={it._id} q={it.pregunta} a={it.respuesta} />
          ))}
        </div>
      </div>
    </section>
  );
}
