import type { Metadata } from "next";
import Image from "next/image";
import SubPage from "@/components/SubPage";
import ProductCatalog from "@/components/ProductCatalog";
import { urlFor } from "@/sanity/image";
import { getProductos, getPaginaProductos } from "@/sanity/queries";
import { PRODUCTOS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Subestaciones de baja tensión",
  description:
    "Tableros y gabinetes de baja tensión en lámina Cold Rolled, galvanizada o inox. Pintura RAL 7032, certificación RETIE (Cert. 0308).",
};

export default async function Page() {
  const { baja } = PRODUCTOS_PAGE;
  const [productos, pag] = await Promise.all([getProductos("baja"), getPaginaProductos()]);
  const titulo = pag.bajaTitulo ?? baja.title;
  const texto = pag.bajaTexto ?? baja.body;
  const specs = pag.bajaSpecs?.length ? pag.bajaSpecs : baja.specs;
  return (
    <SubPage
      parent="Productos"
      parentHref="/productos"
      kicker="/ PRODUCTOS · BAJA TENSIÓN"
      title="Subestaciones de"
      highlight="baja tensión"
      subtitle={texto}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="glass relative aspect-[4/3] overflow-hidden rounded-3xl lg:order-2">
          <Image
            src={pag.bajaImagen ? urlFor(pag.bajaImagen).width(1000).url() : baja.img}
            alt={titulo}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[var(--electric)]/10 mix-blend-overlay" />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:order-1">
          {specs.map((s) => (
            <li key={s} data-reveal className="glass flex gap-3 rounded-xl p-4 text-sm text-muted">
              <span className="mt-1 text-electric">◆</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <ProductCatalog title={pag.bajaCatalogoTitulo ?? baja.catalogoTitle} items={productos} />
      </div>
    </SubPage>
  );
}
