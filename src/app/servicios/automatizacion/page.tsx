import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { SERVICIOS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Automatización industrial",
  description:
    "Automatización industrial junto a ELICO GROUP S.A.S: diseño de procesos, sistemas de control, puesta en marcha y soporte.",
};

export default function Page() {
  const { automatizacion } = SERVICIOS_PAGE;
  return (
    <SubPage
      parent="Servicios"
      parentHref="/servicios"
      kicker="/ SERVICIOS · AUTOMATIZACIÓN"
      title="Automatización"
      highlight="industrial"
      subtitle={automatizacion.body}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 data-reveal className="font-display text-2xl font-bold">
            Nuestro proceso
          </h2>
          <ol className="mt-6 flex flex-col gap-3">
            {automatizacion.flow.map((step, i) => (
              <li key={step} data-reveal className="glass flex items-center gap-4 rounded-xl p-5">
                <span className="font-display text-lg font-bold text-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[var(--text)]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 data-reveal className="font-display text-2xl font-bold">
            Sectores atendidos
          </h2>
          <div data-reveal className="mt-6 flex flex-wrap gap-2">
            {automatizacion.sectores.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SubPage>
  );
}
