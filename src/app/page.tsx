import Hero from "@/components/Hero";
import Empresa from "@/components/Empresa";
import Aliados from "@/components/Aliados";
import Servicios from "@/components/Servicios";
import Productos from "@/components/Productos";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <main id="main" className="relative z-[2]">
      <Hero />
      <Empresa />
      <Aliados />
      <Servicios />
      <Productos />
      <Stats />
      <FAQ />
      <Contacto />
    </main>
  );
}
