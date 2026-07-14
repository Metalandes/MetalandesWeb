"use client";

import { useReveal } from "@/hooks/useReveal";

const VALUES = [
  { title: "Compromiso", desc: "Respondemos por cada proyecto de principio a fin." },
  { title: "Confianza", desc: "Relaciones que se sostienen en el tiempo y en resultados." },
  { title: "Innovación", desc: "Ingeniería que evoluciona con la energía del país." },
];

export default function Empresa() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="empresa" className="relative py-28 md:py-40">
      <div ref={scope} className="mx-auto max-w-7xl px-5">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p data-reveal className="mb-4 text-sm font-medium tracking-widest text-cyan">
              / NUESTRA EMPRESA
            </p>
            <h2
              data-reveal
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
            >
              Una empresa colombiana que{" "}
              <span className="text-gradient">produce energía y confianza</span>.
            </h2>
            <p data-reveal className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
              Producimos bienes y servicios en el ramo eléctrico para atender las necesidades
              crecientes del mercado colombiano e internacional. Crecemos junto a los clientes que
              creen en nuestras capacidades.
            </p>

            <div data-reveal className="mt-10 flex items-center gap-6">
              <span className="font-display text-6xl font-bold text-energy-gradient">65</span>
              <span className="max-w-[12rem] text-sm leading-snug text-muted">
                años reafirmando nuestros principios fundacionales.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                data-reveal
                className="group glass relative overflow-hidden rounded-2xl p-7 transition duration-300 hover:-translate-y-1 hover:glow-ring"
              >
                <div className="absolute right-6 top-6 font-display text-sm text-faint">
                  0{i + 1}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(140px_140px_at_92%_8%,var(--glow-blue),transparent_70%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                <h3 className="font-display text-2xl font-semibold text-[var(--text)]">{v.title}</h3>
                <p className="mt-2 max-w-sm text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
