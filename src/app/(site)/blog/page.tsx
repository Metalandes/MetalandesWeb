import type { Metadata } from "next";
import BlogContent from "@/components/pages/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas técnicas de Metalandes sobre subestaciones, normativa RETIE, mantenimiento eléctrico y la industria metal eléctrica en Colombia.",
};

export default function Page() {
  return <BlogContent />;
}
