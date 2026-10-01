"use client";

import TituloSeccion, { type Titulo } from "@/components/brand/TituloSeccion";
import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { ElectricEyebrow } from "@/components/brand/BrandBits";
import { urlFor } from "@/sanity/image";
import type { CertificacionDoc } from "@/sanity/queries";

const HREF = "/empresa/certificaciones";

/**
 * Bloque de certificaciones de la portada. Deliberadamente breve: muestra el
 * sello del certificador y qué normas están vigentes, y manda a
 * /empresa/certificaciones, donde se consultan los documentos.
 *
 * Todo sale del Studio (Certificaciones). Si hay certificados ISO se muestran
 * junto al total RETIE; si no, se listan los certificados RETIE con su
 * alcance.
 */
export default function Certificaciones({
  certs = [],
  titulo,
}: {
  certs?: CertificacionDoc[];
  titulo?: Titulo;
}) {
  const scope = useReveal<HTMLDivElement>();
  const sello = certs.find((c) => c.tipo === "sello");
  const iso = certs.filter((c) => c.tipo === "iso");
  const retie = certs.filter((c) => c.tipo === "retie");

  return (
    <section id="certificaciones" className="relative py-16 md:py-24">
      <div ref={scope} className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <div>
          <div data-reveal className="mb-5">
            <ElectricEyebrow>CERTIFICACIONES</ElectricEyebrow>
          </div>
          <TituloSeccion titulo={titulo} fallback={{ texto: "Respaldados por", destacado: "norma" }} />
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {iso.length > 0
              ? "Sistemas de gestión certificados y certificados de producto RETIE vigentes, emitidos por organismos acreditados ante la ONAC."
              : "Nuestros productos cuentan con certificados de conformidad RETIE vigentes, emitidos por un organismo acreditado ante la ONAC."}
          </p>
          <div data-reveal className="mt-9">
            <Link
              href={HREF}
              className="inline-flex items-center gap-2 rounded-xl bg-electric px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
            >
              Ver certificaciones <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <Link
          href={HREF}
          data-reveal
          aria-label="Ver certificaciones"
          className="group block border border-[var(--border)] bg-white transition hover:border-[var(--text)]/25"
        >
          {sello?.imagen && (
            <div
              className="relative aspect-[23/10] border-b border-[var(--border)]"
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src={urlFor(sello.imagen).width(1100).url()}
                alt={`Sello ${sello.codigo} — ${sello.emisor ?? ""}`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                draggable={false}
                className="pointer-events-none select-none object-contain p-6 md:p-8"
              />
            </div>
          )}

          {iso.length > 0 ? (
            <dl className="grid divide-y divide-[var(--border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="p-6 md:p-7">
                <dt className="text-xs font-semibold tracking-widest text-electric">SISTEMAS DE GESTIÓN</dt>
                <dd className="mt-3 space-y-1.5">
                  {iso.map((c) => (
                    <p key={c._id} className="font-display text-lg font-semibold text-[var(--text)]">
                      {c.codigo}
                    </p>
                  ))}
                  {iso[0]?.emisor && <p className="pt-1 text-sm text-faint">{iso[0].emisor}</p>}
                </dd>
              </div>
              <div className="p-6 md:p-7">
                <dt className="text-xs font-semibold tracking-widest text-electric">PRODUCTO · RETIE</dt>
                <dd className="mt-3">
                  <p className="font-display text-5xl font-bold leading-none text-[var(--text)]">{retie.length}</p>
                  <p className="mt-2 text-sm text-muted">certificados de conformidad</p>
                </dd>
              </div>
            </dl>
          ) : (
            /* Sólo certificados de producto: cada uno con su alcance. */
            <div>
              <div className="flex items-end justify-between gap-4 border-b border-[var(--border)] p-6 md:p-7">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-electric">PRODUCTO · RETIE</p>
                  <p className="mt-2 text-sm text-muted">
                    Certificados de conformidad
                    {retie[0]?.emisor ? ` · ${retie[0].emisor.split("·")[0].trim()}` : ""}
                  </p>
                </div>
                <p className="font-display text-5xl font-bold leading-none text-[var(--text)]">{retie.length}</p>
              </div>
              <ul className="divide-y divide-[var(--border)]">
                {retie.map((c) => (
                  <li key={c._id} className="flex items-baseline gap-4 px-6 py-4 md:px-7">
                    <span className="w-24 shrink-0 font-display text-sm font-semibold text-[var(--text)]">{c.codigo}</span>
                    <span className="text-sm text-muted">{c.nombre}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}
