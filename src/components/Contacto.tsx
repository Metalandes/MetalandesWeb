"use client";

import { useReveal } from "@/hooks/useReveal";
import { CONTACT } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import { ElectricEyebrow, NodeSeparator } from "@/components/brand/BrandBits";
import { SectionIcon } from "@/components/brand/SectionIcon";

export default function Contacto() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[150px]" />
        <div className="grid-bg absolute inset-0 opacity-60" />
      </div>

      <div ref={scope} className="relative mx-auto max-w-5xl px-5 text-center">
        <div data-reveal className="mb-5 flex flex-col items-center gap-4">
          <SectionIcon name="contacto" className="h-14 w-14" />
          <ElectricEyebrow>CONTACTO</ElectricEyebrow>
        </div>
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

        <div data-reveal className="mx-auto mt-12 max-w-2xl">
          <ContactForm />
        </div>

        <div className="my-8 flex flex-col items-center gap-3 text-xs text-faint">
          <NodeSeparator />
          <span>o contáctanos directo</span>
        </div>

        <div data-reveal className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${CONTACT.whatsappHref}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl bg-electric px-8 py-4 font-semibold text-white"
          >
            <span className="relative z-10">Escríbenos por WhatsApp</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-electric transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded-xl border border-[var(--border)] px-8 py-4 font-semibold text-[var(--text)] transition hover:bg-black/[0.03]"
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
            <div key={c.label} className="glass clip-proto p-5">
              <p className="text-xs uppercase tracking-widest text-faint">{c.label}</p>
              {c.href ? (
                <a href={c.href} className="mt-2 block text-sm text-[var(--text)] transition hover:text-electric">
                  {c.value}
                </a>
              ) : (
                <p className="mt-2 text-sm text-[var(--text)]">{c.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
