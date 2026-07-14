import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metalandes.net"),
  title: {
    default: "Metalandes — 65 años energizando Colombia",
    template: "%s · Metalandes",
  },
  description:
    "Metalandes S.A.S. Ingeniería del sector eléctrico: diseño, fabricación y mantenimiento de subestaciones. 65 años de compromiso, confianza e innovación desde Medellín, Colombia.",
  keywords: [
    "subestaciones",
    "sector eléctrico",
    "mantenimiento eléctrico",
    "Medellín",
    "Colombia",
    "Metalandes",
    "energía",
  ],
  openGraph: {
    title: "Metalandes — 65 años energizando Colombia",
    description:
      "Diseño, fabricación y mantenimiento de subestaciones. Ingeniería eléctrica desde Medellín.",
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
      </body>
    </html>
  );
}
