import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { EMPRESA } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gestión integral",
  description:
    "Política del Sistema Integrado de Gestión de Metalandes: calidad, seguridad y salud en el trabajo, y gestión ambiental.",
};

export default function Page() {
  const { gestion } = EMPRESA;
  return (
    <SubPage
      parent="Empresa"
      parentHref="/empresa"
      kicker="/ EMPRESA · GESTIÓN INTEGRAL"
      title="Gestión integral"
      subtitle={gestion.lead}
    >
      <p data-reveal className="max-w-3xl text-lg leading-relaxed text-muted">
        {gestion.body}
      </p>
      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {gestion.points.map((p) => (
          <li key={p} data-reveal className="glass flex gap-3 rounded-xl p-5 text-muted">
            <span className="mt-1 text-electric">◆</span>
            {p}
          </li>
        ))}
      </ul>
    </SubPage>
  );
}
