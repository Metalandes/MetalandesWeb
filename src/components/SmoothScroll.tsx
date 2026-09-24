"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Drives Lenis smooth scrolling off GSAP's ticker so ScrollTrigger
 * stays perfectly in sync (single RAF loop, no double-driving).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  /* Al cambiar de página: si el scroll suave venía animándose, seguía hacia
     su destino anterior y la página nueva aparecía a mitad o al final, como
     "trabada". Se corta en seco, se vuelve arriba y se recalculan las
     medidas y las animaciones de aparición de la página nueva. */
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis || window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
