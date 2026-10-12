import { NextResponse, type NextRequest } from "next/server";
import { client } from "@/sanity/client";
import { REFRESCO } from "@/sanity/queries";
import { marcarCertificado } from "@/lib/marcaAgua";

/**
 * Imagen de consulta de un certificado: reducida y con marca de agua.
 *
 * Es la única forma en que un certificado llega al navegador. La página nunca
 * recibe la imagen original de Sanity ni su dirección; sólo esta ruta, que la
 * pide del lado del servidor y la devuelve marcada.
 *
 *   /api/certificado/<id del documento>?v=mini|grande&r=<versión del documento>
 *
 * `r` cambia cada vez que se edita el certificado en el Studio, así la CDN
 * puede guardar cada versión sin entregar una imagen vieja.
 */

const ANCHOS = { mini: 560, grande: 1100 } as const;
const ID_VALIDO = /^[A-Za-z0-9_-]{1,128}$/;

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const v = req.nextUrl.searchParams.get("v") ?? "grande";
  const r = req.nextUrl.searchParams.get("r");
  if (!ID_VALIDO.test(id) || !Object.hasOwn(ANCHOS, v)) {
    return new NextResponse("Solicitud no válida", { status: 400 });
  }

  const cert = await client.fetch<{ rev: string; url: string } | null>(
    `*[_type == "certificacion" && _id == $id && defined(imagen.asset)][0]{
      "rev": _rev, "url": imagen.asset->url
    }`,
    { id },
    { next: { revalidate: REFRESCO, tags: ["certificacion"] } }
  );
  if (!cert?.url) return new NextResponse("No encontrado", { status: 404 });

  // Versión vieja o ausente: se manda a la vigente (cada versión se guarda en caché una sola vez).
  if (r !== cert.rev) {
    const destino = new URL(req.nextUrl);
    destino.search = `?v=${v}&r=${cert.rev}`;
    return NextResponse.redirect(destino, { status: 307, headers: { "Cache-Control": "no-store" } });
  }

  const ancho = ANCHOS[v as keyof typeof ANCHOS];
  const origen = await fetch(`${cert.url}?w=${ancho}&fm=png`, { cache: "no-store" });
  if (!origen.ok) return new NextResponse("No disponible", { status: 502 });

  const jpeg = await marcarCertificado(await origen.arrayBuffer(), ancho);
  return new NextResponse(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": 'inline; filename="certificado-solo-consulta.jpg"',
      "Cache-Control": "public, max-age=86400, s-maxage=31536000",
      "X-Robots-Tag": "noindex, noimageindex, noarchive",
      // Otros sitios no pueden incrustarla.
      "Cross-Origin-Resource-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
