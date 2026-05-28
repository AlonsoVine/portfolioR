# Feature 01 — SEO baseline

- **Estado**: Done
- **Owner humano**: Alonso Viñé
- **Fecha creación**: 2026-05-28
- **Esfuerzo estimado**: 1 h
- **Impacto**: ⭐⭐⭐⭐⭐
- **Dificultad**: 🟢

## 1. Problema

El portfolio se está usando como activo profesional pero el SEO es mínimo: `description` placeholder ("Mi portfolio profesional."), sin sitemap, sin robots, sin datos estructurados. Resultado: el sitio no aparece bien indexado en Google y las previews al compartir el link en LinkedIn/Slack son pobres.

## 2. Objetivo y métrica de éxito

- Antes: meta description placeholder, sin sitemap/robots/JSON-LD.
- Después: cumplimiento del [ADR-0005 — Estándar SEO mínimo](../adr/0005-estandar-seo-minimo.md) en los apartados A, B, C, D base y H.
- Cómo lo verifico:
  - `view-source` muestra metadata completa + JSON-LD.
  - [Google Rich Results Test](https://search.google.com/test/rich-results) pasa sin errores.
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) muestra preview con título, descripción e imagen correctas.
  - Lighthouse móvil: SEO ≥ 95.
  - `/portfolioR/sitemap.xml` y `/portfolioR/robots.txt` accesibles tras build.

## 3. Alcance

### Dentro
- Metadata completa en `layout.tsx` (title template, description, keywords, authors, robots, alternates, openGraph, twitter).
- JSON-LD `Person` (schema.org) inline en `<head>`.
- `app/sitemap.ts` (página raíz).
- `app/robots.ts` (permite todo, apunta al sitemap).

### Fuera (explícito)
- E (a11y semántica completa) — gaps a cerrar en otra feature.
- G (optimización de imágenes a WebP/AVIF) — feature aparte (MEJORAS.md #11).
- OG image dinámica por ruta — futuro (MEJORAS.md #33).
- hreflang multi-idioma — no aplica hasta separar rutas por locale.

## 4. Criterios de aceptación

- [x] Title template definido (`%s | Alonso Viñé`).
- [x] Description final aprobada en sesión: "Alonso Viñé Barrancos · Full Stack Developer en Madrid. 5+ años construyendo software para Defensa, FCC, Inetum y Seres. Especialización en IA y agentes." (155 chars, dentro del límite de Google).
- [x] `keywords`, `authors`, `creator`, `robots` presentes.
- [x] `openGraph` y `twitter` con misma descripción y la OG image en `/portfolioR/assets/og-portfolio.png`.
- [x] JSON-LD `Person` con `name`, `url`, `image`, `jobTitle`, `worksFor`, `address`, `sameAs` (LinkedIn + GitHub), `knowsAbout`.
- [x] `app/sitemap.ts` y `app/robots.ts` exportan `MetadataRoute.Sitemap` y `MetadataRoute.Robots`.
- [ ] Verificación post-deploy con Rich Results Test y LinkedIn Post Inspector (manual).
- [ ] Lighthouse móvil SEO ≥ 95 (manual).

## 5. Riesgos y open questions

- ⚠️ `output: "export"` + `basePath` → revisar que `sitemap.xml` y `robots.txt` se sirvan en `/portfolioR/...` y no en raíz. Next 16 maneja esto automáticamente al construir; verificar tras deploy.
- ❓ ¿Cambiará el `worksFor` cuando salgas de Seres? Sí — entonces se actualiza manualmente en `layout.tsx`. Aceptable mientras no haya muchos cambios de empleo.

## 6. Plan de implementación

### Archivos afectados
- `src/app/layout.tsx` — ampliar `metadata`, añadir `<script type="application/ld+json">`.
- `src/app/sitemap.ts` — nuevo.
- `src/app/robots.ts` — nuevo.

### Orden de cambios
1. Crear `sitemap.ts` y `robots.ts`.
2. Reescribir `metadata` en `layout.tsx`.
3. Inyectar JSON-LD Person en `<head>`.
4. Typecheck + lint.

### Decisiones técnicas
- Usa `MetadataRoute` types de Next para sitemap/robots — soportados con `output: "export"`.
- `metadataBase: new URL("https://alonsovine.github.io")` y URLs relativas (`/portfolioR/`) → Next resuelve absolutas al servir.
- JSON-LD inline (no un componente cliente) para que esté presente en el HTML estático servido al bot de Google.

### Verificación
- `npx tsc --noEmit` limpio.
- `npm run build` exitoso.
- Tras deploy: `view-source` de la home muestra metadata + JSON-LD; sitemap/robots accesibles.

## 7. Decisiones tomadas durante implementación

- `jobTitle` en JSON-LD = "Full Stack Developer" (más amplio y buscado) en vez del título actual de Seres ("DevOps Engineer · CI/CD"). Razón: SEO; lo específico va en `Experience`.
- `worksFor` = Seres (estado actual). Aceptamos la mini-deuda de actualizarlo manualmente al cambiar.
- Description redactada en español (lang de la página). Si se migrara a rutas por idioma se añadirá hreflang.

## 8. Outcome

(A rellenar tras verificación post-deploy con Rich Results Test, LinkedIn Inspector y Lighthouse.)
