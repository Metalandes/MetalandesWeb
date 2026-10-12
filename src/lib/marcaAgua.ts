import sharp, { type OverlayOptions } from "sharp";

/**
 * Marca de agua de los certificados.
 *
 * Los certificados ya se usaron para fraude, así que nunca llegan al navegador
 * tal cual: el servidor los entrega reducidos y con este texto repetido en
 * diagonal sobre todo el documento ("SOLO CONSULTA · NO VÁLIDO COMO
 * DOCUMENTO"). Una captura de pantalla o una descarga queda marcada.
 *
 * El texto va como imagen ya dibujada (PNG 440×104, transparente) porque los
 * servidores de Vercel no traen fuentes: un SVG con texto saldría en blanco.
 */
const BLOQUE = Buffer.from(
  "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",
  "base64"
);
const BLOQUE_ANCHO = 440;
const BLOQUE_ALTO = 104;
/** Ancho de imagen para el que está pensado el bloque; en tamaños menores se escala. */
const ANCHO_REFERENCIA = 1100;

export async function marcarCertificado(original: ArrayBuffer, ancho: number): Promise<Buffer> {
  const { data, info } = await sharp(original)
    .resize({ width: ancho, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  // Escala del texto según el tamaño final, para que la densidad sea la misma.
  const escala = Math.min(1, w / ANCHO_REFERENCIA);
  const bw = Math.round(BLOQUE_ANCHO * escala);
  const bh = Math.round(BLOQUE_ALTO * escala);
  const bloque = escala < 1 ? await sharp(BLOQUE).resize({ width: bw }).png().toBuffer() : BLOQUE;
  const pasoX = Math.round(500 * escala);
  const pasoY = Math.round(150 * escala);

  // Filas escalonadas sobre un lienzo que cubre la diagonal; luego se gira
  // la capa completa y se recorta al tamaño del certificado (sin cortes de texto).
  const lado = Math.ceil(Math.hypot(w, h)) + pasoX;
  const capas: OverlayOptions[] = [];
  for (let fila = 0, y = 0; y < lado; fila++, y += pasoY) {
    for (let x = fila % 2 ? -pasoX / 2 : 0; x < lado; x += pasoX) {
      if (x + bw > 0) capas.push({ input: bloque, left: Math.max(0, Math.round(x)), top: y });
    }
  }
  const transparente = { r: 0, g: 0, b: 0, alpha: 0 };
  const capa = await sharp({
    create: { width: lado + bw, height: lado + bh, channels: 4, background: transparente },
  })
    .composite(capas)
    .png()
    .toBuffer();
  const girada = await sharp(capa)
    .rotate(-28, { background: transparente })
    .toBuffer({ resolveWithObject: true });
  const marca = await sharp(girada.data)
    .extract({
      left: Math.round((girada.info.width - w) / 2),
      top: Math.round((girada.info.height - h) / 2),
      width: w,
      height: h,
    })
    .png()
    .toBuffer();

  // JPEG sin metadatos y con calidad media: suficiente para leer, no para reimprimir.
  return sharp(data, { raw: { width: w, height: h, channels: info.channels } })
    .composite([{ input: marca }])
    .jpeg({ quality: 72, mozjpeg: true })
    .toBuffer();
}
