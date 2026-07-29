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
  return (
    <header className="relative overflow-hidden px-5 pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,#eef2f8_0%,transparent_60%)]" />
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-electric/15 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div data-reveal className="mb-5 flex items-center gap-4">
          {icon && <SectionIcon name={icon} className="h-12 w-12" />}
          <ElectricEyebrow>{kicker.replace(/^\/\s*/, "")}</ElectricEyebrow>
        </div>
        <h1
          data-reveal
          className="max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-tight"
        >
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>
        {subtitle && (
          <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
