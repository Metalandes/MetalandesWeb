import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ContactoProvider } from "@/components/ContactoProvider";
import { resolverContacto } from "@/lib/contacto";
import { getContacto, getNavegacion } from "@/sanity/queries";

/**
 * Envoltorio del sitio público. Agrupa la navegación, el pie y el scroll
 * suave, que no deben aplicarse al Studio de contenido (/studio): Lenis
 * interfiere con el scroll propio del editor y el navbar taparía su interfaz.
 *
 * Los datos de contacto se resuelven aquí una sola vez y bajan por contexto,
 * para que el pie, el botón de WhatsApp y el formulario lean siempre lo mismo.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [contactoDoc, nav] = await Promise.all([getContacto(), getNavegacion()]);
  const contacto = resolverContacto(contactoDoc);

  return (
    <ContactoProvider value={contacto}>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <div className="noise" aria-hidden />
      <SmoothScroll>
        <Navbar nav={nav} />
        {children}
        <Footer contacto={contacto} nav={nav} />
      </SmoothScroll>
      <WhatsAppButton />
    </ContactoProvider>
  );
}
