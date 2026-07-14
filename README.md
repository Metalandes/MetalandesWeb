# Metalandes — Demo

Landing conceptual para **Metalandes S.A.S.** (sector eléctrico, Medellín · Colombia).
Diseño _cinematic gradient_ con scroll suave y animaciones dirigidas por scroll.

> Demo con fines de diseño. Datos y estadísticas ilustrativos.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19, output estático)
- **GSAP 3** + ScrollTrigger + `@gsap/react` (`useGSAP`)
- **Lenis** — scroll suave, sincronizado al ticker de GSAP
- **Tailwind CSS v4**
- TypeScript

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx        # fuentes, metadata SEO, SmoothScroll
│  ├─ page.tsx          # composición de secciones
│  └─ globals.css       # tema, gradientes, utilidades
├─ components/
│  ├─ SmoothScroll.tsx  # Lenis ↔ GSAP ticker
│  ├─ Navbar.tsx        # nav sticky + drawer móvil
│  ├─ Hero.tsx          # split-text reveal + parallax + blobs
│  ├─ Empresa.tsx       # historia + valores
│  ├─ Servicios.tsx     # cards con glow
│  ├─ Productos.tsx     # scroll horizontal con pin (desktop)
│  ├─ Aliados.tsx       # marquee de aliados
│  ├─ Stats.tsx         # contadores animados
│  ├─ FAQ.tsx           # acordeón animado
│  ├─ ContactForm.tsx   # formulario con validación
│  ├─ Contacto.tsx      # CTA + datos de contacto
│  ├─ ProjectsGrid.tsx  # galería (/proyectos)
│  ├─ Logo.tsx          # marca SVG
│  └─ Footer.tsx
├─ app/proyectos/       # página de portafolio
├─ app/opengraph-image.tsx  # OG dinámica (next/og)
├─ app/{sitemap,robots}.ts  # SEO
├─ hooks/useReveal.ts   # reveal on-scroll reutilizable
└─ lib/
   ├─ gsap.ts           # registro de plugins
   └─ content.ts        # contenido del sitio
```

## Secciones

| Sección       | Interacción                                          |
| ------------- | ---------------------------------------------------- |
| Hero          | Reveal de texto por palabras, parallax, blobs, marquee |
| Empresa       | Reveal on-scroll, cifra 65 años, tarjetas de valores |
| Aliados       | Marquee infinito de sectores/aliados                 |
| Servicios     | Cards con glow y borde animado en hover              |
| Productos     | Scroll horizontal con `pin` (desktop)                |
| Stats         | Contadores animados al entrar en viewport            |
| FAQ           | Acordeón con animación de altura (GSAP)              |
| Contacto      | Formulario validado + CTA a WhatsApp/email           |
| `/proyectos`  | Galería de portafolio con reveal                     |

## Vista previa

```bash
npm run dev
# http://localhost:3000            → landing
# http://localhost:3000/proyectos  → portafolio
# http://localhost:3000/opengraph-image → tarjeta social
```

> Capturas pendientes de agregar en `docs/`.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # servir build
```

## Rendimiento / detalles

- Página 100% estática (prerender), sin JS de servidor.
- Un único RAF: Lenis se conduce desde `gsap.ticker` → ScrollTrigger siempre en sync.
- Respeta `prefers-reduced-motion` (desactiva animaciones y marquee).
- Pin horizontal solo en `≥768px` vía `gsap.matchMedia`; móvil usa scroll nativo.
- Fuentes con `next/font` (self-hosted, `display: swap`).
- SEO: metadata + OpenGraph, `opengraph-image` dinámica, `sitemap.xml`, `robots.txt`.
- Accesibilidad: skip-link, foco visible por teclado, `aria-expanded` en acordeón.

## Deploy

Optimizado para [Vercel](https://vercel.com): importar el repo y desplegar (sin config).
También corre en cualquier host de Node con `npm run build && npm start`.
