import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { ProductoDoc } from "@/sanity/queries";

/**
 * Catálogo de productos de una subestación.
 *
 * El contenido viene de Sanity: marketing agrega, renombra, reordena y sube
 * fotos desde /studio sin tocar código. Cada tarjeta reserva el espacio de la
 * foto aunque todavía no exista, para que al cargarla no se mueva el layout.
 */
export default function ProductCatalog({
  title,
  items,
}: {
  title: string;
  items: ProductoDoc[];
}) {
  if (items.length === 0) return null;

  return (
    <section>
      <div data-reveal className="flex items-center gap-4">
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <span className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-sm text-faint">{items.length}</span>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item._id}
            data-reveal
            className="group glass clip-proto overflow-hidden p-3 transition duration-300 hover:-translate-y-1.5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--surface-2)]">
              {item.imagen ? (
                <Image
                  src={urlFor(item.imagen).width(600).height(450).url()}
                  alt={item.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                // Espacio reservado hasta que se cargue la foto en el Studio
                <div className="brand-pattern absolute inset-0 opacity-[0.15]" />
              )}
            </div>

            <div className="px-1 pb-1 pt-4">
              <h3 className="font-display font-semibold leading-snug text-[var(--text)]">
                {item.nombre}
              </h3>
              {item.descripcion && (
                <p className="mt-1 text-xs leading-snug text-muted">{item.descripcion}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
