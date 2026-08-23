import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Módulo de edición. El Studio se renderiza como aplicación cliente dentro de
 * esta ruta; Sanity se encarga del login, así que no hace falta autenticación
 * propia.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contenido — Metalandes",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
