# ADR-0001: Stack Next.js 16 + export estático en GitHub Pages

- **Estado**: Accepted
- **Fecha**: 2026-05-28 (retroactivo)
- **Tags**: stack, despliegue

## Contexto y problema

Necesitamos un portfolio personal con buen SEO, animaciones, soporte i18n y modo dark/light, hospedado con coste cero y sin mantenimiento operativo.

## Drivers

- Coste cero.
- SEO indexable (HTML pre-renderizado).
- DX moderna (TypeScript, tooling actual).
- Despliegue automático en git push.
- Sin necesidad de runtime de servidor (no hay datos dinámicos por usuario).

## Opciones consideradas

### A — Next.js 16 con `output: "export"` en GitHub Pages
- Pros: framework de referencia React, App Router moderno, ecosistema enorme, free hosting en Pages, HTML estático = SEO + velocidad.
- Contras: pierdes Server Actions, ISR, middleware. Hay que prefijar assets con `basePath`.

### B — Astro
- Pros: aún más ligero, islands architecture, excelente para sites de contenido.
- Contras: ecosistema React menor; ya conozco Next; reescribir cuesta.

### C — Vite + React SPA
- Pros: simple, rápido.
- Contras: SEO peor sin SSR/SSG; tendría que añadir prerender manual.

## Decisión

**Next.js 16 con `output: "export"`** desplegado en GitHub Pages bajo subpath `/portfolioR`.

## Consecuencias

### Positivas
- HTML pre-renderizado, buen SEO.
- Free hosting con CDN global de GitHub.
- Stack alineado con experiencia profesional del autor.

### Negativas / trade-offs
- Prohibido usar Route Handlers, Server Actions, ISR, middleware → si una feature lo necesita, requiere ADR de migración (e.g., a Vercel).
- Subpath `/portfolioR` obliga a prefijar manualmente todos los assets.
- `next/image` con `unoptimized: true` → optimización debe hacerse en build manual.

### Implicaciones futuras
- Si introducimos backend (chatbot CV, analytics propio), evaluar mover a Vercel o añadir un microservicio externo (Cloudflare Workers).
