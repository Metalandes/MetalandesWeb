import type { Metadata } from "next";
import Image from "next/image";
import SubPage from "@/components/SubPage";
import { urlFor } from "@/sanity/image";
import RichText from "@/components/RichText";
import { getServicios } from "@/sanity/queries";
import { SERVICIOS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mantenimiento eléctrico",
  description:
    "Mantenimiento en media y baja tensión, 24/7 en todo Colombia. Línea de emergencia 310 668 2128.",
};

export default async function Page() {
  const { mantenimiento } = SERVICIOS_PAGE;
  const servicios = await getServicios();
  const doc = servicios.find((x) => x.enlace === "/servicios/mantenimiento");
  const items = doc?.items?.length ? doc.items : mantenimiento.items;
  const tipos = doc?.servicios ?? [];
  return (
    <SubPage
      parent="Servicios"
      parentHref="/servicios"
      kicker="/ SERVICIOS · MANTENIMIENTO"
      title="Mantenimiento"
      highlight="24/7"
      subtitle={doc?.descripcion ?? mantenimiento.body}
    >
      <div
        data-reveal
        className="glow-ring flex flex-wrap items-center gap-4 rounded-2xl bg-electric/10 p-5"
      >
        <span className="text-sm tracking-widest text-electric">LÍNEA DE EMERGENCIA</span>
        <a
          href={`tel:+57${mantenimiento.emergencia.replace(/\s/g, "")}`}
          className="font-display text-2xl font-bold text-[var(--text)]"
        >
          {mantenimiento.emergencia}
        </a>
        <span className="text-sm text-muted">· 24 horas / 7 días</span>
      </div>

      {doc?.detalle?.length ? (
        <div data-reveal className="mt-12 max-w-3xl">
          <RichText value={doc.detalle} />
        </div>
      ) : null}

      {/* Tipos de servicio con foto, editables en el Studio (Servicios → Mantenimiento). */}
      {!!tipos.length && (
        <>
          <h2 data-reveal className="mt-14 font-display text-2xl font-bold">
            Servicios de mantenimiento
          </h2>
          <ol className="mt-6 grid gap-5 lg:grid-cols-2">
            {tipos.map((t, i) => (
              <li
                key={t._key}
                data-reveal
                className={`glass clip-proto grid overflow-hidden ${t.imagen ? "sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]" : ""}`}
              >
                {t.imagen && (
                  <div className="relative aspect-[4/3] bg-[var(--surface-2)] sm:aspect-auto sm:min-h-full">
                    <Image
                      src={urlFor(t.imagen).width(640).height(520).fit("crop").url()}
                      alt={t.titulo}
                      fill
                      sizes="(max-width: 640px) 100vw, 13rem"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5 md:p-6">
                  <span className="font-display text-sm tabular-nums text-electric">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-[var(--text)]">{t.titulo}</h3>
                  {t.descripcion && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{t.descripcion}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      <h2 data-reveal className="mt-14 font-display text-2xl font-bold">
        Ofrecemos mantenimiento para
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((it, i) => (
          <div key={`${i}-${it}`} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
            <span className="mt-1 text-electric">◆</span>
            {it}
          </div>
        ))}
      </div>
    </SubPage>
  );
}
