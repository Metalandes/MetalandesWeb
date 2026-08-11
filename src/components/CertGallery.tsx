"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

export type Cert = {
  code: string;
  name: string;
  issuer: string;
  validez: string;
  img: StaticImageData;
};

/**
 * Galería de certificados de consulta. Los documentos se visualizan dentro
 * del sitio — no se ofrece descarga ni enlace al archivo original.
 */
export default function CertGallery({ certs, badge }: { certs: Cert[]; badge: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        {certs.map((cert, i) => (
          <div
            key={cert.code}
            data-reveal
            className="glass clip-proto grid gap-6 p-6 sm:grid-cols-[minmax(0,180px)_1fr] sm:items-center"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Ampliar certificado ${cert.code}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-white ring-1 ring-[var(--border)] transition hover:ring-electric"
            >
              <Image
                src={cert.img}
                alt={`Certificado ${cert.code} — ${cert.name}`}
                fill
                sizes="180px"
                draggable={false}
                placeholder="blur"
                className="select-none object-cover object-top transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/85 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                Ampliar
              </span>
            </button>

            <div>
              <div className="text-xs font-semibold tracking-widest text-electric">{badge}</div>
              <h3 className="mt-2 font-display text-2xl font-bold text-[var(--text)]">
                {cert.code}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{cert.name}</p>

              <dl className="mt-5 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="text-faint">Emitido por:</dt>
                  <dd className="text-muted">{cert.issuer}</dd>
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

      {/* Visor */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificado ${open.code}`}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--text)]/80 p-4 backdrop-blur-sm md:p-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-full w-full max-w-4xl overflow-auto rounded-2xl bg-white p-3 shadow-2xl"
          >
            <Image
              src={open.img}
              alt={`Certificado ${open.code} — ${open.name}`}
              draggable={false}
              placeholder="blur"
              className="h-auto w-full select-none rounded-lg"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-[var(--text)] transition hover:bg-white md:right-8 md:top-8"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
