# CLAUDE.md — Contexto para agentes (Claude Code y compatibles)

> Este archivo se carga automáticamente en cada sesión de Claude Code. Mantenerlo **corto, vigente y de alta señal**. Para detalles extensos, enlazar a `docs/`.

## TL;DR del proyecto

Portfolio personal de Alonso Viñé. **Next.js 16 (App Router) + React 19 + TS 5 + Tailwind 4**, exportado como sitio estático (`output: "export"`) y servido en GitHub Pages bajo el subpath `/portfolioR`. Despliegue por GitHub Actions cuando un commit en `main` empieza por `deploy:`.

## Comandos

```powershell
npm ci          # instalar dependencias
npm run dev     # desarrollo en http://localhost:3000
npm run build   # genera /out (export estático)
npm run lint    # ESLint 9 + reglas Next
```

Para probar el subpath localmente: `$env:NEXT_PUBLIC_BASE_PATH="/portfolioR"; npm run dev`.

## Mapa de carpetas (lo que más toca)

- `src/app/` — `layout.tsx`, `page.tsx`, `globals.css` (tokens de tema en CSS vars).
- `src/components/sections/` — Hero, About, SkillsGrid, ExperienceTimeline, ProjectsGrid, Education, Contact.
- `src/components/layout/` — Header, Footer.
- `src/components/ui/` — ThemeToggle, LanguageToggle, ScrollToTopButton.
- `src/i18n/` — provider de idioma + diccionarios `es.ts` / `en.ts` (**fuente de verdad del contenido**).
- `src/data/portfolio.ts` — types compartidos + fallbacks (ver ADR-0004).
- `src/lib/utils.ts` — helpers (animaciones, `cn`).
- `src/assets/` y `public/` — imágenes, CV, certificados.
- `docs/` — toda la documentación viva del proyecto.

## Reglas no negociables para el agente

1. **Idioma**: contenido visible al usuario va en **`src/i18n/locales/{es,en}.ts`**, no en componentes ni en `portfolio.ts`. Si añades texto, hazlo en los dos diccionarios.
2. **Assets**: todas las rutas a imágenes/CV deben ir prefijadas con `process.env.NEXT_PUBLIC_BASE_PATH || ""` (o un helper `withBasePath` cuando exista). Si no, romperán en GitHub Pages.
3. **`output: "export"`** está activo: nada de Route Handlers, Server Actions, ISR, middleware o rutas dinámicas sin `generateStaticParams`. Sólo SSG puro.
4. **Theming**: usa las CSS vars de `globals.css` (`--foreground`, `--surface-card`, `--pill-*-bg`, etc.). No hardcodees colores; rompen el modo light/dark.
5. **Comentarios**: no añadir comentarios de relleno. Solo el "porqué" cuando no sea evidente (ver `docs/conventions.md`).
6. **Animaciones**: reutilizar `scrollRevealConfig`; respetar `prefers-reduced-motion` (ver ADR-0006 cuando exista).
7. **Sin `any`**: el proyecto está tipado; si encuentras `as any`, prefiere tipar correctamente antes que propagarlo.
8. **Antes de tocar arquitectura** (añadir librería, cambiar despliegue, introducir backend), **lee `docs/adr/`** y propón un ADR nuevo si la decisión no está cubierta.

## Workflow de features

Toda feature sigue: **Spec → Plan → Implement → Verify → PR**. Detalle en `docs/workflow.md`. Plantilla en `docs/features/_TEMPLATE.md`.

## Convenciones de commit

[Conventional Commits](https://www.conventionalcommits.org/). Tipos en uso: `feat`, `fix`, `refactor`, `docs`, `chore`, `perf`, `style`, `test`, `ci`. Prefijo especial `deploy:` dispara el workflow de GitHub Pages.

## Antes de cerrar una tarea

- `npm run lint` limpio.
- `npm run build` sin warnings.
- Si tocaste UI: probado en dark y light, en móvil y desktop, en `es` y `en`.
- Si tocaste rutas/assets: probado con `NEXT_PUBLIC_BASE_PATH="/portfolioR"`.
- Definition of Done completa: `docs/definition-of-done.md`.

## Enlaces clave

- [`README.md`](./README.md) — visión general humana.
- [`MEJORAS.md`](./MEJORAS.md) — backlog de mejoras priorizadas.
- [`docs/workflow.md`](./docs/workflow.md) — cómo trabajamos con agentes.
- [`docs/adr/`](./docs/adr/) — decisiones de arquitectura.
- [`docs/features/`](./docs/features/) — specs por feature.
- [`docs/conventions.md`](./docs/conventions.md) — estilo y patrones de código.
- [`docs/definition-of-done.md`](./docs/definition-of-done.md) — checklist por tipo de cambio.
