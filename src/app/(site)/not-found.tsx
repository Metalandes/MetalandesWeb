import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NoEncontrada() {
  return (
    <main id="main" className="relative z-[2]">
      <PageHero
        kicker="/ 404"
        title="Esta página"
        highlight="no existe"
        subtitle="Puede que la dirección esté mal escrita o que el contenido se haya movido."
        icon="servicios"
      />
      <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-5 pb-28">
        <Link
          href="/"
          className="rounded-lg bg-electric px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Volver al inicio
        </Link>
        <Link
          href="/productos"
          className="glass rounded-lg px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:-translate-y-0.5"
        >
          Ver productos
        </Link>
        <Link
          href="/contacto"
          className="glass rounded-lg px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:-translate-y-0.5"
        >
          Contacto
        </Link>
      </div>
    </main>
  );
}
