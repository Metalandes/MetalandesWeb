import Hero from "@/components/Hero";
import { getFaqs, getPortada, getServicios } from "@/sanity/queries";
import Empresa from "@/components/Empresa";
import VideoShowcase from "@/components/VideoShowcase";
import Certificaciones from "@/components/Certificaciones";
import Aliados from "@/components/Aliados";
import Servicios from "@/components/Servicios";
import Productos from "@/components/Productos";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Contacto from "@/components/Contacto";

export default async function Home() {
  const [faqs, portada, servicios] = await Promise.all([
    getFaqs(),
    getPortada(),
    getServicios(),
  ]);
  return (
    <main id="main" className="relative z-[2]">
      <Hero />
      <Empresa portada={portada} />
      <VideoShowcase />
      <Certificaciones />
      <Aliados aliados={portada.aliados} titulo={portada.aliadosTitulo} />
      <Servicios servicios={servicios} titulo={portada.tituloServicios} />
      <Productos />
      <Stats cifras={portada.cifras} />
      <FAQ items={faqs} />
      <Contacto />
    </main>
  );
}
