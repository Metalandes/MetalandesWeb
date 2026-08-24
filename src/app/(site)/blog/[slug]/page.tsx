import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import PageHero from "@/components/PageHero";
import { urlFor } from "@/sanity/image";
import { getPost, getPosts } from "@/sanity/queries";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: post.titulo,
    description: post.extracto,
    openGraph: post.portada
      ? { images: [urlFor(post.portada).width(1200).height(630).url()] }
      : undefined,
  };
}

function fechaLarga(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main id="main" className="relative z-[2]">
      <PageHero
        kicker={`/ BLOG${post.categoria ? ` · ${post.categoria.toUpperCase()}` : ""}`}
        title={post.titulo}
        subtitle={post.extracto}
        icon="servicios"
      />

      <article className="mx-auto max-w-3xl px-5 pb-28">
        <p className="text-sm text-faint">{fechaLarga(post.fecha)}</p>

        {post.portada && (
          <div className="clip-proto-lg relative mt-8 aspect-[16/9] overflow-hidden bg-[var(--surface-2)]">
            <Image
              src={urlFor(post.portada).width(1600).url()}
              alt={post.titulo}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {post.contenido && (
          <div className="prose-metalandes mt-12">
            <PortableText
              value={post.contenido}
              components={{
                types: {
                  image: ({ value }) => (
                    <span className="clip-proto relative my-8 block aspect-[16/10] overflow-hidden bg-[var(--surface-2)]">
                      <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                    </span>
                  ),
                },
              }}
            />
          </div>
        )}

        <div className="mt-16 border-t border-[var(--border)] pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-[var(--text)]"
          >
            <span aria-hidden>←</span> Volver al blog
          </Link>
        </div>
      </article>
    </main>
  );
}
