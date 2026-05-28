# ADR-0005: Estándar SEO mínimo para todo contenido publicado

- **Estado**: Accepted
- **Fecha**: 2026-05-28
- **Tags**: seo, contenido, calidad

## Contexto y problema

El portfolio es un activo profesional: su utilidad depende de que aparezca cuando alguien busca al autor (búsquedas con su nombre, "alonso viñé developer madrid", "alonso viñé angular", etc.) y de que se vea bien al compartirlo en LinkedIn, Twitter, WhatsApp y Slack.

Hoy el SEO es mínimo: `description` placeholder, sin sitemap, sin robots, sin JSON-LD, OG image única. Cada vez que se añade una sección o ruta nueva, el riesgo es **repetir el mismo descuido**: olvidar `alt`, olvidar metadata por ruta, olvidar añadir al sitemap.

Sin un estándar explícito, el SEO se convierte en una tarea "que se hará algún día". Con un estándar:
- Cada nueva feature lo cumple por defecto.
- La revisión es objetiva (checklist) y no opinable.
- Los agentes lo aplican sin preguntar.

## Drivers

- Indexación correcta en buscadores (Google, DuckDuckGo, Bing).
- Previews ricas al compartir (Open Graph + Twitter Cards).
- Datos estructurados para rich results (schema.org).
- Bajo coste de mantenimiento: el estándar debe poder cumplirse sin tooling complejo.
- Compatibilidad con `output: "export"` (ADR-0001) — nada de SSR-only.

## Opciones consideradas

### A — SEO ad-hoc, sin estándar (status quo)
- Pros: cero overhead.
- Contras: deuda silenciosa; cada release reabre debate; agentes inconsistentes.

### B — Estándar mínimo obligatorio + checklist en DoD
- Pros: simple, auditable, no requiere herramientas; cualquier agente puede aplicar.
- Contras: requiere disciplina (mitigado por checklist en DoD y por este ADR).

### C — Auditoría SEO automatizada en CI (Lighthouse CI, unlighthouse)
- Pros: garantía técnica.
- Contras: setup, mantenimiento, falsos positivos; aún así no sustituye al estándar, lo complementa.

## Decisión

**Opción B**: definimos un estándar SEO mínimo obligatorio. Se documenta aquí, se enlaza desde `docs/definition-of-done.md`, y **todo PR que añada o modifique contenido / rutas / assets visibles debe cumplirlo**. La auditoría automatizada (C) queda como mejora futura no bloqueante.

## El estándar — qué es obligatorio

### A. Metadata por ruta (`Metadata` de Next.js)

Toda página (`src/app/**/page.tsx`) **debe** exportar `metadata` con, como mínimo:

- `title` — usando template global definido en `layout.tsx` (`%s | Alonso Viñé`).
- `description` — 120–160 caracteres, descriptiva, sin clichés vacíos.
- `alternates.canonical` — ruta canónica (con `basePath`).
- `openGraph` con `title`, `description`, `url`, `siteName`, `type`, `locale`, e `images` (≥1).
- `twitter` con `card: "summary_large_image"`, `title`, `description`, `images`.

El layout raíz define `metadataBase`, defaults de OG y JSON-LD `Person`.

### B. Datos estructurados (schema.org / JSON-LD)

- **Siempre** en `layout.tsx`: `Person` con `name`, `jobTitle`, `url`, `sameAs` (LinkedIn, GitHub).
- En página de **proyecto individual** (si se crea): `CreativeWork` o `SoftwareApplication`.
- En página de **artículo / nota** (si se crea blog #19): `BlogPosting` con `datePublished`, `author`.
- Validar con [Google Rich Results Test](https://search.google.com/test/rich-results) antes de merge.

### C. Sitemap y robots

- `src/app/sitemap.ts` enumera **todas** las rutas indexables y secciones ancladas relevantes.
- Cada vez que se añade una ruta nueva → actualizar `sitemap.ts` **en el mismo PR**.
- `src/app/robots.ts` permite indexación y apunta al sitemap.

### D. Open Graph image

- **Tamaño**: 1200×630 px, formato JPG/PNG/WebP, peso < 300 KB.
- Una imagen genérica del sitio (`/assets/og-portfolio.png`) + override por ruta cuando aporte valor.
- Texto legible a tamaño preview (no apostar a que se lea descripción debajo).

### E. Accesibilidad / semántica (impacta SEO)

- **Una sola `<h1>`** por página.
- Jerarquía `h2 → h3` correcta dentro de cada sección.
- Toda `<img>` / `<Image>` con `alt`:
  - Descriptivo si la imagen aporta contenido.
  - `alt=""` (vacío explícito) si es puramente decorativa.
- Links externos relevantes con `rel="noreferrer"` (ya en uso); internos como `<Link>` de Next cuando aplique.
- Texto de enlace descriptivo. **Nada de "click aquí" / "más info"**.

### F. URLs y rutas

- URLs en kebab-case, en minúsculas, en inglés salvo nombres propios.
- Sin parámetros de tracking en links internos.
- `trailingSlash: true` se mantiene (ya configurado por GitHub Pages).

### G. Performance que impacta SEO (Core Web Vitals)

- **LCP** del Hero < 2.5s en 3G simulado.
- Imagen del Hero con `priority` y `sizes` correctos (ya en uso).
- Imágenes ≥ 500 KB → optimizar a WebP/AVIF antes de subirlas.
- No introducir librerías client-side > 50 KB gzipped sin ADR.

### H. i18n y SEO

- Mientras tengamos un único HTML servido (ver ADR-0003), `lang="es"` en `<html>` y la descripción/metadata canónica en **español**.
- Si se introduce routing por idioma (#19 blog, o reevaluación de ADR-0003), añadir `<link rel="alternate" hreflang="...">` por idioma.

### I. Verificación obligatoria antes de merge

- [ ] `view-source` de la ruta muestra metadata completa y JSON-LD.
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) pasa sin errores.
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) muestra OG correcto.
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) (o equivalente) muestra preview correcto.
- [ ] Lighthouse en modo móvil: **SEO ≥ 95**, A11y ≥ 95.
- [ ] `sitemap.xml` y `robots.txt` accesibles en producción.

## Consecuencias

### Positivas

- Cualquier nueva ruta o sección entra ya con SEO sano.
- Checklist objetivo en PRs.
- Los agentes IA aplican el estándar sin necesidad de ser instruidos cada vez.

### Negativas / trade-offs

- Cada PR de contenido tiene una capa extra de verificación (≈ 5–10 min).
- Si introducimos blog (#19), el estándar crece — habrá que extender este ADR o crear ADR hijo.

### Implicaciones futuras

- Si #34 (PWA) se acepta, el manifest debe alinearse con OG/iconos.
- Si #19 (blog MDX) se acepta, cada nota debe cumplir D + JSON-LD `BlogPosting`.
- Si migramos de export estático a Vercel (ADR potencial), revisar `metadataBase` y posibles rutas dinámicas.

## Cumplimiento existente

Estado en el momento de aceptar este ADR:

- ❌ A (Metadata) — `description` placeholder.
- ❌ B (JSON-LD) — no existe.
- ❌ C (Sitemap / robots) — no existe.
- 🟡 D (OG image) — existe imagen genérica, no por ruta.
- 🟡 E (a11y) — parcial, varios `alt` mejorables y aria-labels faltantes.
- ✅ F (URLs).
- 🟡 G (Performance) — imágenes pesadas sin optimizar.
- 🟡 H (i18n) — `lang="es"` ok; sin hreflang (aceptable por ahora).

**La feature #1 del backlog (`MEJORAS.md`) cierra A, B, C, D base y H**. Las demás se irán cerrando en sus respectivas features.

## Referencias

- [Google Search Central — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [schema.org / Person](https://schema.org/Person)
- [Open Graph protocol](https://ogp.me/)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- ADR-0001 (export estático), ADR-0003 (i18n).
