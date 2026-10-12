"use client";

import { useEffect, useState } from "react";

/**
 * Oculta los certificados cuando alguien intenta capturarlos.
 *
 * Ninguna página web puede impedir del todo una captura de pantalla (el
 * sistema operativo o la cámara de un celular quedan fuera de su alcance); por
 * eso la defensa principal es la marca de agua del servidor. Esto suma una
 * capa más: el certificado se difumina cuando la ventana pierde el foco (así
 * actúan las herramientas de recorte de Windows y la mayoría de programas de
 * captura), cuando la pestaña queda en segundo plano, al imprimir y al
 * pulsar las teclas de captura que el navegador alcanza a ver.
 */
export function useEscudo() {
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    let temporizador: ReturnType<typeof setTimeout> | undefined;
    const ocultar = () => setOculto(true);
    const mostrar = () => {
      if (document.visibilityState === "visible") setOculto(false);
    };
    // Tras una tecla de captura el certificado sigue oculto un momento.
    const ocultarUnRato = () => {
      setOculto(true);
      clearTimeout(temporizador);
      temporizador = setTimeout(() => setOculto(false), 2500);
    };
    const onVisibilidad = () => (document.hidden ? ocultar() : mostrar());
    const onTecla = (e: KeyboardEvent) => {
      const tecla = e.key.toLowerCase();
      const capturaMac = e.metaKey && e.shiftKey && ["3", "4", "5", "6"].includes(tecla);
      const recorteWindows = e.metaKey && e.shiftKey && tecla === "s";
      if (tecla === "printscreen" || capturaMac || recorteWindows) {
        ocultarUnRato();
        // Si la captura alcanzó a ir al portapapeles, se reemplaza.
        navigator.clipboard?.writeText("").catch(() => {});
      }
    };

    window.addEventListener("blur", ocultar);
    window.addEventListener("focus", mostrar);
    window.addEventListener("beforeprint", ocultar);
    window.addEventListener("afterprint", mostrar);
    document.addEventListener("visibilitychange", onVisibilidad);
    window.addEventListener("keydown", onTecla);
    window.addEventListener("keyup", onTecla);
    return () => {
      clearTimeout(temporizador);
      window.removeEventListener("blur", ocultar);
      window.removeEventListener("focus", mostrar);
      window.removeEventListener("beforeprint", ocultar);
      window.removeEventListener("afterprint", mostrar);
      document.removeEventListener("visibilitychange", onVisibilidad);
      window.removeEventListener("keydown", onTecla);
      window.removeEventListener("keyup", onTecla);
    };
  }, []);

  return oculto;
}
