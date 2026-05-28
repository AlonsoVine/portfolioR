# Convenciones de código

## TypeScript

- `strict: true`. No usar `any` sin justificación inline.
- Tipos compartidos en `src/data/portfolio.ts` (mientras se mantenga; ver ADR-0004) o en un futuro `src/types/`.
- Preferir `type` sobre `interface` salvo extensión declarativa.

## React / Next

- Componentes de servidor por defecto (App Router). `'use client'` solo cuando hace falta estado, efectos o APIs del DOM.
- Server-safe: ningún componente debería leer `window` o `localStorage` fuera de `useEffect`.
- Imports con alias `@/` configurado en `tsconfig.json`.

## Estilos

- Tailwind utility-first. Clases largas → extraer a `@apply` en `globals.css` solo si se repiten ≥3 veces.
- Colores **siempre** vía CSS vars (`var(--foreground)`, `var(--surface-card)`, `var(--pill-*-bg)`).
- Nada de `style={{ color: "#fbbf24" }}` con hex hardcodeado — rompe theming.

## i18n

- Todo texto visible al usuario en `src/i18n/locales/{es,en}.ts`.
- Mantener **paridad de claves** entre ES y EN. Si añades una en uno, añádela en el otro.
- No interpolar HTML en strings traducidos; usar componentes con `children`.

## Assets

- Imágenes en `src/assets/` (importadas) o `public/images/` (rutas estáticas).
- Toda referencia a `/images/...` o `/assets/...` debe prefijarse con `NEXT_PUBLIC_BASE_PATH` o el helper `withBasePath`.
- Formatos preferidos: AVIF > WebP > PNG/JPG.

## Comentarios

Default: **ninguno**. Añade un comentario solo cuando:

- Hay un *workaround* documentado (bug upstream, hack temporal con TODO + fecha o issue).
- Hay un invariante no evidente que un lector futuro podría romper.
- Hay una decisión que merecía un ADR pero el contexto local también lo necesita.

Nunca:
- "Esto crea un botón." (lo dice el código).
- "Añadido para issue #42." (lo dice git blame).
- Bloques JSDoc para funciones triviales.

## Animaciones

- Reutilizar `scrollRevealConfig` de `src/lib/utils.ts`.
- Respetar `@media (prefers-reduced-motion: reduce)` — desactivar transforms y duraciones largas.
- Ningún `setTimeout` para animar; usar framer-motion o CSS transitions.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<scope opcional>): <resumen en imperativo, minúscula, sin punto final>

<cuerpo opcional con el "porqué", no el "qué">

<footer opcional: refs, BREAKING CHANGE>
```

Tipos: `feat`, `fix`, `refactor`, `perf`, `style`, `test`, `docs`, `chore`, `ci`, `build`.

Prefijo especial: `deploy:` en `main` dispara el workflow de GitHub Pages. Reserva ese prefijo solo para eso.

## Branches

- `main` — siempre desplegable.
- Trabajo en `feat/NN-slug`, `fix/NN-slug`, `docs/NN-slug` referenciando el número de spec/ADR.
