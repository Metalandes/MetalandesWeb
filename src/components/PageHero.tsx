import { ElectricEyebrow } from "@/components/brand/BrandBits";
import { SectionIcon } from "@/components/brand/SectionIcon";

export default function PageHero({
  kicker,
  title,
  highlight,
  subtitle,
  icon,
}: {
  kicker: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  icon?: "nosotros" | "productos" | "servicios" | "contacto";
}) {
  /* Formato editorial: el título ocupa la izquierda y la introducción se
     apoya abajo a la derecha, en vez de dejar esa mitad vacía. Una línea
     fina cierra el encabezado. Usa el mismo contenedor que el cuerpo de las
     páginas (max-w-7xl + px-5) para que todo quede alineado. */
  return (
    <header className="relative overflow-hidden pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,#eef2f8_0%,transparent_60%)]" />
        <div className="grid-bg absolute inset-0" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="border-b border-[var(--border)] pb-10 md:pb-14">
          <div data-reveal className="mb-5 flex items-center gap-4">
            {icon && <SectionIcon name={icon} className="h-12 w-12" />}
            <ElectricEyebrow>{kicker.replace(/^\/\s*/, "")}</ElectricEyebrow>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1
              data-reveal
              className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tight"
            >
              {title} {highlight && <span className="text-gradient">{highlight}</span>}
            </h1>
            {subtitle && (
              <p
                data-reveal
                className="max-w-2xl text-lg leading-relaxed text-muted lg:border-l-2 lg:border-electric lg:pb-2 lg:pl-6"
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
