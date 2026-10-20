import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad para todo el sitio (incluido el Studio en /studio).
 *
 * La política de contenido (CSP) sólo deja cargar recursos del propio sitio y
 * de Sanity: si alguien lograra inyectar un script o un iframe apuntando a
 * otro servidor, el navegador lo bloquea. Nadie puede meter el sitio dentro de
 * un iframe ajeno (evita que lo disfracen para robar clics o contraseñas).
 *
 * 'unsafe-inline' en scripts y estilos lo exigen Next.js y el Studio de
 * Sanity; 'unsafe-eval' sólo en desarrollo (recarga en caliente).
 * HSTS va sin includeSubDomains: el correo de la empresa vive en subdominios
 * del hosting anterior y no debe verse afectado.
 */
const dev = process.env.NODE_ENV === "development";
/** El Studio además carga sus scripts, fuentes y avisos de versión desde los servidores de Sanity. */
const politica = (studio: boolean) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}${studio ? " https://*.sanity-cdn.com" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    `font-src 'self' data:${studio ? " https://*.sanity.io" : ""}`,
    "media-src 'self' blob:",
    `connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.api.sanity.io wss://*.api.sanity.io${studio ? " https://sanity-cdn.com https://*.sanity-cdn.com" : ""}`,
    "worker-src 'self' blob:",
    "frame-src 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

const seguridad = [
  { key: "Content-Security-Policy", value: politica(false) },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  // No anunciar con qué está hecho el sitio (pista gratis para un atacante).
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: seguridad },
      // Va después: para /studio reemplaza la política general por la del Studio.
      { source: "/studio/:path*", headers: [{ key: "Content-Security-Policy", value: politica(true) }] },
    ];
  },
  images: {
    // AVIF primero (más liviano), luego WebP.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // 75 por defecto; 85 para la portada del hero, que va a pantalla completa.
    qualities: [75, 85],
    // Fotos subidas desde el Studio: viven en la CDN de Sanity.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // La sección se llama PQRS: quien escriba /pqrs llega a la página.
  async redirects() {
    return [{ source: "/pqrs", destination: "/pqr", permanent: true }];
  },
};

export default nextConfig;
