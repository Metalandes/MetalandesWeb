"use client";

import { useReveal } from "@/hooks/useReveal";

const PARTNERS = [
  "EPM",
  "ISA",
  "Celsia",
  "XM",
  "Air-e",
  "Enel",
  "Ecopetrol",
  "Grupo Argos",
];

export default function Aliados() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-y border-[var(--border)] py-16">
      <div ref={scope} className="mx-auto max-w-7xl px-5">
        <p data-reveal className="mb-10 text-center text-sm tracking-widest text-faint">
          SECTORES Y ALIADOS QUE CONFÍAN EN LA INGENIERÍA METALANDES
        </p>

        <div
          data-reveal
          className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
        >
          <div className="marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16">
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r} className="flex items-center gap-16">
                {PARTNERS.map((name) => (
                  <span
                    key={name}
                    className="font-display text-2xl font-semibold text-muted/70 transition hover:text-[var(--text)] md:text-3xl"
                  >
                    {name}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
