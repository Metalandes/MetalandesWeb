"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { CertificacionDoc } from "@/sanity/queries";
import CertImagen from "@/components/CertImagen";
import { useEscudo } from "@/hooks/useEscudo";

/**
 * Galería de certificados de consulta. Los documentos se visualizan dentro
 * del sitio y sólo en su versión con marca de agua (ver /api/certificado):
 * no hay descarga ni enlace al archivo original, porque ya se usaron copias
 * para fraude.
 */

/** Proporción real del certificado (los RETIE son horizontales, los ISO verticales). */
const proporcion = (c: CertificacionDoc) => (c.ancho && c.alto ? `${c.ancho} / ${c.alto}` : "4 / 3");

export default function CertGallery({
  certs,
  badge,
  formato = "documento",
}: {
  certs: CertificacionDoc[];
  badge: string;
  /** "documento": certificado vertical con ficha. "sello": logo horizontal del certificador. */
  formato?: "documento" | "sello";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const oculto = useEscudo();
  const open = openIndex !== null ? certs[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);

  // Cerrar con Escape y bloquear el scroll de fondo mientras el visor está abierto
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // El scroll suave se pausa: si no, la página de fondo seguía moviéndose.
    window.__lenis?.stop();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const esSello = formato === "sello";

  return (
    <>
      {esSello ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert, i) => (
            <button
              key={cert._id}
              type="button"
              data-reveal
              onClick={() => setOpenIndex(i)}
              aria-label={`Ampliar sello ${cert.codigo}`}
              className="group glass clip-proto flex flex-col p-4 text-left transition duration-300 hover:-translate-y-1"
            >
              <CertImagen
                cert={cert}
                v="mini"
                oculto={oculto}
                alt={`Sello ${cert.codigo} — ${cert.emisor ?? ""}`}
                className="aspect-[23/10] w-full rounded-lg bg-white"
              />
              <span className="mt-4 text-xs font-semibold tracking-widest text-electric">{badge}</span>
              <span className="mt-1 font-display text-lg font-bold text-[var(--text)]">{cert.codigo}</span>
              {cert.nombre && <span className="mt-1 text-sm text-muted">{cert.nombre}</span>}
            </button>
          ))}
        </div>
      ) : (
      <div className="grid gap-5 lg:grid-cols-2">
        {certs.map((cert, i) => (
          <div
            key={cert._id}
            data-reveal
            className="glass clip-proto grid gap-6 p-6 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Ampliar certificado ${cert.codigo}`}
              style={{ aspectRatio: proporcion(cert) }}
              className="group relative block overflow-hidden rounded-lg bg-white ring-1 ring-[var(--border)] transition hover:ring-electric"
            >
              <CertImagen
                cert={cert}
                v="mini"
                oculto={oculto}
                alt={`Certificado ${cert.codigo} — ${cert.nombre}`}
                className="h-full w-full"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/85 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                Ampliar
              </span>
            </button>

            <div>
              <div className="text-xs font-semibold tracking-widest text-electric">{badge}</div>
              <h3 className="mt-2 font-display text-2xl font-bold text-[var(--text)]">
                {cert.codigo}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{cert.nombre}</p>

              <dl className="mt-5 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="text-faint">Emitido por:</dt>
                  <dd className="text-muted">{cert.emisor}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-faint">Vigencia:</dt>
                  <dd className="text-muted">{cert.validez}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-electric"
              >
                Ver certificado
                <span aria-hidden className="transition group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      )}

      {/* Visor */}
      {open &&
        createPortal(
          <div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={`Certificado ${open.codigo}`}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--text)]/80 p-4 backdrop-blur-sm md:p-10"
          >
            <div
              data-cert
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
              className="relative max-h-full w-full max-w-4xl overflow-auto rounded-2xl bg-white p-3 shadow-2xl"
            >
              <CertImagen
                cert={open}
                v="grande"
                oculto={oculto}
                alt={`Certificado ${open.codigo} — ${open.nombre}`}
                className="rounded-lg"
                ajuste="h-auto w-full"
              />
              <p className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 pb-1 pt-3 text-xs text-muted">
                <span>Vista de consulta · no válida como documento.</span>
                <Link href="/contacto" onClick={close} className="font-semibold text-electric">
                  Solicitar copia oficial →
                </Link>
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-[var(--text)] transition hover:bg-white md:right-8 md:top-8"
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
