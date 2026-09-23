"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll-triggered stagger reveal for any element carrying [data-reveal]
 * inside the returned ref scope.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const propios: HTMLElement[] = [];
      items.forEach((el) => {
        /* Una página y un componente dentro de ella pueden usar este hook a
           la vez y encontrar el mismo elemento. Animarlo dos veces lo dejaba
           invisible, así que cada elemento se anima una sola vez. */
        if (el.dataset.revealListo) return;
        el.dataset.revealListo = "1";
        propios.push(el);
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      // Al desmontar se liberan para que la próxima visita los vuelva a animar.
      return () => propios.forEach((el) => delete el.dataset.revealListo);
    },
    { scope }
  );

  return scope;
}
