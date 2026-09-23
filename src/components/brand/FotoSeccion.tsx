import Image from "next/image";
import type { Image as SanityImage } from "sanity";
import { urlFor } from "@/sanity/image";

/**
 * Foto opcional que se sube desde el Studio. Si el campo está vacío no se
 * pinta nada: la sección queda como estaba, sin un hueco.
 */
export default function FotoSeccion({
  imagen,
  alt,
  proporcion = "aspect-[16/10]",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className = "",
}: {
  imagen?: SanityImage | null;
  alt: string;
  proporcion?: string;
  sizes?: string;
  className?: string;
}) {
  if (!imagen) return null;
  return (
    <div data-reveal className={`clip-proto-lg relative overflow-hidden bg-[var(--surface-2)] ${proporcion} ${className}`}>
      <Image src={urlFor(imagen).width(1800).url()} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
