"use client";

import { useReveal } from "@/hooks/useReveal";
import { useContacto } from "@/components/ContactoProvider";
import ContactForm from "@/components/ContactForm";
import { ElectricEyebrow } from "@/components/brand/BrandBits";
import { SectionIcon } from "@/components/brand/SectionIcon";

/**
 * Cierre de la portada. En escritorio, dos columnas: a la izquierda el
 * mensaje y los canales directos, a la derecha el formulario. Todos los
 * datos salen de «Datos de contacto» en el Studio.
 */
export default function Contacto() {
  const CONTACT = useContacto();
  const scope = useReveal<HTMLDivElement>();

  const canales = [
    { label: "WhatsApp", value: CONTACT.whatsapp, href: `https://wa.me/${CONTACT.whatsappHref}`, externo: true },
    { label: "Teléfono", value: CONTACT.phone, href: `tel:${CONTACT.phoneHref}` },
    { label: "Correo", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "Dirección", value: CONTACT.address },
  ];

  return (
    <section id="contacto" className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] py-20 md:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      <div
        ref={scope}
        className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20"
      >
        <div>
          <div data-reveal className="mb-5 flex items-center gap-4">
            <SectionIcon name="contacto" className="h-12 w-12" />
            <ElectricEyebrow>CONTACTO</ElectricEyebrow>
          </div>
          <h2
            data-reveal
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-tight"
          >
            Hablemos de tu <span className="text-gradient">próximo proyecto</span>.
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Cuéntanos qué necesitas. Nuestro equipo de ingeniería responde con una propuesta a la
            medida.
          </p>

          <dl data-reveal className="mt-10 border-t border-[var(--border)]">
            {canales.map((c) => (
              <div
                key={c.label}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-[var(--border)] py-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-widest text-faint">{c.label}</dt>
                <dd className="text-[var(--text)]">
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="font-medium underline-offset-4 transition hover:text-electric hover:underline"
                    >
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="lg:pt-4">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
