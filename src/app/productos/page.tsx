import type { Metadata } from "next";
import ProductosContent from "@/components/pages/ProductosContent";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Subestaciones de media (13.2–34.5 kV) y baja tensión, tableros y gabinetes certificados RETIE 2013.",
};

export default function ProductosPage() {
  return <ProductosContent />;
}
