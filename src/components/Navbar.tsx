"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/content";
import { LogoMark } from "@/components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 ${
          scrolled
            ? "glass mx-4 rounded-2xl px-5 py-2.5 shadow-[0_10px_40px_-15px_var(--glow-blue)]"
            : ""
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Metalandes inicio">
          <span className="relative">
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-electric to-energy opacity-0 blur-md transition group-hover:opacity-60" />
            <LogoMark className="relative h-8 w-8" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            METAL<span className="text-electric">ANDES</span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition-colors ${
                  isActive(item.href) ? "text-white" : "text-muted hover:text-white"
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
                        className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white"
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
            className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0c0f15] transition hover:bg-electric hover:text-white"
          >
            Cotizar
          </Link>
        </nav>

        {/* Toggle móvil */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Drawer móvil */}
      <div
        className={`glass mx-4 mt-2 overflow-hidden rounded-2xl transition-all duration-400 md:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="flex flex-col p-3">
          {NAV.map((item) => (
            <div key={item.href} className="border-b border-[var(--border)] last:border-0">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className="flex-1 px-4 py-3 text-left text-muted transition hover:text-white"
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
                      className="block px-8 py-2.5 text-sm text-faint transition hover:text-white"
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
            className="mt-2 rounded-lg bg-white px-4 py-3 text-center font-semibold text-[#0c0f15]"
          >
            Cotizar
          </Link>
        </nav>
      </div>
    </header>
  );
}
