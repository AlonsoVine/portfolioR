# Feature Playbook

Proceder recomendado para cada una de las 35 mejoras de [`../MEJORAS.md`](../MEJORAS.md). Cada entrada es el resumen ejecutivo para crear su spec (`docs/features/NN-<slug>.md`).

> **Formato por feature**: archivos tocados · pasos clave · criterios de aceptación · ADR si aplica.

---

## #1 — SEO completo (metadata + JSON-LD + sitemap + robots)

- **Archivos**: `src/app/layout.tsx`, **nuevos**: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx` (opc.).
- **Pasos**: (1) ampliar `Metadata` con title template, description larga, keywords, authors, robots; (2) inyectar JSON-LD `Person` en `<head>`; (3) `sitemap.ts` con secciones ancladas; (4) `robots.ts` permitiendo todo, apuntando al sitemap.
- **CA**: rich-results test de Google pasa; Lighthouse SEO = 100; `view-source` muestra metadatos y JSON-LD.
- **ADR**: no.

## #2 — Hero rework (subtítulo + chips + 3er CTA + badge)

- **Archivos**: `src/components/sections/Hero.tsx`, `src/i18n/locales/{es,en}.ts`.
- **Pasos**: (1) reescribir `hero.subtitle` y `hero.role` en diccionarios; (2) añadir array `hero.stack` y renderizar chips bajo el subtítulo reutilizando los tokens `--pill-*`; (3) añadir CTA "Contáctame" con `href="#contact"`; (4) badge "Open to work" sobre avatar (variable de configuración).
- **CA**: render correcto dark/light/móvil/desktop/es/en; tab-order coherente; chips usan los mismos tokens que SkillsGrid.
- **ADR**: no.

## #3 — Bullets de Experiencia con métricas

- **Archivos**: `src/i18n/locales/{es,en}.ts` (sección `experiences`).
- **Pasos**: por cada experiencia, reescribir cada bullet con patrón "Verbo + qué + tech + impacto". Mantener paridad ES/EN.
- **CA**: cada bullet contiene al menos un número o impacto cualitativo concreto; el highlight de techs sigue funcionando.
- **ADR**: no.

## #4 — About con historia + propuesta de valor

- **Archivos**: `src/i18n/locales/{es,en}.ts` (sección `about.textBlocks`).
- **Pasos**: 3 párrafos: trayectoria, propuesta de valor, personal. Sin tocar componente.
- **CA**: 3 párrafos por idioma; sin clichés vacíos; sin overflow visual.
- **ADR**: no.

## #5 — Contadores animados en About

- **Archivos**: `src/components/sections/About.tsx`, **nuevo**: `src/components/ui/AnimatedCounter.tsx`.
- **Pasos**: hook con `useInView` + `useMotionValue` + `animate()`. Datos en diccionario (`about.stats`).
- **CA**: cuentan al entrar en viewport; respetan `prefers-reduced-motion` (saltan al valor final); accesibles con `aria-live="polite"`.
- **ADR**: no.

## #6 — Modal de detalle en Proyectos

- **Archivos**: `src/components/sections/ProjectsGrid.tsx`, `src/i18n/locales/{es,en}.ts`, **nuevo**: `src/components/ui/ProjectModal.tsx`.
- **Pasos**: ampliar tipo `Project` con `gallery`, `challenges`, `architecture`; replicar patrón modal de `Education.tsx` con focus trap; cerrar con Esc + click overlay.
- **CA**: modal accesible (role="dialog", aria-modal, focus trap); galería navegable; cierra correctamente; sin scroll bleed.
- **ADR**: no.

## #7 — Filtro por tecnología en Proyectos

- **Archivos**: `src/components/sections/ProjectsGrid.tsx`, `src/i18n/locales/{es,en}.ts`.
- **Pasos**: derivar lista única de techs desde `projects.items`; `useState` con tag seleccionado; `framer-motion`'s `AnimatePresence` para entrada/salida; "Todos" por defecto.
- **CA**: filtro funciona; URL refleja estado opcionalmente (`?tech=Angular`); cero re-renders innecesarios; accesible (botones con `aria-pressed`).
- **ADR**: no.

## #8 — Añadir 2 proyectos web con demo

- **Archivos**: `src/i18n/locales/{es,en}.ts`, `src/assets/imgs_proyectos/<slug>/...`.
- **Pasos**: construir y desplegar los proyectos (fuera del scope de este repo); aquí solo se añaden las entradas y assets.
- **CA**: ambas demos accesibles públicamente; imágenes optimizadas; descripciones con métrica.
- **ADR**: no (a menos que el deploy de uno requiera infraestructura nueva).

## #9 — GIF/vídeo en hover sobre cards de proyectos

- **Archivos**: `src/components/sections/ProjectsGrid.tsx`, assets en `public/videos/`.
- **Pasos**: tipo `Project.preview?: { type: 'video' | 'gif'; src: string }`; `<video muted loop playsInline>` activado en hover; fallback imagen estática.
- **CA**: no autoplay en móvil; no bloquea LCP; respeta `prefers-reduced-motion` (no reproduce).
- **ADR**: no.

## #10 — Logos oficiales de tech en chips

- **Archivos**: añadir `simple-icons` o SVGs locales; `src/components/ui/TechChip.tsx`; usar en `ProjectsGrid` y `ExperienceTimeline`.
- **Pasos**: mapa `tech → svg`; mantener tokens `--pill-*`; lazy-load de los SVGs.
- **CA**: peso total chips < 10 KB; fallback a chip de texto si no hay logo.
- **ADR**: sí si se añade `simple-icons` como dep (>20 KB) → evaluar SVGs inline.

## #11 — Imágenes a WebP/AVIF

- **Archivos**: scripts `tools/optimize-images.mjs` (nuevo); todos los `src/assets/img*/**/*.png|jpg`.
- **Pasos**: script con `sharp` que genera `.avif` y `.webp` paralelos; actualizar referencias en diccionarios; mantener original como fallback `<picture>`.
- **CA**: peso de página inicial reducido ≥40%; sin regresión visual.
- **ADR**: no (script en `tools/`, no toca runtime).

## #12 — Lazy-load secciones con `next/dynamic`

- **Archivos**: `src/app/page.tsx`.
- **Pasos**: importar Experience, Projects, Education vía `next/dynamic` con `loading: () => <SectionSkeleton/>`.
- **CA**: JS inicial reducido; Lighthouse TBT mejora; secciones cargan sin glitch al scrollear.
- **ADR**: no.

## #13 — A11y: aria-labels, focus trap, prefers-reduced-motion

- **Archivos**: `Header.tsx`, `Education.tsx` (modal), `lib/utils.ts` (scrollRevealConfig), `globals.css`.
- **Pasos**: aria-label dinámico en botón menú; focus trap en modal (paquete `focus-trap-react` o impl propia); media query en `globals.css` que neutraliza transforms; gate JS en `scrollRevealConfig`.
- **CA**: axe DevTools sin issues; Tab navigation correcta en modal; reducir motion = sin animación.
- **ADR**: opcional si se mete dep externa.

## #14 — Contraste modo light

- **Archivos**: `src/app/globals.css` (bloque `[data-theme="light"]`).
- **Pasos**: medir cada `--pill-*-text` y `--accent-warm` sobre su bg; subir/bajar lightness hasta WCAG AA.
- **CA**: Lighthouse a11y = 100 en light; contrast checker manual ≥4.5 en texto normal, ≥3 en grande.
- **ADR**: no.

## #15 — Indicador de sección activa en nav

- **Archivos**: `src/components/layout/Header.tsx`, **nuevo**: `src/lib/useActiveSection.ts`.
- **Pasos**: hook con `IntersectionObserver` que devuelve el `id` visible; aplicar clase activa al link correspondiente.
- **CA**: al scrollear, el link se resalta sin lag; click en link no rompe el observer.
- **ADR**: no.

## #16 — Progress bar de scroll

- **Archivos**: `src/components/ui/ScrollProgress.tsx` (nuevo), `src/app/page.tsx`.
- **Pasos**: `useScroll` + `useTransform` de framer-motion; `<motion.div>` fixed top con `scaleX`.
- **CA**: no causa layout shift; respeta `prefers-reduced-motion`.
- **ADR**: no.

## #17 — scroll-margin-top + smooth scroll

- **Archivos**: `src/app/globals.css`, `src/components/shared/SectionShell.tsx`.
- **Pasos**: `html { scroll-behavior: smooth }`; `section { scroll-margin-top: 5rem }`.
- **CA**: click en link de nav → sección cae bajo el header sin quedar tapada.
- **ADR**: no.

## #18 — Sección Testimonios

- **Archivos**: `src/components/sections/Testimonials.tsx` (nuevo), `src/i18n/locales/{es,en}.ts`, `src/app/page.tsx`, nav.
- **Pasos**: tipo `Testimonial { author, role, company, photo?, quote, sourceUrl }`; grid o carousel; mantener tokens.
- **CA**: ≥3 testimonios reales; link a perfil LinkedIn de origen.
- **ADR**: no.

## #19 — Sección Blog/Notas (MDX)

- **Archivos**: integrar `@next/mdx`, crear `src/app/notes/[slug]/page.tsx`, `content/notes/*.mdx`.
- **Pasos**: configurar MDX; layout de nota con metadata frontmatter; índice en `/notes`; añadir a sitemap.
- **CA**: build estático funciona; SEO por nota; sin client JS innecesario.
- **ADR**: **sí** — afecta routing y build (`adr/0005-mdx-blog.md`).

## #20 — Página /uses

- **Archivos**: `src/app/uses/page.tsx`, contenido en diccionarios o markdown local.
- **Pasos**: lista hardware/software/extensiones; mismo SectionShell.
- **CA**: ruta accesible bajo `/portfolioR/uses/`; aparece en sitemap.
- **ADR**: no.

## #21 — Validación + anti-spam contacto

- **Archivos**: `src/components/sections/Contact.tsx`; nueva util `src/lib/validation.ts`.
- **Pasos**: validación con `zod` (o validación manual ligera); honeypot input oculto; throttle por timestamp client-side; mostrar errores por campo en idioma activo.
- **CA**: emails inválidos rechazados; honeypot bloquea bot trivial; mensajes en es/en.
- **ADR**: sí si se añade `zod` (~13 KB) → considerar validación manual.

## #22 — Refactor: extraer helpers

- **Archivos**: **nuevos** `src/lib/highlight.tsx`, expandir `src/lib/utils.ts` con `withBasePath`, `escapeRegExp`; eliminar duplicados en `ProjectsGrid` y `ExperienceTimeline`.
- **Pasos**: extraer → cambiar imports → eliminar viejas → verificar build.
- **CA**: cero duplicación detectada por `grep`; `withBasePath` testeado con y sin env.
- **ADR**: no.

## #23 — Eliminar `as any`

- **Archivos**: `About.tsx`, `Education.tsx`, `ExperienceTimeline.tsx`, `src/i18n/index.tsx`, `src/lib/utils.ts`.
- **Pasos**: tipar `scrollRevealConfig` como `MotionProps`; tipar `Locale` con todas las claves opcionales; añadir `techLabel` al tipo del heading de experiencias.
- **CA**: `grep "as any" src/` → 0 resultados; build limpio.
- **ADR**: no.

## #24 — Eliminar duplicación portfolio.ts ↔ i18n

- **Archivos**: `src/data/portfolio.ts`, diccionarios.
- **Pasos**: ejecutar plan de migración del [ADR-0004](./adr/0004-fuente-de-verdad-contenido.md).
- **CA**: `portfolio.ts` solo tipos + constantes verdaderamente compartidas; tests visuales OK.
- **ADR**: ya existe (0004).

## #25 — `.env.example` + docs EmailJS

- **Archivos**: nuevo `.env.example`, sección en `README.md`.
- **Pasos**: listar `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `_TEMPLATE_ID`, `_PUBLIC_KEY`, `NEXT_PUBLIC_BASE_PATH`.
- **CA**: clonar el repo y poder levantarlo siguiendo solo README.
- **ADR**: no.

## #26 — Tests E2E con Playwright

- **Archivos**: `playwright.config.ts`, `tests/e2e/*.spec.ts`, `package.json` scripts, workflow CI.
- **Pasos**: scaffolding Playwright; 3 specs: home loads, language toggle, certificate modal; añadir job de CI en `.github/workflows/`.
- **CA**: tests verdes en CI; tiempo total < 2 min.
- **ADR**: **sí** — `adr/0006-testing-strategy.md`.

## #27 — GitHub API en build (repos pinned)

- **Archivos**: nuevo `tools/fetch-github-pinned.mjs`; integrar en `npm run build`; diccionarios opcionalmente.
- **Pasos**: script que pega a `https://api.github.com/users/AlonsoVine/repos` filtrando topics; genera JSON estático en `src/data/github-snapshot.json` que se commitea o se genera en CI.
- **CA**: build offline funciona con snapshot previo; CI actualiza snapshot semanalmente.
- **ADR**: sí — política de cache y refresh (`adr/0007-github-data-snapshot.md`).

## #28 — Easter egg en consola

- **Archivos**: `src/app/layout.tsx` (script inline) o nuevo `src/components/ui/ConsoleSignature.tsx`.
- **Pasos**: `console.log` con ASCII art + link al repo + mensaje "¿curioso?"; ejecutado client-side post-mount.
- **CA**: aparece en F12 sin spammear; no rompe SSR.
- **ADR**: no.

## #29 — Analítica privacy-friendly

- **Archivos**: script de Plausible/Umami en `layout.tsx`; nuevo runbook.
- **Pasos**: registrar cuenta; añadir script `<Script src="https://plausible.io/js/script.js" data-domain="...">`; documentar en `docs/runbooks/analytics.md`.
- **CA**: dashboard recibe pageviews; sin cookies; sin warning de Lighthouse.
- **ADR**: sí — `adr/0008-analytics.md` (privacidad).

## #30 — Chatbot con tu CV

- **Archivos**: nueva ruta API… **ojo: export estático no permite API routes**. Requiere:
  - Migrar a Vercel (cambio de despliegue), o
  - Microservicio externo (Cloudflare Workers) y consumir desde cliente.
- **Pasos**: ADR de arquitectura; backend mínimo con Claude API + rate limit por IP + system prompt con CV; UI flotante; analytics de uso.
- **CA**: latencia P95 < 3s; rate limit funciona; sin filtración de claves al cliente.
- **ADR**: **sí, doble** — `adr/0009-backend-para-chatbot.md` + `adr/0010-uso-claude-api.md`.

## #31 — Modo terminal alternativo

- **Archivos**: nuevo `src/app/terminal/page.tsx` + `src/components/terminal/*`.
- **Pasos**: parser de comandos mínimo (`ls`, `cat`, `cd`, `whoami`, `open <proyecto>`); historial; theme retro; toggle desde header.
- **CA**: navegable solo con teclado; cubre las mismas secciones que la vista visual; sin perder accesibilidad (alternativa anunciada).
- **ADR**: sí — `adr/0011-modo-terminal.md`.

## #32 — Cursor personalizado / micro-interacciones

- **Archivos**: nuevo `src/components/ui/CursorEffects.tsx`; CSS en `globals.css`.
- **Pasos**: cursor sigue ratón con `useMotionValue`; cambia en hover sobre interactivos; **desactivar en touch devices**.
- **CA**: no afecta clicks; off en `pointer: coarse`; respeta `prefers-reduced-motion`.
- **ADR**: no.

## #33 — OG image dinámica por sección

- **Archivos**: `src/app/opengraph-image.tsx` (+ por ruta si #19 #20 activan).
- **Pasos**: usar `ImageResponse` de Next; estilo coherente con la marca.
- **CA**: preview en Twitter/LinkedIn validators; peso < 200 KB.
- **ADR**: no.

## #34 — PWA (manifest + service worker)

- **Archivos**: `public/manifest.json`, `public/sw.js` o `next-pwa`; meta tags en `layout.tsx`.
- **Pasos**: manifest con iconos (192/512); SW cachea shell estático; offline fallback con tu cara y un mensaje.
- **CA**: Lighthouse PWA pasa; "Add to Home Screen" funciona; offline carga shell.
- **ADR**: sí — `adr/0012-pwa.md` (afecta caché).

## #35 — LICENSE + README badges

- **Archivos**: `LICENSE` (MIT), `README.md`.
- **Pasos**: copiar MIT con tu nombre + año; añadir badges (build, license, deploy status, Lighthouse score).
- **CA**: archivo `LICENSE` válido; badges renderizan en GitHub.
- **ADR**: no.

---

## Cómo usar este playbook

1. Eliges una mejora.
2. Creas `docs/features/NN-<slug>.md` desde `_TEMPLATE.md` copiando aquí la sección.
3. Sigues el [workflow](./workflow.md): Spec → Plan → Implement → Verify → PR.
4. Marcas el outcome en la spec y, si abriste ADRs, los enlazas.

## Convención de numeración

- Specs y ADRs usan numeración independiente (`features/NN-...` y `adr/NNNN-...`).
- El número aquí (#1, #2, …) **es solo el orden del backlog en MEJORAS.md**, no el ID de la spec.
