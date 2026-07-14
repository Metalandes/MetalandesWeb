"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";
import { LogoMark } from "@/components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        <button
          onClick={() =>
            window.__lenis
              ? window.__lenis.scrollTo(0)
              : window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="group flex items-center gap-2.5"
          aria-label="Metalandes inicio"
        >
          <span className="relative">
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-electric to-cyan opacity-0 blur-md transition group-hover:opacity-60" />
            <LogoMark className="relative h-8 w-8" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            METAL<span className="text-electric">ANDES</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go("contacto")}
            className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#05070d] transition hover:bg-cyan"
          >
            Cotizar
          </button>
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`glass mx-4 mt-2 overflow-hidden rounded-2xl transition-all duration-400 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="flex flex-col p-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="rounded-lg px-4 py-3 text-left text-muted transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go("contacto")}
            className="mt-1 rounded-lg bg-white px-4 py-3 font-semibold text-[#05070d]"
          >
            Cotizar
          </button>
        </nav>
      </div>
    </header>
  );
}
