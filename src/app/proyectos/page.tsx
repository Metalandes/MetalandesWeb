import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Selección de proyectos de subestaciones, fabricación y mantenimiento eléctrico ejecutados por Metalandes en Colombia.",
};

export default function ProyectosPage() {
  return (
    <main id="main" className="relative z-[2] min-h-dvh px-5 pt-36 pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-medium tracking-widest text-electric">/ PORTAFOLIO</p>
          <h1 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.03] tracking-tight">
            Proyectos que <span className="text-gradient">energizan Colombia</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Una muestra de la ingeniería que hemos entregado en 65 años: subestaciones, fabricación
            y mantenimiento a lo largo del país.
          </p>

          <div className="mt-14">
            <ProjectsGrid />
          </div>
        </div>
    </main>
  );
}
