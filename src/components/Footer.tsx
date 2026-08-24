import Link from "next/link";
import { NAV, CONTACT } from "@/lib/content";
import type { NavItemDoc } from "@/sanity/queries";
import type { Contacto } from "@/lib/contacto";
import { LogoWordmark } from "@/components/Logo";

export default function Footer({
  contacto = CONTACT,
  nav,
}: {
  contacto?: Contacto;
  nav?: NavItemDoc[] | null;
}) {
  const NAV_ITEMS: NavItemDoc[] = nav ?? NAV;
  const CONTACT = contacto;
  const SOCIAL = [
    { label: "Instagram", href: CONTACT.instagram },
    { label: "Facebook", href: CONTACT.facebook },
    { label: "LinkedIn", href: CONTACT.linkedin },
    { label: "YouTube", href: CONTACT.youtube },
    { label: "Webmail", href: CONTACT.webmail },
  ];

  return (
    <footer className="relative border-t border-[var(--border)] bg-[#f4f6fa] py-14">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Link href="/" className="flex items-center">
              <LogoWordmark className="h-10 w-auto" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Metalúrgica de los Andes S.A.S. Ramo metal eléctrico desde 1960 · Medellín, Colombia.
            </p>
            <p className="mt-4 text-sm text-muted">{CONTACT.address}</p>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="mt-1 block text-sm text-muted transition hover:text-[var(--text)]"
            >
              {CONTACT.phone}
            </a>
          </div>

          <div className="flex flex-wrap gap-14">
            <nav className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-faint">Navegación</span>
              {NAV_ITEMS.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-sm text-muted transition hover:text-[var(--text)]"
                >
                  {n.label}
                </Link>
              ))}
              <Link href="/proyectos" className="text-sm text-muted transition hover:text-[var(--text)]">
                Proyectos
              </Link>
            </nav>
            <nav className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-faint">Redes</span>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition hover:text-[var(--text)]"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--border)] pt-6 text-xs text-faint md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Metalúrgica de los Andes S.A.S. Todos los derechos reservados.</p>
          <p>Metalandes Electric · Energía que permanece</p>
        </div>
      </div>
    </footer>
  );
}
