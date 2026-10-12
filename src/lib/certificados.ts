import type { CertificacionDoc } from "@/sanity/queries";

/** Imagen de consulta (reducida y con marca de agua) que sirve /api/certificado. */
export function urlCertificado(cert: Pick<CertificacionDoc, "_id" | "rev">, v: "mini" | "grande") {
  return `/api/certificado/${encodeURIComponent(cert._id)}?v=${v}&r=${encodeURIComponent(cert.rev)}`;
}
