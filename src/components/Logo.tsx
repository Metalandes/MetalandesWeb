import Image from "next/image";

/** Marca oficial Metalandes — "M" de pulso (logo real). */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.jpg"
      alt="Metalandes"
      width={64}
      height={64}
      priority
      className={`${className} rounded-lg object-cover`}
    />
  );
}

/** Logotipo completo (marca + tipografía "Metalandes electric"). */
export function LogoWordmark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo-wordmark.png"
      alt="Metalandes Electric"
      width={934}
      height={305}
      priority
      className={className}
    />
  );
}
