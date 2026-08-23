import type { Metadata } from "next";
import Link from "next/link";
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

      <div data-reveal className="mt-10 border-l-2 border-electric pl-6">
        <p className="max-w-3xl text-sm leading-relaxed text-muted">{gestion.alcance}</p>
        <p className="mt-5 font-display font-semibold text-[var(--text)]">
          {gestion.firma.nombre}
        </p>
        <p className="text-sm text-faint">{gestion.firma.cargo}</p>
      </div>

      <h2 data-reveal className="mt-16 font-display text-2xl font-bold">
        Pilares del sistema
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {gestion.pilares.map((p) => (
          <div key={p.title} data-reveal className="glass clip-proto p-8">
            <h3 className="font-display text-xl font-semibold text-[var(--text)]">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div data-reveal className="glass clip-proto mt-8 p-8 md:p-10">
        <h2 className="font-display text-xl font-semibold text-[var(--text)]">
          Disposición final de equipos
        </h2>
        <p className="mt-3 max-w-4xl leading-relaxed text-muted">{gestion.raee}</p>
      </div>

      <div data-reveal className="mt-8 text-sm text-faint">
        Para sugerencias, peticiones, quejas y reclamos, consulta nuestro{" "}
        <Link href="/pqr" className="text-electric underline-offset-4 hover:underline">
          canal de PQR
        </Link>
        .
      </div>
    </SubPage>
  );
}
