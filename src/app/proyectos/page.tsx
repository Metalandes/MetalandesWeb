import type { Metadata } from "next";
import Link from "next/link";
import ProjectsGrid from "@/components/ProjectsGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Selección de proyectos de subestaciones, fabricación y mantenimiento eléctrico ejecutados por Metalandes en Colombia.",
};

export default function ProyectosPage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            METAL<span className="text-cyan">ANDES</span>
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-muted transition hover:text-white"
          >
            ← Inicio
          </Link>
        </div>
      </header>

      <main id="main" className="relative z-[2] min-h-dvh px-5 pt-36 pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-medium tracking-widest text-cyan">/ PORTAFOLIO</p>
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
      <Footer />
    </>
  );
}
