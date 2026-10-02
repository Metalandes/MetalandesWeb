"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Fondo del hero: poster optimizado (LCP) + video diferido.
 * El video sólo se monta tras la hidratación y si la conexión lo permite
 * (no ahorro de datos, no conexión lenta, no reduced-motion), así la carga
 * inicial no se bloquea. En celular se usa una versión liviana (960 px).
 * El video es un loop de 3,5 s con el final fundido sobre el inicio, sin
 * salto al reiniciar.
 */
export default function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const [movil, setMovil] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;

    // @ts-expect-error — connection es experimental
    const conn = navigator.connection;
    const slow =
      conn && (conn.saveData || ["slow-2g", "2g", "3g"].includes(conn.effectiveType));

    if (mqReduce || slow) return;
    setMovil(isSmall);

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
        quality={85}
        className="object-cover object-[64%_center] md:object-center"
      />
      {showVideo && (
        <video
          // key: si cambia el tamaño de pantalla se recarga con la fuente adecuada
          key={movil ? "movil" : "escritorio"}
          className="hero-video absolute inset-0 h-full w-full object-cover object-[64%_center] md:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          aria-hidden
        >
          {movil ? (
            <source src="/hero-movil.mp4" type="video/mp4" />
          ) : (
            <>
              <source src="/hero.webm" type="video/webm" />
              <source src="/hero.mp4" type="video/mp4" />
            </>
          )}
        </video>
      )}
      {/* Overlay legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/45 to-white/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-white/5" />
      {/* En celular el texto ocupa todo el ancho: el degradado lateral no
          alcanza a cubrirlo a la derecha, así que se aclara la foto entera. */}
      <div className="absolute inset-0 bg-white/55 md:hidden" />
      <div className="grid-bg absolute inset-0 opacity-35" />
    </div>
  );
}
