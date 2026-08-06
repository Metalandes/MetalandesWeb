import Hero from "@/components/Hero";
import Empresa from "@/components/Empresa";
import VideoShowcase from "@/components/VideoShowcase";
import Certificaciones from "@/components/Certificaciones";
import Aliados from "@/components/Aliados";
import Servicios from "@/components/Servicios";
import Productos from "@/components/Productos";
import ProductoDestacado from "@/components/ProductoDestacado";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <main id="main" className="relative z-[2]">
      <Hero />
      <Empresa />
      <VideoShowcase />
      <Certificaciones />
      <Aliados />
      <Servicios />
      <Productos />
      <ProductoDestacado />
      <Stats />
      <FAQ />
      <Contacto />
    </main>
  );
}
