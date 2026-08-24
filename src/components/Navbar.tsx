"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";
import type { NavItemDoc } from "@/sanity/queries";
import { LogoTile } from "@/components/Logo";

export default function Navbar({ nav }: { nav?: NavItemDoc[] | null }) {
  const NAV_ITEMS: NavItemDoc[] = nav ?? NAV;
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

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
          {NAV_ITEMS.filter((item) => item.href !== "/contacto").map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition-colors ${
                  isActive(item.href) ? "text-[var(--text)]" : "text-muted hover:text-[var(--text)]"
                }`}
              >
                {item.label}
                {item.children && (
                  <span className="text-[10px] text-faint transition group-hover:rotate-180">
                    ▾
                  </span>
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-56 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="glass flex flex-col rounded-xl p-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-black/[0.03] hover:text-[var(--text)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contacto"
            className="ml-2 rounded-lg bg-electric px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Contacto
          </Link>
        </nav>

        {/* Toggle móvil */}
        <button
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-electric transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-electric transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-electric transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Drawer móvil */}
      <div
        className={`overflow-hidden bg-white transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[44rem]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col p-3">
          {NAV_ITEMS.filter((item) => item.href !== "/contacto").map((item) => (
            <div key={item.href} className="border-b border-[var(--border)] last:border-0">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className="flex-1 px-4 py-3 text-left text-muted transition hover:text-[var(--text)]"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => setExpanded((e) => (e === item.href ? null : item.href))}
                    className="px-4 py-3 text-faint"
                    aria-label={`Expandir ${item.label}`}
                  >
                    <span className={`inline-block transition ${expanded === item.href ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </button>
                )}
              </div>
              {item.children && (
                <div
                  className={`overflow-hidden transition-all ${
                    expanded === item.href ? "max-h-48" : "max-h-0"
                  }`}
                >
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block px-8 py-2.5 text-sm text-faint transition hover:text-[var(--text)]"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contacto"
            className="mt-2 rounded-lg bg-electric px-4 py-3 text-center font-semibold text-white"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
