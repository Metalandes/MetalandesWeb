import type { Metadata } from "next";
import ProductosContent from "@/components/pages/ProductosContent";
import { getConteoProductos, getPaginaProductos } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Subestaciones de media (13.2–34.5 kV) y baja tensión, tableros y gabinetes certificados RETIE.",
};

export default async function ProductosPage() {
  const [pagina, conteo] = await Promise.all([getPaginaProductos(), getConteoProductos()]);
  return <ProductosContent pagina={pagina} conteo={conteo} />;
}
