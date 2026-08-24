import type { ReactNode } from "react";

export type Titulo = { texto?: string; destacado?: string };

/**
 * Título de sección con la parte final en degradado rojo, como manda el
 * manual de marca. Cae al texto por defecto si el Studio aún no lo define.
 */
export default function TituloSeccion({
  titulo,
  fallback,
  className = "font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight",
  children,
}: {
  titulo?: Titulo;
  fallback: { texto: string; destacado: string };
  className?: string;
  children?: ReactNode;
}) {
  const texto = titulo?.texto || fallback.texto;
  const destacado = titulo?.destacado ?? fallback.destacado;

  return (
    <h2 data-reveal className={className}>
      {texto} {destacado && <span className="text-gradient">{destacado}</span>}
      {children}.
    </h2>
  );
}
