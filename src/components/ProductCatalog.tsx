"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { ProductoDoc } from "@/sanity/queries";

/**
 * Catálogo de productos de una subestación.
 *
 * El contenido viene de Sanity: marketing agrega productos, sube fotos,
 * reordena y escribe descripciones desde /studio. Al hacer clic en una tarjeta
 * se abre la ficha con todas las fotos del producto y su descripción.
 */
export default function ProductCatalog({
  title,
  items,
}: {
  title: string;
  items: ProductoDoc[];
}) {
  const [abierto, setAbierto] = useState<number | null>(null);
  const [foto, setFoto] = useState(0);

  const producto = abierto !== null ? items[abierto] : null;
  const fotos = producto?.galeria ?? [];

  const cerrar = useCallback(() => setAbierto(null), []);

  const abrir = useCallback((i: number) => {
    setAbierto(i);
    setFoto(0);
  }, []);

  const mover = useCallback(
    (paso: number) => setFoto((f) => (f + paso + fotos.length) % fotos.length),
    [fotos.length]
  );

  // Escape cierra; las flechas recorren las fotos. Bloquea el scroll de fondo.
  useEffect(() => {
    if (!producto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [producto, cerrar, mover]);

  if (items.length === 0) return null;

  return (
    <section>
      <div data-reveal className="flex items-center gap-4">
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <span className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-sm text-faint">{items.length}</span>
      </div>

      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const portada = item.galeria?.[0];
          const extras = (item.galeria?.length ?? 0) - 1;

          return (
            <li key={item._id} data-reveal>
              <button
                type="button"
                onClick={() => abrir(i)}
                className="group glass clip-proto-lg w-full overflow-hidden p-4 text-left transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_var(--glow-blue)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-2)]">
                  {portada ? (
                    <Image
                      src={urlFor(portada).width(900).height(675).url()}
                      alt={item.nombre}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="brand-pattern absolute inset-0 opacity-[0.15]" />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 p-4 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Ver producto <span aria-hidden>→</span>
                  </span>
                  {extras > 0 && (
                    <span className="absolute right-3 top-3 rounded-full bg-[var(--text)]/75 px-2.5 py-1 text-xs font-medium text-white">
                      {extras + 1} fotos
                    </span>
                  )}
                </div>

                <div className="px-1 pb-1 pt-5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-[var(--text)]">
                    {item.nombre}
                  </h3>
                  {item.descripcion && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {item.descripcion}
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Ficha del producto */}
      {producto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={producto.nombre}
          onClick={cerrar}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--text)]/85 p-4 backdrop-blur-sm md:p-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-full w-full max-w-5xl gap-6 overflow-auto rounded-2xl bg-[var(--bg)] p-4 shadow-2xl md:grid-cols-[1.4fr_1fr] md:p-6"
          >
            {/* Foto grande + miniaturas */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-2)]">
                {fotos[foto] && (
                  <Image
                    src={urlFor(fotos[foto]).width(1400).url()}
                    alt={`${producto.nombre} — foto ${foto + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-contain"
                    priority
                  />
                )}

                {fotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => mover(-1)}
                      aria-label="Foto anterior"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-[var(--text)] transition hover:bg-white"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => mover(1)}
                      aria-label="Foto siguiente"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-[var(--text)] transition hover:bg-white"
                    >
                      ›
                    </button>
                    <span className="absolute bottom-3 right-3 rounded-full bg-[var(--text)]/75 px-2.5 py-1 text-xs text-white">
                      {foto + 1} / {fotos.length}
                    </span>
                  </>
                )}
              </div>

              {fotos.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {fotos.map((f, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFoto(i)}
                      aria-label={`Ver foto ${i + 1}`}
                      className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border transition ${
                        i === foto
                          ? "border-electric ring-2 ring-electric/30"
                          : "border-[var(--border)] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={urlFor(f).width(160).height(128).url()}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Datos */}
            <div className="flex flex-col">
              <h3 className="font-display text-2xl font-bold text-[var(--text)] md:text-3xl">
                {producto.nombre}
              </h3>
              <p className="mt-2 text-sm text-faint">
                {producto.categoria === "media" ? "Media tensión" : "Baja tensión"}
              </p>

              {producto.descripcion && (
                <p className="mt-5 whitespace-pre-line leading-relaxed text-muted">
                  {producto.descripcion}
                </p>
              )}

              <a
                href="/contacto"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
              >
                Solicitar cotización <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-[var(--text)] transition hover:bg-white md:right-8 md:top-8"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
