import Image from "next/image";

/** Isotipo oficial Metalandes Electric — "M" de pulso en rojo. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt="Metalandes Electric"
      width={588}
      height={396}
      priority
      className={`${className} object-contain`}
    />
  );
}

/** Isotipo sobre placa navy, en versión cuadrada — el que usa el navbar. */
export function LogoTile({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.jpg"
      alt="Metalandes"
      width={324}
      height={324}
      priority
      className={`${className} rounded-lg object-cover`}
    />
  );
}

/** Imagotipo completo (isotipo + "Metalandes ELECTRIC"). */
export function LogoWordmark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo-wordmark.png"
      alt="Metalandes Electric"
      width={1550}
      height={332}
      priority
      className={className}
    />
  );
}
