"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import PageHero from "@/components/PageHero";
import RichText from "@/components/RichText";
import { NodeSeparator } from "@/components/brand/BrandBits";
import { useContacto } from "@/components/ContactoProvider";
import type { PoliticaDoc } from "@/sanity/queries";
import { TRABAJO } from "@/lib/content";

const ASUNTO = "Hoja de vida — Trabaja con nosotros";

export default function TrabajaContent({ pagina }: { pagina: PoliticaDoc | null }) {
  const scope = useReveal<HTMLDivElement>();
  const CONTACT = useContacto();
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(ASUNTO)}`;

  return (
    <main id="main" ref={scope} className="relative z-[2]">
      <PageHero
        kicker="/ TRABAJA CON NOSOTROS"
        title="Construye la red eléctrica"
        highlight="del país"
        subtitle={pagina?.intro ?? TRABAJO.intro}
        icon="nosotros"
      />

      <div className="mx-auto max-w-7xl px-5 pb-28">
        {pagina?.tarjetas?.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {pagina.tarjetas.map((t, i) => (
              <div key={t._key} data-reveal className="glass clip-proto p-8">
                <span className="font-display text-sm text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-[var(--text)]">
                  {t.titulo}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{t.texto}</p>
              </div>
            ))}
          </div>
        ) : null}

        {pagina?.lista?.length ? (
          <>
            <div data-reveal className="mt-20 flex items-center gap-4">
              <span className="font-display text-sm font-semibold tracking-widest text-faint">
                ÁREAS DE TRABAJO
              </span>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {pagina.lista.map((a) => (
                <li
                  key={a}
                  data-reveal
                  className="flex items-start gap-3 border-b border-[var(--border)] pb-4 text-[var(--text)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div
          data-reveal
          className="glass clip-proto-lg relative mt-20 overflow-hidden p-10 md:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 transform-gpu rounded-full bg-electric/10 blur-[90px]" />
          <div className="relative max-w-2xl">
            <NodeSeparator />
            <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-tight">
              Envíanos tu <span className="text-gradient">hoja de vida</span>.
            </h2>

            <div className="mt-5 text-lg">
              <RichText value={pagina?.cuerpo} />
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={mailto}
                className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                Postularme por correo
                <span aria-hidden>→</span>
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] transition hover:text-electric"
              >
                Otros canales de contacto
                <span aria-hidden>→</span>
              </Link>
            </div>

            <p className="mt-8 text-sm text-faint">
              También puedes acercarte a nuestra planta: {CONTACT.address}.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
