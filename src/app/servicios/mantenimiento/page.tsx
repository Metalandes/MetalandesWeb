import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { SERVICIOS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mantenimiento eléctrico",
  description:
    "Mantenimiento en media y baja tensión certificado ISO 45001, 24/7 en todo Colombia. Línea de emergencia 310 668 2128.",
};

export default function Page() {
  const { mantenimiento } = SERVICIOS_PAGE;
  return (
    <SubPage
      parent="Servicios"
      parentHref="/servicios"
      kicker="/ SERVICIOS · MANTENIMIENTO"
      title="Mantenimiento"
      highlight="24/7"
      subtitle={mantenimiento.body}
    >
      <div
        data-reveal
        className="glow-ring flex flex-wrap items-center gap-4 rounded-2xl bg-electric/10 p-5"
      >
        <span className="text-sm tracking-widest text-electric">LÍNEA DE EMERGENCIA</span>
        <a
          href={`tel:+57${mantenimiento.emergencia.replace(/\s/g, "")}`}
          className="font-display text-2xl font-bold text-white"
        >
          {mantenimiento.emergencia}
        </a>
        <span className="text-sm text-muted">· 24 horas / 7 días</span>
      </div>

      <h2 data-reveal className="mt-12 font-display text-2xl font-bold">
        Ofrecemos mantenimiento para
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {mantenimiento.items.map((it) => (
          <div key={it} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
            <span className="mt-1 text-electric">◆</span>
            {it}
          </div>
        ))}
      </div>
    </SubPage>
  );
}
