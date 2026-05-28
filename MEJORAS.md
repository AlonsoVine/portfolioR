# Análisis profesional y propuestas de mejora — Portfolio Alonso Viñé

> Documento generado tras un análisis profundo del proyecto. Stack detectado: **Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + framer-motion + lucide-react**, exportado estático (`output: "export"`) hacia GitHub Pages bajo el subpath `/portfolioR`.

---

## 0. Cómo levantar el proyecto

Requisitos: Node 20.9.x y npm.

```powershell
# Instalación limpia de dependencias (solo la primera vez o si cambia package-lock)
npm ci

# Levantar el entorno de desarrollo (http://localhost:3000)
npm run dev
```

Otros comandos útiles:

```powershell
npm run build    # Genera el export estático en /out
npm run lint     # ESLint 9 + reglas de Next
npm run start    # Sirve el build de Next (no el export estático)
```

> Nota: en desarrollo `basePath` está vacío (next.config.ts:3); en producción se inyecta `/portfolioR`. Si quieres probar el subpath localmente: `$env:NEXT_PUBLIC_BASE_PATH="/portfolioR"; npm run dev`.

---

## 1. Estado actual — fortalezas

Lo que ya está muy bien y conviene **conservar**:

- **Arquitectura limpia y desacoplada**: el contenido vive en `src/data/portfolio.ts` y `src/i18n/locales/*`, separado de los componentes. Esto facilita iterar sin tocar UI.
- **i18n correctamente implementado** con contexto React + `localStorage`, sin librerías pesadas.
- **Sistema de tema** dark/light vía variables CSS y script anti-flash en `<head>` (layout.tsx:50-63). Bien hecho.
- **Tipado fuerte** en `Project`, `Experience`, `SkillCard`, etc.
- **Animaciones contenidas** con `scrollRevealConfig` reutilizable.
- **Despliegue automatizado** a GitHub Pages con workflow.
- **Paleta visual coherente** con tokens `--pill-*` y gradiente acento.

---

## 2. Mejoras prioritarias (alto impacto)

### 2.1. SEO y metadatos — **CRÍTICO**

Tu `metadata` en `layout.tsx:16-48` está muy pobre:

- `description: "Mi portfolio profesional."` → te resta visibilidad en Google y al compartir.
- Falta `keywords`, `authors`, `creator`, `robots`.
- `metadataBase` apunta a `alonsovine.github.io` pero el OG `url` es relativo: revísalo.
- No hay `<link rel="icon">` explícito ni `manifest.json` para PWA.

**Acción**:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://alonsovine.github.io"),
  title: {
    default: "Alonso Viñé | Full Stack Developer (Angular · Java · React)",
    template: "%s | Alonso Viñé",
  },
  description:
    "Desarrollador Full Stack especializado en Angular, Java/Spring Boot y React. Experiencia en Defensa, FCC e Inetum. Certificado AWS, GitHub Foundations y Prompt Engineering.",
  keywords: ["Alonso Viñé", "Full Stack Developer", "Angular", "Spring Boot", "React", "Next.js", "Madrid", "Portfolio"],
  authors: [{ name: "Alonso Viñé", url: "https://www.linkedin.com/in/alonso-viñé-barrancos/" }],
  robots: { index: true, follow: true },
  // ... resto
};
```

Y añade un `JSON-LD` (Person schema) en el `<head>` — Google lo usa para rich snippets:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Alonso Viñé Barrancos",
      jobTitle: "Full Stack Developer",
      url: "https://alonsovine.github.io/portfolioR/",
      sameAs: [
        "https://github.com/AlonsoVine",
        "https://www.linkedin.com/in/alonso-viñé-barrancos/",
      ],
    }),
  }}
/>
```

Crea también `public/robots.txt` y `public/sitemap.xml` (o un `app/sitemap.ts`).

### 2.2. Hero — necesita un "gancho" más fuerte

El subtítulo actual ("Apasionado por la tecnología…") es genérico. **Los reclutadores escanean en 5 segundos**. Propuesta:

- Añade una **frase de impacto medible**: "+4 años construyendo software para Defensa, FCC e Inetum".
- Sustituye el `role` plano "Desarrollador y Analista" por algo más punzante: **"Full Stack Developer · Angular + Java + Cloud"**.
- Añade **chips de tech stack principal bajo el subtítulo** (ej.: Angular · Spring Boot · AWS · TypeScript). Da contexto instantáneo.
- Considera un **botón de "Contáctame"** junto a "Ver proyectos" y "Descargar CV". Tres CTAs es mejor que dos en este patrón.
- El avatar con flip 3D mola, pero podrías añadir un **disponibility badge** ("🟢 Open to work" / "🟡 Open to opportunities") encima del avatar.

### 2.3. Sección "Sobre mí" — falta dato concreto

Tus `textBlocks` actuales son tres frases motivacionales sin información. Cambia por:

- 1 párrafo con tu **historia profesional resumida** (qué hacías antes, qué haces ahora, hacia dónde vas).
- 1 párrafo con tu **propuesta de valor** (qué problema resuelves mejor que otros).
- 1 párrafo **personal** (hobbies, idiomas, ubicación, qué te motiva).

Métricas que puedes incluir como contador animado (con `framer-motion`): años de experiencia (+4), proyectos completados, certificaciones (10), tecnologías dominadas.

### 2.4. Proyectos — la sección que más mejora puede dar

Es la sección más importante de un portfolio dev y ahora mismo es la más floja. Mejoras:

- **Métricas o resultados por proyecto** ("Jardín Digital: 1k+ visitas, 5★ en GitHub", "PhotoDateRenamer: procesa 10k fotos en <2 min").
- **Stack visual más rico**: usa los logos oficiales de cada tech (con `simple-icons` o SVGs inline) en vez de solo chips de texto.
- **Filtro por tecnología** sobre la grid (botones: Todos · Angular · Python · React). Muy fácil de implementar con `useState`.
- **Más proyectos web/visibles**. Tienes 5 proyectos; 3 son scripts de Python (forYouToBe, PhotoDateRenamer, Jarvis). Añade 1–2 proyectos web con demo en vivo (el Jardín Digital es perfecto, replica el patrón).
- Implementa **modal de detalle** al click (como ya tienes en Education) con: capturas múltiples, descripción larga, retos técnicos, decisiones de arquitectura. Aquí te luces de verdad.
- **Vídeo o GIF en hover** mostrando el proyecto en acción (mucho más atractivo que una imagen estática).

### 2.5. Experiencia — añadir impacto cuantitativo

Tus bullets describen tareas, no logros. Reescríbelos siguiendo el patrón **"Verbo + qué hice + tecnología + impacto medible"**:

- ❌ "Desarrollé interfaces dinámicas con Angular, TypeScript, Bootstrap y RxJS conectadas a APIs REST."
- ✅ "Desarrollé 15+ pantallas Angular/RxJS que redujeron el tiempo de consulta de flota un X%, sustituyendo formularios legacy en JSP."

Incluso si los números son aproximados, el impacto comunicativo es 5×.

### 2.6. Accesibilidad (a11y) — pendiente

He visto varios puntos a revisar:

- `aria-label="Abrir menú"` no cambia cuando el menú está abierto (Header.tsx:74). Debería ser `Cerrar menú` cuando `open`.
- Los gradientes amber/rose sobre fondo blanco/claro en el modo light tienen contraste justo. Pasa el portfolio por Lighthouse y revisa el score de Accessibility.
- Botones decorativos como los social-icons del Hero no tienen `aria-label` (Hero.tsx:108-117). Añade `aria-label={social.label}`.
- El modal de certificados no atrapa el foco (focus trap). Considera `react-focus-lock` o implementarlo manualmente.
- Las animaciones `framer-motion` deberían respetar `prefers-reduced-motion`. Hoy no se respeta.

### 2.7. Performance y Core Web Vitals

- **Imágenes pesadas**: tienes PNGs grandes en `src/assets/`. Conviértelos a **WebP/AVIF** (puede bajar 60–80% el peso). Como usas `images: { unoptimized: true }` por el export, hazlo manualmente con `sharp` o `squoosh`.
- **Carga diferida de secciones**: usa `next/dynamic` para `ExperienceTimeline`, `ProjectsGrid` y `Education` con `ssr: false` y `loading: () => <Skeleton/>`. Solo el Hero necesita estar arriba.
- **`framer-motion`** es ~50KB gzipped. Si lo usas en pocos sitios, evalúa `motion/react` (versión modular) o sustituye por CSS animations donde sea viable.
- **Fonts**: ya usas `next/font/google`, perfecto. Verifica que en producción no haya FOUT.

---

## 3. Mejoras de UX / visual (impacto medio)

- **Indicador de sección activa** en la nav del header (resaltar el link de la sección visible con `IntersectionObserver`).
- **Scroll suave global**: añade `scroll-behavior: smooth` y `scroll-margin-top: 80px` a las secciones para que el anchor no quede pegado al header.
- **Progress bar de scroll** en la parte superior (5 líneas con `useScroll` de framer).
- **Cursor personalizado** o efectos en hover sobre los proyectos (sutil, no exagerar).
- **Easter egg** en el flip del avatar — ya tienes la base. Puedes mostrar una foto divertida o un mensaje al hacer hover sostenido.
- **Testimonios / recomendaciones de LinkedIn** en una nueva sección — confianza social potente.
- **Sección "Blog" o "Notas"** si te animas a escribir — diferencial enorme frente a otros portfolios.
- **Página /uses** estilo wesbos.com/uses listando tu setup (editor, plugins, hardware) — gusta mucho a la comunidad dev.

---

## 4. Mejoras técnicas / de calidad de código

### 4.1. Tipos y patrones

- En `Education.tsx:31` haces `useLanguage() as { dict: any; lang: ... }`. El `any` se podría evitar tipando bien `Locale` en `i18n/index.tsx`.
- En `About.tsx:34, 64-65` veo `(scrollRevealConfig as any)`. Tipa `scrollRevealConfig` como `MotionProps` para eliminar los `as any`.
- En `ExperienceTimeline.tsx:36` veo `(heading as any)?.techLabel`. Añade `techLabel` al tipo del diccionario y elimina el cast.

### 4.2. Duplicación

- La función `highlightTech` está duplicada en `ProjectsGrid.tsx` y `ExperienceTimeline.tsx`. Muévela a `src/lib/highlight.tsx`.
- `escapeRegExp` también está duplicada en ambos archivos. Muévela a `lib/utils.ts`.
- El `prefix = process.env.NEXT_PUBLIC_BASE_PATH || ""` aparece en 7 archivos. Exporta un helper `withBasePath(path)` desde `lib/utils.ts`.

### 4.3. Datos muertos

- `src/data/portfolio.ts` exporta `heroContent`, `aboutContent`, `projects`, `experiences`, `education`, `navLinks` que en realidad **solo se usan como fallback en About** (`dict.about.highlights ?? aboutContent.highlights`). El contenido real vive ya en los diccionarios `i18n`. Decide:
  - Opción A: dejarlo solo como **types** y borrar las constantes con datos.
  - Opción B: si quieres single source of truth, mover los textos comunes a `portfolio.ts` y que los diccionarios solo traduzcan.
  - Hoy es ambiguo: tienes la info duplicada y eso invita a errores.

### 4.4. Otros

- Crea un archivo `.env.example` con las variables EmailJS para que cualquiera que clone sepa qué configurar.
- Falta validación del formulario de contacto (longitud mínima, regex de email, sanitización del mensaje). EmailJS por sí solo no protege de spam: añade **hCaptcha** o **honeypot field**.
- El workflow de deploy se dispara si el commit empieza por `deploy:` — patrón curioso pero funciona; documenta que cualquier push normal **no** despliega.
- Añade un `LICENSE` (MIT) si el repo es público.
- Considera tests E2E con **Playwright** para 2–3 flujos críticos (cargar la home, cambiar idioma, abrir modal de certificado).

---

## 5. Ideas "wow" (opcionales, alto diferencial)

- **Easter egg de consola**: cuando alguien abre DevTools, mostrar un ASCII art con tu nombre y un mensaje "¿Buscas cómo está hecho? Te dejo el repo: …". Reclutadores técnicos lo aprecian.
- **Modo "terminal"** alternativo al modo visual: una vista estilo TUI donde se puede teclear `ls projects`, `cat about.md`, etc. Diferencial brutal para devs.
- **Integración con la API de GitHub** para mostrar tus repos pinned actualizados en tiempo real (commits recientes, lenguajes, stars). Como es export estático, hazlo en build time con un script o ISR via Server Action si migras de export.
- **Chatbot con tu CV**: integra una API de Claude/OpenAI con un system prompt que conozca tu CV. El visitante puede preguntar "¿Has trabajado con Kubernetes?" y obtiene respuesta. Hay que cuidar el coste; pon rate limit.
- **Métrica visible**: un contador "X visitas únicas este mes" usando Plausible o Umami (analítica privacy-friendly, gratuita en self-hosted).

---

## 6. Roadmap sugerido (orden por ROI)

| Prio | Tarea                                                      | Esfuerzo | Impacto |
|------|------------------------------------------------------------|----------|---------|
| 1    | Mejorar metadatos SEO + JSON-LD + sitemap + robots         | 1 h      | Alto    |
| 2    | Reescribir Hero (subtítulo + chips + 3er CTA)              | 1 h      | Alto    |
| 3    | Reescribir bullets de Experiencia con métricas             | 2 h      | Alto    |
| 4    | Ampliar Proyectos: 2 nuevos web + modal de detalle + filtros | 6-8 h  | Muy alto |
| 5    | Optimizar imágenes a WebP/AVIF                              | 1 h     | Alto    |
| 6    | A11y: aria-labels, focus trap modal, prefers-reduced-motion | 2 h     | Medio   |
| 7    | Indicador de sección activa en nav + scroll smooth         | 1 h      | Medio   |
| 8    | Refactor: extraer `highlightTech`, `withBasePath`, dejar de duplicar | 1 h | Bajo |
| 9    | Validación + anti-spam en form de contacto                 | 1 h      | Medio   |
| 10   | Sección Testimonios / Recomendaciones LinkedIn             | 2 h      | Medio   |
| 11   | Easter egg consola / chatbot CV / modo terminal            | 4-8 h    | Diferencial |

---

## 7. Checklist rápida antes de cada release

- [ ] Lighthouse en modo móvil: Performance ≥ 90, A11y ≥ 95, SEO = 100.
- [ ] `npm run build` sin warnings.
- [ ] Todas las imágenes con `alt` descriptivo (no decorativo).
- [ ] CV PDF actualizado en `src/assets/cv/`.
- [ ] Probar formulario de contacto end-to-end con EmailJS real.
- [ ] Probar en Chrome, Firefox, Safari (iOS) y modo light/dark.
- [ ] Validar que el subpath `/portfolioR` no rompe ningún asset.

---

**Resumen ejecutivo**: tu base técnica es sólida (Next 16, tipado, i18n, tema). El portfolio se siente moderno. Lo que falta para pasar de "buen portfolio dev" a "portfolio que destaca" es: **(1) contenido más concreto y medible** (Hero, About, Experiencia), **(2) la sección Proyectos enriquecida** con modal + filtros + más proyectos web, **(3) SEO en serio**, y **(4) un par de detalles wow** (testimonios, modo terminal o chatbot CV). Si solo haces los puntos 1–5 del roadmap ya tienes un salto cualitativo enorme.
