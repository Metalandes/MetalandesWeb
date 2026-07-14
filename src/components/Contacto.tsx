"use client";

import { useReveal } from "@/hooks/useReveal";
import { CONTACT } from "@/lib/content";

export default function Contacto() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[150px]" />
        <div className="grid-bg absolute inset-0 opacity-60" />
      </div>

      <div ref={scope} className="relative mx-auto max-w-5xl px-5 text-center">
        <p data-reveal className="mb-4 text-sm font-medium tracking-widest text-cyan">
          / CONTACTO
        </p>
        <h2
          data-reveal
          className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tight"
        >
          Hablemos de tu <span className="text-gradient">próximo proyecto</span>.
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Cuéntanos qué necesitas. Nuestro equipo de ingeniería responde con una propuesta a la
          medida.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${CONTACT.whatsappHref}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 font-semibold text-[#05070d]"
          >
            <span className="relative z-10">Escríbenos por WhatsApp</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-electric transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-xl border border-[var(--border)] px-8 py-4 font-semibold text-white transition hover:bg-white/5"
          >
            {CONTACT.email}
          </a>
        </div>

        <div
          data-reveal
          className="mx-auto mt-16 grid max-w-3xl gap-4 text-left sm:grid-cols-3"
        >
          {[
            { label: "Dirección", value: CONTACT.address },
            { label: "Teléfono", value: CONTACT.phone, href: `tel:${CONTACT.phoneHref}` },
            { label: "WhatsApp", value: CONTACT.whatsapp, href: `https://wa.me/${CONTACT.whatsappHref}` },
          ].map((c) => (
            <div key={c.label} className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-widest text-faint">{c.label}</p>
              {c.href ? (
                <a href={c.href} className="mt-2 block text-sm text-white transition hover:text-cyan">
                  {c.value}
                </a>
              ) : (
                <p className="mt-2 text-sm text-white">{c.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
