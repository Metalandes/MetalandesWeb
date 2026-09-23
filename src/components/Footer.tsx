import Link from "next/link";
import { NAV, CONTACT } from "@/lib/content";
import type { NavItemDoc } from "@/sanity/queries";
import type { Contacto } from "@/lib/contacto";
import { LogoWordmark } from "@/components/Logo";

/**
 * Pie de página oscuro, a juego con la franja de cifras: cierra el sitio
 * con peso de marca. Menú y datos de contacto salen del Studio (Menú de
 * navegación y Datos de contacto).
 */
export default function Footer({
  contacto = CONTACT,
  nav,
}: {
  contacto?: Contacto;
  nav?: NavItemDoc[] | null;
}) {
  const NAV_ITEMS: NavItemDoc[] = nav ?? NAV;
  const C = contacto;
  const redes = [
    { label: "Instagram", href: C.instagram },
    { label: "Facebook", href: C.facebook },
    { label: "LinkedIn", href: C.linkedin },
    { label: "YouTube", href: C.youtube },
    { label: "Webmail", href: C.webmail },
  ].filter((r) => r.href);

  const titulo = "mb-5 text-xs font-semibold uppercase tracking-widest text-white/45";
  const enlace = "text-sm text-white/75 transition hover:text-white";

  return (
    <footer className="relative overflow-hidden bg-[var(--text)] text-white">
      <div className="brand-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 md:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <Link href="/" aria-label="Metalandes, inicio" className="inline-block">
              <LogoWordmark className="h-10 w-auto [filter:brightness(0)_invert(1)]" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Metalúrgica de los Andes S.A.S. Ramo metal eléctrico desde 1960 · Medellín, Colombia.
            </p>
            <Link
              href="/contacto"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-electric px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Solicitar cotización <span aria-hidden>→</span>
            </Link>
          </div>

          <nav aria-label="Navegación del pie">
            <p className={titulo}>Navegación</p>
            <ul className="space-y-3">
              {NAV_ITEMS.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={enlace}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={titulo}>Contacto</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`https://wa.me/${C.whatsappHref}`} target="_blank" rel="noopener noreferrer" className={enlace}>
                  WhatsApp {C.whatsapp}
                </a>
              </li>
              <li>
                <a href={`tel:${C.phoneHref}`} className={enlace}>
                  {C.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${C.email}`} className={`${enlace} break-all`}>
                  {C.email}
                </a>
              </li>
              <li className="leading-relaxed text-white/60">{C.address}</li>
            </ul>
          </div>

          {redes.length > 0 && (
            <nav aria-label="Redes sociales">
              <p className={titulo}>Redes</p>
              <ul className="space-y-3">
                {redes.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={enlace}>
                      {s.label} <span aria-hidden className="text-white/35">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Lema de la marca en gran formato: cierre tipográfico del sitio. */}
        <p
          aria-hidden
          className="mt-16 select-none font-display text-[clamp(2.75rem,9vw,8.5rem)] font-bold leading-[0.9] tracking-tight text-white/[0.07] md:mt-20"
        >
          Energía que permanece.
        </p>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Metalúrgica de los Andes S.A.S. Todos los derechos reservados.</p>
          <p>
            <Link href="/empresa/tratamiento-datos" className="transition hover:text-white">
              Tratamiento de datos
            </Link>
            <span className="mx-2">·</span>
            <Link href="/pqr" className="transition hover:text-white">
              PQR
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
