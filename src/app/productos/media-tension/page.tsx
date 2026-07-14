import type { Metadata } from "next";
import Image from "next/image";
import SubPage from "@/components/SubPage";
import { PRODUCTOS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Subestaciones de media tensión",
  description:
    "Celdas de media tensión 13.2–34.5 kV, diseño y fabricación bajo norma con certificación RETIE 2013 (Cert. 0309).",
};

export default function Page() {
  const { media } = PRODUCTOS_PAGE;
  return (
    <SubPage
      parent="Productos"
      parentHref="/productos"
      kicker="/ PRODUCTOS · MEDIA TENSIÓN"
      title="Subestaciones de"
      highlight="media tensión"
      subtitle={media.body}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ul className="grid gap-3 sm:grid-cols-2">
          {media.specs.map((s) => (
            <li key={s} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
              <span className="mt-1 text-electric">◆</span>
              {s}
            </li>
          ))}
        </ul>
        <div data-reveal className="glass relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={media.img}
            alt={media.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[var(--electric)]/10 mix-blend-overlay" />
        </div>
      </div>
    </SubPage>
  );
}
