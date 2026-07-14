"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";
import { PRODUCTS } from "@/lib/content";

const HUES = [
  "from-electric/30",
  "from-cyan/25",
  "from-energy/30",
  "from-electric/25",
  "from-cyan/30",
];

export default function Productos() {
  const scope = useReveal<HTMLDivElement>();
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Crossfade panel content on change
  useGSAP(
    () => {
      gsap.fromTo(
        panel.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    },
    { dependencies: [active] }
  );

  const p = PRODUCTS[active];

  return (
    <section id="productos" className="relative py-28 md:py-40">
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-[60%] rounded-full bg-electric/10 blur-[150px]" />
      <div ref={scope} className="relative mx-auto max-w-7xl px-5">
        <div className="mb-14 max-w-2xl">
          <p data-reveal className="mb-4 text-sm font-medium tracking-widest text-electric">
            / PRODUCTOS
          </p>
          <h2
            data-reveal
            className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            Fabricación <span className="text-gradient">de precisión</span>.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Lista seleccionable */}
          <ul data-reveal className="flex flex-col">
            {PRODUCTS.map((item, i) => {
              const on = i === active;
              return (
                <li key={item.title}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-5 border-b border-[var(--border)] py-6 text-left transition"
                  >
                    <span
                      className={`font-display text-sm tabular-nums transition ${
                        on ? "text-electric" : "text-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-xl font-semibold transition md:text-2xl ${
                        on ? "text-[var(--text)]" : "text-muted group-hover:text-[var(--text)]"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`ml-auto text-electric transition-all duration-300 ${
                        on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Panel activo (sticky en desktop) */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div
              ref={panel}
              className="glass relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-[radial-gradient(260px_220px_at_100%_0%,var(--tw-gradient-from),transparent_70%)] ${HUES[active % HUES.length]}`}
              />
              <div className="grid-bg absolute inset-0 opacity-30" />

              <div className="relative flex items-start justify-between">
                <span className="font-display text-7xl font-bold text-black/[0.06]">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-electric">
                  {String(active + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
                </span>
              </div>

              <div className="relative">
                <h3 className="font-display text-3xl font-bold text-[var(--text)] md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-lg text-muted">{p.spec}</p>
                <a
                  href="#contacto"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-black/[0.03]"
                >
                  Solicitar ficha técnica
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
