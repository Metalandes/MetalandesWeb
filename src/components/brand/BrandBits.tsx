/* ============================================================
   Sistema gráfico Metalandes Electric (manual de marca Sensorial)
   Marcas "T" de conector/pulso, separadores con nodo, flecha-botón.
   Elementos SVG livianos, color heredado de la paleta oficial.
   ============================================================ */

/** Marca "T" roja (terminal eléctrico). `flip` la refleja horizontalmente. */
export function TMark({
  className = "h-4 w-auto",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 56 24"
      fill="none"
      stroke="var(--electric)"
      strokeWidth={3}
      strokeLinecap="round"
      aria-hidden
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 12 H38" />
      <path d="M38 5 V19" />
      <path d="M38 5 H50" />
      <path d="M38 19 H50" />
    </svg>
  );
}

/** Antetítulo de marca: T—— TEXTO ——T (estilo descriptor "ELECTRIC"). */
export function ElectricEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-sm font-medium tracking-widest text-electric ${className}`}
    >
      <TMark className="h-3.5 w-9" flip />
      <span>{children}</span>
      <TMark className="h-3.5 w-9" />
    </span>
  );
}

/** Separador con nodo rojo: ——●—— (une títulos/subtítulos). */
export function NodeSeparator({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-hidden>
      <span className="h-px w-10 bg-[var(--border)]" />
      <span className="mx-1 h-2 w-2 rounded-full bg-electric ring-4 ring-[var(--electric)]/15" />
      <span className="h-px w-10 bg-[var(--border)]" />
    </span>
  );
}

/** Flecha-botón: círculo rojo con flecha diagonal (↗). */
export function ArrowButton({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-electric text-white transition group-hover:scale-105 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2">
        <path
          d="M7 17 L17 7 M9 7 H17 V15"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
