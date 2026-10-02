/**
 * Bloques numerados en fila (pasos para radicar una PQRS, razones para
 * postularse…): columnas separadas por líneas finas con el número en rojo,
 * en lugar de una tanda de tarjetas. Los textos vienen del Studio.
 */
export default function Pasos({
  items,
}: {
  items: { _key: string; titulo?: string; texto?: string }[];
}) {
  if (!items.length) return null;
  return (
    <ol className="grid border-t border-[var(--border)] md:grid-cols-3 md:divide-x md:divide-[var(--border)]">
      {items.map((t, i) => (
        <li
          key={t._key}
          data-reveal
          className="border-b border-[var(--border)] py-8 md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0"
        >
          <span className="font-display text-4xl font-bold tabular-nums text-electric md:text-5xl">
            {String(i + 1).padStart(2, "0")}
          </span>
          {t.titulo && (
            <h2 className="mt-5 font-display text-2xl font-semibold text-[var(--text)]">{t.titulo}</h2>
          )}
          {t.texto && <p className="mt-3 max-w-sm leading-relaxed text-muted">{t.texto}</p>}
        </li>
      ))}
    </ol>
  );
}
