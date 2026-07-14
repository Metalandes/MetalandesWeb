/**
 * Marca Metalandes — "M" con destello eléctrico.
 * SVG inline, hereda color vía currentColor / gradiente propio.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Metalandes">
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#2a313b" />
      {/* "M" de pulso / latido eléctrico */}
      <path
        d="M3 18 H8 L11 18 L14 7 L17 22 L20 8 L23 18 L25 18 H29"
        fill="none"
        stroke="#e2042d"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <span className="font-display text-lg font-bold tracking-tight">
        METAL<span className="text-electric">ANDES</span>
      </span>
    </span>
  );
}
