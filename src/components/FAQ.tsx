"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";

const ITEMS = [
  {
    q: "¿Qué tipo de subestaciones fabrican?",
    a: "Diseñamos y construimos subestaciones de media y alta tensión bajo modalidad llave en mano, adaptadas a la capacidad y ubicación de cada proyecto.",
  },
  {
    q: "¿Atienden proyectos fuera de Antioquia?",
    a: "Sí. Operamos en todo el territorio colombiano y atendemos requerimientos del mercado internacional.",
  },
  {
    q: "¿Ofrecen mantenimiento a infraestructura existente?",
    a: "Contamos con planes de mantenimiento predictivo, preventivo y correctivo con disponibilidad de respuesta para asegurar la continuidad operativa.",
  },
  {
    q: "¿Cómo solicito una cotización?",
    a: "Escríbenos por WhatsApp o al correo info@metalandes.com con el alcance del proyecto. Nuestro equipo de ingeniería responde con una propuesta a la medida.",
  },
];

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
        <span className="font-display text-lg font-medium text-white">{q}</span>
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

export default function FAQ() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div ref={scope} className="mx-auto max-w-3xl px-5">
        <p data-reveal className="mb-4 text-center text-sm font-medium tracking-widest text-cyan">
          / PREGUNTAS FRECUENTES
        </p>
        <h2
          data-reveal
          className="mb-12 text-center font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight"
        >
          Todo lo que <span className="text-gradient">necesitas saber</span>.
        </h2>

        <div className="flex flex-col gap-3">
          {ITEMS.map((it) => (
            <Row key={it.q} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
