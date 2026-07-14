"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import { SERVICIOS_PAGE, CONTACT } from "@/lib/content";

export default function ServiciosContent() {
  const scope = useReveal<HTMLDivElement>();
  const { automatizacion, mantenimiento } = SERVICIOS_PAGE;

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ SERVICIOS"
        title="Soluciones eléctricas"
        highlight="integrales"
        subtitle="Automatización industrial y mantenimiento en media y baja tensión, con respaldo técnico y cobertura nacional."
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        {/* Automatización */}
        <section id="automatizacion" className="scroll-mt-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p data-reveal className="text-sm tracking-widest text-electric">01</p>
              <h2 data-reveal className="mt-2 font-display text-3xl font-bold md:text-4xl">
                {automatizacion.title}
              </h2>
              <p data-reveal className="mt-5 text-lg leading-relaxed text-muted">
                {automatizacion.body}
              </p>
              <div data-reveal className="mt-6 flex flex-wrap gap-2">
                {automatizacion.sectores.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <ol className="flex flex-col gap-3">
              {automatizacion.flow.map((step, i) => (
                <li
                  key={step}
                  data-reveal
                  className="glass flex items-center gap-4 rounded-xl p-5"
                >
                  <span className="font-display text-lg font-bold text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Mantenimiento */}
        <section id="mantenimiento" className="mt-28 scroll-mt-28">
          <p data-reveal className="text-sm tracking-widest text-electric">02</p>
          <h2 data-reveal className="mt-2 font-display text-3xl font-bold md:text-4xl">
            {mantenimiento.title}
          </h2>
          <p data-reveal className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            {mantenimiento.body}
          </p>

          <div
            data-reveal
            className="glow-ring mt-8 flex flex-wrap items-center gap-4 rounded-2xl bg-electric/10 p-5"
          >
            <span className="text-sm tracking-widest text-electric">LÍNEA DE EMERGENCIA</span>
            <a
              href={`tel:+57${mantenimiento.emergencia.replace(/\s/g, "")}`}
              className="font-display text-2xl font-bold text-white"
            >
              {mantenimiento.emergencia}
            </a>
            <span className="text-sm text-muted">· 24 horas / 7 días</span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {mantenimiento.items.map((it) => (
              <div key={it} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
                <span className="mt-1 text-electric">◆</span>
                {it}
              </div>
            ))}
          </div>

          <Link
            href="/contacto"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#0c0f15] transition hover:bg-electric hover:text-white"
          >
            Solicitar servicio
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-3 text-sm text-faint">
            WhatsApp {CONTACT.whatsapp} · {CONTACT.email}
          </p>
        </section>
      </div>
    </main>
  );
}
