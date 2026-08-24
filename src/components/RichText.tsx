import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";

/** Texto enriquecido escrito desde el Studio: títulos, listas, negritas y enlaces. */
export default function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="prose-metalandes">
      <PortableText value={value} />
    </div>
  );
}
