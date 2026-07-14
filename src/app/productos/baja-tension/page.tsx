import type { Metadata } from "next";
import Image from "next/image";
import SubPage from "@/components/SubPage";
import { PRODUCTOS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Subestaciones de baja tensión",
  description:
    "Tableros y gabinetes de baja tensión en lámina Cold Rolled, galvanizada o inox. Pintura RAL 7032, certificación RETIE 2013 (Cert. 0308).",
};

export default function Page() {
  const { baja } = PRODUCTOS_PAGE;
  return (
    <SubPage
      parent="Productos"
      parentHref="/productos"
      kicker="/ PRODUCTOS · BAJA TENSIÓN"
      title="Subestaciones de"
      highlight="baja tensión"
      subtitle={baja.body}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="glass relative aspect-[4/3] overflow-hidden rounded-3xl lg:order-2">
          <Image
            src={baja.img}
            alt={baja.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[var(--electric)]/10 mix-blend-overlay" />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:order-1">
          {baja.specs.map((s) => (
            <li key={s} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
              <span className="mt-1 text-electric">◆</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </SubPage>
  );
}
