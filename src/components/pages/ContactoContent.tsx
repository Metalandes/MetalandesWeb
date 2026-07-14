"use client";

import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/lib/content";

const SOCIAL = [
  { label: "Instagram", href: CONTACT.instagram },
  { label: "Facebook", href: CONTACT.facebook },
  { label: "YouTube", href: CONTACT.youtube },
  { label: "Webmail", href: CONTACT.webmail },
];

export default function ContactoContent() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ CONTACTO"
        title="Hablemos de tu"
        highlight="proyecto"
        subtitle="Nuestras líneas están abiertas para cotizaciones, soporte y emergencias en todo el territorio nacional."
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Canales */}
          <div className="flex flex-col gap-4">
            <div data-reveal className="glass flex flex-col gap-1 rounded-2xl p-6">
              <span className="text-xs uppercase tracking-widest text-faint">WhatsApp</span>
              <a
                href={CONTACT.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl font-bold text-white transition hover:text-electric"
              >
                {CONTACT.whatsapp}
              </a>
            </div>

            <div data-reveal className="glow-ring flex flex-col gap-1 rounded-2xl bg-electric/10 p-6">
              <span className="text-xs uppercase tracking-widest text-electric">
                Línea de emergencia · 24/7
              </span>
              <a
                href={`tel:${CONTACT.emergenciaHref}`}
                className="font-display text-2xl font-bold text-white"
              >
                {CONTACT.emergencia}
              </a>
            </div>

            <div data-reveal className="glass grid gap-4 rounded-2xl p-6 sm:grid-cols-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-faint">Teléfono</span>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="mt-1 block text-white transition hover:text-electric"
                >
                  {CONTACT.phone}
                </a>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-faint">Correo</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-1 block text-white transition hover:text-electric"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs uppercase tracking-widest text-faint">Dirección</span>
                <p className="mt-1 text-white">{CONTACT.address}</p>
              </div>
            </div>

            {/* Extensiones */}
            <div data-reveal className="glass rounded-2xl p-6">
              <span className="text-xs uppercase tracking-widest text-faint">Extensiones</span>
              <ul className="mt-3 flex flex-col divide-y divide-[var(--border)]">
                {CONTACT.extensiones.map((e) => (
                  <li key={e.area} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                    <span className="text-muted">{e.area}</span>
                    <span className="font-medium text-white">Ext. {e.ext}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal className="flex flex-wrap gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-muted transition hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div data-reveal className="lg:sticky lg:top-28 lg:h-fit">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
