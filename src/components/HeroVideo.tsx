"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Fondo del hero: poster optimizado (LCP) + video diferido.
 * El video sólo se monta tras la hidratación y si el dispositivo/conexión
 * lo permite (no móvil pequeño, no data-saver, no conexión lenta, no
 * reduced-motion). Así la carga inicial no se bloquea con el MP4.
 */
export default function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;

    // @ts-expect-error — connection es experimental
    const conn = navigator.connection;
    const slow =
      conn && (conn.saveData || ["slow-2g", "2g", "3g"].includes(conn.effectiveType));

    if (mqReduce || isSmall || slow) return;

    // Espera a que el hilo esté libre para no competir con el primer render.
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 400));
    const id = idle(() => setShowVideo(true));
    return () => {
      const cancel = (window as unknown as { cancelIdleCallback?: (n: number) => void })
        .cancelIdleCallback;
      if (cancel) cancel(id as number);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <Image
        src="/hero-poster.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      {/* Overlay legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/45 to-white/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/5" />
      <div className="grid-bg absolute inset-0 opacity-35" />
    </div>
  );
}
