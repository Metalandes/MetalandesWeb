/**
 * Configuración del proyecto Sanity.
 *
 * El projectId y el dataset no son secretos — viajan al navegador en cada
 * consulta y por eso son públicos (NEXT_PUBLIC_). El token de escritura sí es
 * secreto y nunca se expone al cliente: sólo se lee en el servidor.
 */

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Falta la variable NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Falta la variable NEXT_PUBLIC_SANITY_DATASET"
);

/** Fecha de la API: fijarla evita que un cambio futuro de Sanity rompa el sitio. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-23";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}
