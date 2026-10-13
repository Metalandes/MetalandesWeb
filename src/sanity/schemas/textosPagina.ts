import { defineField, defineType } from "sanity";

/**
 * Textos de una página interna: un documento por página, para que en el
 * Studio cada sección del menú tenga los suyos (Empresa → Textos de la
 * página, Blog → Textos de la página…) y quien edita no tenga que buscar.
 *
 * No todas las páginas usan los tres campos: cada documento muestra sólo los
 * que su página tiene. Si un campo se deja vacío, la página usa su texto
 * original.
 */
export const PAGINAS_TEXTOS: Record<string, { pagina: string; campos: ("intro" | "texto" | "imagen")[] }> = {
  "textos-empresa": { pagina: "Empresa", campos: ["intro", "texto", "imagen"] },
  "textos-certificaciones": { pagina: "Certificaciones", campos: ["intro", "texto"] },
  "textos-productos": { pagina: "Productos", campos: ["intro"] },
  "textos-servicios": { pagina: "Servicios", campos: ["intro"] },
  "textos-proyectos": { pagina: "Proyectos", campos: ["intro"] },
  "textos-blog": { pagina: "Blog", campos: ["intro"] },
  "textos-trabaja": { pagina: "Trabaja con nosotros", campos: ["imagen"] },
};

const sinBorrador = (id?: string) => (id ?? "").replace(/^drafts\./, "");
const oculto =
  (campo: "intro" | "texto" | "imagen") =>
  ({ document }: { document?: { _id?: string } }) =>
    !PAGINAS_TEXTOS[sinBorrador(document?._id)]?.campos.includes(campo);

export const textosPagina = defineType({
  name: "textosPagina",
  title: "Textos de la página",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Introducción",
      type: "text",
      rows: 4,
      description: "El párrafo bajo el título grande de la página.",
      hidden: oculto("intro"),
    }),
    defineField({
      name: "texto",
      title: "Texto de la página",
      type: "text",
      rows: 4,
      description:
        "Párrafo dentro de la página: en Empresa va antes del índice de secciones; en Certificaciones, antes de los certificados.",
      hidden: oculto("texto"),
    }),
    defineField({
      name: "imagen",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      description: "Foto ancha (21:9) de la página. Opcional: sin foto la página se ve completa igual.",
      hidden: oculto("imagen"),
    }),
  ],
  preview: {
    select: { id: "_id" },
    prepare: ({ id }) => {
      const p = PAGINAS_TEXTOS[sinBorrador(id)];
      const soloFoto = p?.campos.length === 1 && p.campos[0] === "imagen";
      return { title: `${soloFoto ? "Foto" : "Textos"} — ${p?.pagina ?? "página"}` };
    },
  },
});
