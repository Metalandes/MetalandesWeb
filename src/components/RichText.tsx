import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "sanity";

/**
 * Sólo se enlazan destinos conocidos. Un `javascript:` pegado desde un correo
 * o una página maliciosa ejecutaría código al hacer clic; en ese caso el texto
 * queda sin enlace.
 */
const DESTINO_SEGURO = /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i;

/** Enlaces del texto enriquecido: los externos abren en otra pestaña. */
export const marcasTexto: PortableTextComponents["marks"] = {
  link: ({ value, children }) => {
    const href = typeof value?.href === "string" ? value.href.trim() : "";
    if (!DESTINO_SEGURO.test(href)) return <>{children}</>;
    const externo = /^https?:\/\//i.test(href);
    return (
      <a href={href} {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
};

/** Texto enriquecido escrito desde el Studio: títulos, listas, negritas y enlaces. */
export default function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="prose-metalandes">
      <PortableText value={value} components={{ marks: marcasTexto }} />
    </div>
  );
}
