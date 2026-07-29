/* ============================================================
   Iconos de sección Metalandes Electric (círculo navy + glifo).
   Inspirados en símbolos eléctricos del manual de marca.
   ============================================================ */

type IconName = "nosotros" | "productos" | "servicios" | "contacto";

const GLYPHS: Record<IconName, React.ReactNode> = {
  // "M" de pulso (roja) — nosotros
  nosotros: (
    <path
      d="M6 27 H15 L20 8 L27 34 L33 15 L36 24 H42"
      stroke="var(--electric)"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  // Símbolo de tierra / no-igual — productos
  productos: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" fill="none">
      <path d="M24 8 V32" />
      <path d="M14 17 H34" />
      <path d="M17 24 H31" />
      <path d="M12 30 L36 12" />
    </g>
  ),
  // Contactos colgantes (péndulos) — servicios
  servicios: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" fill="none">
      <path d="M13 12 H35" />
      <path d="M18 12 V26" />
      <path d="M24 12 V26" />
      <path d="M30 12 V26" />
      <circle cx="18" cy="30" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="24" cy="30" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="30" cy="30" r="2.5" fill="currentColor" stroke="none" />
    </g>
  ),
  // Flechas convergentes >< — contacto
  contacto: (
    <g stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M10 12 L20 20 L10 28" />
      <path d="M38 12 L28 20 L38 28" />
      <path d="M20 20 H28" />
    </g>
  ),
};

export function SectionIcon({
  name,
  className = "h-14 w-14",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[var(--text)] text-[var(--steel)] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="h-3/5 w-3/5">
        {GLYPHS[name]}
      </svg>
    </span>
  );
}
