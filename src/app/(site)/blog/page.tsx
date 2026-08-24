import type { Metadata } from "next";
import BlogContent from "@/components/pages/BlogContent";
import { getPosts } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas técnicas de Metalandes sobre subestaciones, normativa RETIE, mantenimiento eléctrico y la industria metal eléctrica en Colombia.",
};

export default async function Page() {
  const posts = await getPosts();
  return <BlogContent posts={posts} />;
}
