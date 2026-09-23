import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProyectos, getTextosPaginas } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Selección de proyectos de subestaciones, fabricación y mantenimiento eléctrico ejecutados por Metalandes en Colombia.",
};

export default async function ProyectosPage() {
  const [proyectos, textos] = await Promise.all([getProyectos(), getTextosPaginas()]);
  return (
    <main id="main" className="relative z-[2]">
      <PageHero
        kicker="/ PORTAFOLIO"
        title="Proyectos que"
        highlight="energizan Colombia"
        subtitle={
          textos.proyectosIntro ??
          "Una muestra de la ingeniería que hemos entregado en más de 65 años: subestaciones, fabricación y mantenimiento a lo largo del país."
        }
        icon="productos"
      />
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 md:pt-16">
        <ProjectsGrid proyectos={proyectos} />
      </div>
    </main>
  );
}
