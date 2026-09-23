import Hero from "@/components/Hero";
import {
  getCertificaciones,
  getFaqs,
  getPortada,
  getProductosDestacados,
  getServicios,
} from "@/sanity/queries";
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
  const [faqs, portada, servicios, destacados, certs] = await Promise.all([
    getFaqs(),
    getPortada(),
    getServicios(),
    getProductosDestacados(),
    getCertificaciones(),
  ]);
  return (
    <main id="main" className="relative z-[2]">
      <Hero portada={portada} />
      <Empresa portada={portada} />
      <VideoShowcase />
      <Certificaciones certs={certs} titulo={portada.tituloCertificaciones} />
      <Aliados aliados={portada.aliados} titulo={portada.aliadosTitulo} />
      <Servicios servicios={servicios} titulo={portada.tituloServicios} />
      <Productos productos={destacados} titulo={portada.tituloProductos} />
      <Stats cifras={portada.cifras} />
      <FAQ items={faqs} titulo={portada.tituloFaq} />
      <Contacto />
    </main>
  );
}
