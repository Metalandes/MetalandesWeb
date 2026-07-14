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
│  ├─ Stats.tsx         # contadores animados
│  ├─ Contacto.tsx      # CTA + datos de contacto
│  └─ Footer.tsx
├─ hooks/useReveal.ts   # reveal on-scroll reutilizable
└─ lib/
   ├─ gsap.ts           # registro de plugins
   └─ content.ts        # contenido del sitio
```

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
