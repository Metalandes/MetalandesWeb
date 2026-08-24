import type { Metadata } from "next";
import Link from "next/link";
import SubPage from "@/components/SubPage";
import RichText from "@/components/RichText";
import { getPolitica } from "@/sanity/queries";
import { EMPRESA } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gestión integral",
  description:
    "Política del Sistema Integrado de Gestión de Metalandes: calidad, seguridad y salud en el trabajo, y gestión ambiental.",
};

export default async function Page() {
  const p = await getPolitica("gestion-integral");
  const { gestion } = EMPRESA;

  return (
    <SubPage
      parent="Empresa"
      parentHref="/empresa"
      kicker="/ EMPRESA · GESTIÓN INTEGRAL"
      title={p?.titulo ?? gestion.title}
      subtitle={p?.intro ?? gestion.lead}
    >
      <div data-reveal className="max-w-3xl text-lg leading-relaxed">
        <RichText value={p?.cuerpo} />
      </div>

      {p?.lista?.length ? (
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {p.lista.map((punto) => (
            <li key={punto} data-reveal className="glass flex gap-3 rounded-xl p-5 text-muted">
              <span className="mt-1 text-electric">◆</span>
              {punto}
            </li>
          ))}
        </ul>
      ) : null}

      {p?.cierre ? (
        <div data-reveal className="mt-10 border-l-2 border-electric pl-6">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">{p.cierre}</p>
        </div>
      ) : null}

      {p?.tarjetas?.length ? (
        <>
          <h2 data-reveal className="mt-16 font-display text-2xl font-bold">
            Pilares del sistema
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {p.tarjetas.map((t) => (
              <div key={t._key} data-reveal className="glass clip-proto p-8">
                <h3 className="font-display text-xl font-semibold text-[var(--text)]">
                  {t.titulo}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{t.texto}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}

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
