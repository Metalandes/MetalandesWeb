"use client";

import { useReveal } from "@/hooks/useReveal";

const PROJECTS = [
  { title: "Subestación de media tensión", place: "Antioquia", year: "2024", cat: "Media tensión" },
  { title: "Repotenciación de celdas", place: "Bogotá", year: "2023", cat: "Media tensión" },
  { title: "Mantenimiento predictivo anual", place: "Costa Caribe", year: "2023", cat: "Mantenimiento" },
  { title: "Tableros de distribución industrial", place: "Valle del Cauca", year: "2022", cat: "Fabricación" },
  { title: "Banco de capacitores", place: "Santander", year: "2022", cat: "Baja tensión" },
  { title: "Subestación llave en mano", place: "Meta", year: "2021", cat: "Baja tensión" },
];

const HUES = ["from-electric/30", "from-cyan/25", "from-energy/25"];

export default function ProjectsGrid() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div ref={scope} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p, i) => (
        <article
          key={p.title}
          data-reveal
          className="group glass relative overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-2 hover:glow-ring"
        >
          <div
            className={`relative flex h-44 items-end bg-gradient-to-br ${HUES[i % HUES.length]} to-transparent p-5`}
          >
            <div className="grid-bg absolute inset-0 opacity-40" />
            <span className="relative rounded-full border border-[var(--border)] bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
              {p.cat}
            </span>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-[var(--text)]">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">
              {p.place} · {p.year}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
