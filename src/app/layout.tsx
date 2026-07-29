import type { Metadata, Viewport } from "next";
import { Anybody } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Tipografía oficial de marca (manual Sensorial): familia Anybody.
// Medium para títulos, Light/Regular para texto corrido.
const display = Anybody({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Anybody({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metalandes.net"),
  title: {
    default: "Metalandes Electric — Más de 65 años energizando Colombia",
    template: "%s · Metalandes Electric",
  },
  description:
    "Metalandes Electric. Ingeniería del sector metal eléctrico: diseño, fabricación y mantenimiento de subestaciones. Más de 65 años de compromiso, confianza e innovación desde Medellín, Colombia. Energía que permanece.",
  keywords: [
    "subestaciones",
    "sector eléctrico",
    "mantenimiento eléctrico",
    "Medellín",
    "Colombia",
    "Metalandes",
    "Metalandes Electric",
    "energía",
  ],
  openGraph: {
    title: "Metalandes Electric — Más de 65 años energizando Colombia",
    description:
      "Diseño, fabricación y mantenimiento de subestaciones. Ingeniería metal eléctrica desde Medellín. Energía que permanece.",
    type: "website",
    locale: "es_CO",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
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
      </body>
    </html>
  );
}
