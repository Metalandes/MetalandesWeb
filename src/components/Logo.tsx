/**
 * Marca Metalandes — "M" con destello eléctrico.
 * SVG inline, hereda color vía currentColor / gradiente propio.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Metalandes">
      <defs>
        <linearGradient id="ml-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--electric)" />
          <stop offset="1" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#ml-grad)" />
      <path
        d="M8 23V10l5 7 5-7v13"
        fill="none"
        stroke="#05070d"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M22 9l-3 6h3l-3 8"
        fill="none"
        stroke="#05070d"
        strokeWidth="2.4"
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
        METAL<span className="text-cyan">ANDES</span>
      </span>
    </span>
  );
}
