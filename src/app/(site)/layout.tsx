import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Envoltorio del sitio público. Agrupa la navegación, el pie y el scroll
 * suave, que no deben aplicarse al Studio de contenido (/studio): Lenis
 * interfiere con el scroll propio del editor y el navbar taparía su interfaz.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <div className="noise" aria-hidden />
      <SmoothScroll>
        <Navbar />
        {children}
        <Footer />
      </SmoothScroll>
      <WhatsAppButton />
    </>
  );
}
