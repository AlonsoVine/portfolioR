# Definition of Done

Una tarea no está hecha hasta que **todas** las casillas aplicables están marcadas.

## Siempre

- [ ] `npm run lint` sin errores ni warnings nuevos.
- [ ] `npm run build` exitoso.
- [ ] Sin `console.log`, `debugger`, código comentado ni TODOs sin issue asociado.
- [ ] Sin `any` nuevos.
- [ ] Conventional Commit message correcto.
- [ ] Spec (`docs/features/NN-slug.md`) actualizada con outcome y decisiones reales.

## Si tocaste UI

- [ ] Probado en modo **dark** y **light**.
- [ ] Probado en **móvil** (≤ 640px) y **desktop** (≥ 1024px).
- [ ] Probado en **español** y **inglés**.
- [ ] Sin layout shift visible (CLS razonable).
- [ ] Animaciones respetan `prefers-reduced-motion` (si añadiste alguna).
- [ ] Elementos interactivos tienen `aria-label` o texto accesible.
- [ ] Contraste suficiente en ambos temas (mínimo WCAG AA).

## Si añadiste o tocaste contenido

- [ ] Texto presente en `src/i18n/locales/es.ts` **y** `src/i18n/locales/en.ts`.
- [ ] Sin typos (lectura final).
- [ ] Sin información sensible (emails personales en código, claves).

## Si añadiste o modificaste una ruta, sección visible o asset indexable

Aplica el estándar de [ADR-0005 — SEO mínimo](./adr/0005-estandar-seo-minimo.md). Resumen:

- [ ] `Metadata` (title, description 120–160, canonical, OG, Twitter) por ruta.
- [ ] `sitemap.ts` actualizado si añadiste ruta.
- [ ] JSON-LD presente (Person en root; CreativeWork/BlogPosting en página específica si aplica).
- [ ] Una sola `<h1>` por página; jerarquía `h2/h3` correcta.
- [ ] `alt` descriptivo (o `alt=""` decorativo) en toda imagen.
- [ ] Lighthouse móvil: SEO ≥ 95, A11y ≥ 95.
- [ ] Rich Results Test y LinkedIn Post Inspector sin errores.

## Si añadiste un asset

- [ ] Optimizado (WebP/AVIF cuando aplique).
- [ ] Ruta prefijada con `NEXT_PUBLIC_BASE_PATH` / `withBasePath`.
- [ ] `alt` descriptivo si es imagen de contenido (no decorativa).

## Si tocaste arquitectura, deps o despliegue

- [ ] ADR creado en `docs/adr/` y enlazado.
- [ ] `package.json` y `package-lock.json` commiteados juntos.
- [ ] Probado con `NEXT_PUBLIC_BASE_PATH="/portfolioR"` en local.
- [ ] Documentación afectada (CLAUDE.md, AGENTS.md, README.md) actualizada.

## Si tocaste el formulario de contacto o algo expuesto a usuarios

- [ ] Validación client-side correcta.
- [ ] Mensaje de error y de éxito en ambos idiomas.
- [ ] Sin variables sensibles en bundle (revisar que solo `NEXT_PUBLIC_*` cliente).
