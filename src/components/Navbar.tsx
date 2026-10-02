"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";
import type { NavItemDoc } from "@/sanity/queries";
import { LogoTile } from "@/components/Logo";
import { useContacto } from "@/components/ContactoProvider";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={`h-3 w-3 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export default function Navbar({ nav }: { nav?: NavItemDoc[] | null }) {
  const NAV_ITEMS: NavItemDoc[] = nav ?? NAV;
  const CONTACT = useContacto();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  /* Menú móvil a pantalla completa: mientras está abierto la página de fondo
     no se mueve (antes se veía y se desplazaba por debajo) y Escape lo cierra. */
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    html.dataset.menu = "abierto"; // el botón flotante de WhatsApp se oculta (ya está en el menú)
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      delete html.dataset.menu;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const items = NAV_ITEMS.filter((item) => item.href !== "/contacto");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Metalandes inicio">
          <span className="relative">
            {/* Resplandor rojo que se enciende detrás de la placa al pasar el cursor */}
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-electric to-energy opacity-0 blur-md transition group-hover:opacity-60" />
            <LogoTile className="relative h-8 w-8" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Metal<span className="text-electric">andes</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const activo = isActive(item.href);
            return (
              <div key={item._key ?? item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm transition-colors ${
                    activo ? "font-medium text-[var(--text)]" : "text-muted hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                  {item.children && <Chevron className="text-faint transition group-hover:rotate-180" />}
                  {/* Sección actual: línea roja bajo la opción del menú. */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-4 -bottom-[17px] h-0.5 bg-electric transition-transform duration-300 ${
                      activo ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full min-w-60 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="flex flex-col border border-[var(--border)] bg-white p-2 shadow-[0_24px_48px_-24px_rgba(43,49,60,0.35)]">
                      {item.children.map((c) => {
                        const actual = pathname === c.href;
                        return (
                          <Link
                            key={c._key ?? c.href}
                            href={c.href}
                            aria-current={actual ? "page" : undefined}
                            className={`flex items-center justify-between gap-6 px-3 py-2.5 text-sm transition hover:bg-[var(--tint)] hover:text-[var(--text)] ${
                              actual ? "font-medium text-[var(--text)]" : "text-muted"
                            }`}
                          >
                            {c.label}
                            <span
                              aria-hidden
                              className={`h-1.5 w-1.5 rotate-45 bg-electric transition ${actual ? "opacity-100" : "opacity-0"}`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <Link
            href="/contacto"
            className="ml-2 rounded-lg bg-electric px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Contacto
          </Link>
        </nav>

        {/* Toggle móvil */}
        <button
          className="-mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="menu-movil"
        >
          <span className={`h-0.5 w-6 bg-electric transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-electric transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-electric transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Menú móvil a pantalla completa (detrás de la barra superior, encima de la página). */}
      <div
        id="menu-movil"
        data-lenis-prevent
        className={`fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-white pt-[76px] transition duration-300 lg:hidden ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className={`flex flex-col px-5 transition duration-300 ${open ? "translate-y-0" : "-translate-y-3"}`}>
          {items.map((item) => {
            const activo = isActive(item.href);
            const abierto = expanded === item.href;
            return (
              <div key={item._key ?? item.href} className="border-b border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`flex flex-1 items-center gap-3 py-4 font-display text-2xl font-semibold tracking-tight ${
                      activo ? "text-[var(--text)]" : "text-[var(--text)]/80"
                    }`}
                  >
                    {activo && <span aria-hidden className="h-2 w-2 rotate-45 bg-electric" />}
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setExpanded((e) => (e === item.href ? null : item.href))}
                      className="-mr-2 grid h-11 w-11 place-items-center text-faint"
                      aria-label={`Expandir ${item.label}`}
                      aria-expanded={abierto}
                    >
                      <Chevron className={`h-4 w-4 transition ${abierto ? "rotate-180 text-electric" : ""}`} />
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col pb-3">
                        {item.children.map((c) => (
                          <Link
                            key={c._key ?? c.href}
                            href={c.href}
                            className={`py-2.5 pl-5 text-base ${
                              pathname === c.href ? "font-medium text-electric" : "text-muted"
                            }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
          <Link
            href="/contacto"
            className="block rounded-xl bg-electric px-4 py-3.5 text-center font-semibold text-white"
          >
            Contacto
          </Link>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <a
              href={`https://wa.me/${CONTACT.whatsappHref}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--border)] px-4 py-3 text-center font-medium text-[var(--text)]"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="rounded-xl border border-[var(--border)] px-4 py-3 text-center font-medium text-[var(--text)]"
            >
              Llamar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
