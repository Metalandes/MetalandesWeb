"use client";

import { urlCertificado } from "@/lib/certificados";
import type { CertificacionDoc } from "@/sanity/queries";

const bloquear = (e: React.SyntheticEvent) => e.preventDefault();

/**
 * Certificado en modo consulta: sólo la versión con marca de agua, sin menú
 * del clic derecho, sin arrastrar, sin el "guardar imagen" de la pulsación
 * larga en el celular y oculto al imprimir. Encima va una capa transparente:
 * lo que se toca o se arrastra es esa capa, no la imagen.
 */
export default function CertImagen({
  cert,
  v,
  alt,
  oculto,
  className = "",
  ajuste = "h-full w-full object-contain",
}: {
  cert: Pick<CertificacionDoc, "_id" | "rev" | "ancho" | "alto">;
  v: "mini" | "grande";
  alt: string;
  /** Difuminado mientras la ventana no está a la vista (ver useEscudo). */
  oculto: boolean;
  className?: string;
  ajuste?: string;
}) {
  return (
    <span
      data-cert
      onContextMenu={bloquear}
      onDragStart={bloquear}
      className={`cert-protegido relative block overflow-hidden ${className}`}
    >
      <img
        src={urlCertificado(cert, v)}
        alt={alt}
        width={cert.ancho}
        height={cert.alto}
        loading={v === "mini" ? "lazy" : "eager"}
        decoding="async"
        draggable={false}
        className={`pointer-events-none select-none ${ajuste} transition-[filter] duration-200 ${
          oculto ? "blur-xl" : ""
        }`}
      />
      <span aria-hidden className="absolute inset-0" />
      {oculto && (
        <span className="absolute inset-0 grid place-items-center bg-white/60 p-4 text-center text-xs font-semibold tracking-widest text-[var(--text)]">
          VISTA PROTEGIDA
        </span>
      )}
    </span>
  );
}
