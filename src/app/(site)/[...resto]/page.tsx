import { notFound } from "next/navigation";

/**
 * Cualquier dirección que no corresponde a una página cae aquí y muestra la
 * 404 del sitio — con menú y pie — en vez de la página en blanco de Next.
 */
export default function RutaDesconocida() {
  notFound();
}
