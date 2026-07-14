import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { EMPRESA } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certificaciones",
  description:
    "Certificaciones de Metalandes: ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 y certificados RETIE 2013 (0307–0310).",
};

export default function Page() {
  const { certificaciones } = EMPRESA;
  return (
    <SubPage
      parent="Empresa"
      parentHref="/empresa"
      kicker="/ EMPRESA · CERTIFICACIONES"
      title="Certificaciones"
      subtitle={certificaciones.lead}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {certificaciones.iso.map((c) => (
          <div key={c.code} data-reveal className="glass rounded-2xl p-6">
            <div className="font-display text-xl font-bold text-[var(--text)]">{c.code}</div>
            <p className="mt-2 text-sm text-muted">{c.name}</p>
          </div>
        ))}
      </div>

      <h2 data-reveal className="mt-14 font-display text-2xl font-bold">
        Certificados RETIE 2013
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certificaciones.retie.map((c) => (
          <div key={c.code} data-reveal className="glass rounded-2xl p-5">
            <div className="text-xs tracking-widest text-electric">RETIE 2013</div>
            <div className="mt-1 font-display font-semibold text-[var(--text)]">{c.code}</div>
            <p className="mt-1 text-sm text-muted">{c.name}</p>
          </div>
        ))}
      </div>
    </SubPage>
  );
}
