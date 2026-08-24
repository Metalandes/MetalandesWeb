"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { urlFor } from "@/sanity/image";
import type { ProyectoDoc } from "@/sanity/queries";

const HUES = ["from-electric/30", "from-cyan/25", "from-energy/25"];

export default function ProjectsGrid({ proyectos = [] }: { proyectos?: ProyectoDoc[] }) {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div ref={scope} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {proyectos.map((p, i) => (
        <article
          key={p._id}
          data-reveal
          className="group glass relative overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-2 hover:glow-ring"
        >
          <div
            className={`relative flex h-44 items-end bg-gradient-to-br ${HUES[i % HUES.length]} to-transparent p-5`}
          >
            <div className="grid-bg absolute inset-0 opacity-40" />
            <span className="relative rounded-full border border-[var(--border)] bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
              {p.categoria}
            </span>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-[var(--text)]">{p.titulo}</h3>
            <p className="mt-1 text-sm text-muted">
              {p.lugar} · {p.anio}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
