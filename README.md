# PortfolioR

Soy Alonso Viñé Barrancos y este es mi portfolio en Next.js 16 (App Router) y React 19, exportado como sitio estático a GitHub Pages. Tiene estética de expediente técnico y se comporta como un repositorio que se compila delante del visitante: arranque tipo `npm run build`, retrato que se compila en ASCII, cabeceras como commits, `git grep` sobre el stack y una terminal con el CV. Las decisiones de diseño están en `DECISIONES.md` y las rondas de revisión en `REVISIONES.md`.

## Que es este proyecto
- Landing multiseccion, responsive y con anclado de navegacion.
- Contenido en `src/i18n/locales/{es,en}.ts` (fuente de verdad) con tipos y datos base en `src/data/portfolio.ts`.
- Movimiento con CSS y `framer-motion` (ver `docs/adr/0006-movimiento-y-reduced-motion.md`), estilos con Tailwind CSS 4 y variables de tema en `src/app/globals.css`.
- Assets agrupados en `src/assets/` y `public/` (certificados, logos de empresas, fotos del hero y proyectos).

## Ejecucion local
Requisitos: Node 22 o superior y npm.
```
npm ci
npm run dev
```
La app queda en `http://localhost:3000`. Si necesitas un base path (ej. para probar Pages), exporta `BASE_PATH` antes de construir.

## Build y export
- `npm run build`: genera el artefacto estatico en `out/` (config `output: "export"` con `basePath` y `assetPrefix` ya definidos en `next.config.ts`).
- `npm run start`: sirve el build (no usa `out/`, sino el bundle de Next).
- `npm run export`: opcion directa de `next export` si la necesitas.
- `npm run lint`: analisis estatico con ESLint 9 y TypeScript 5.

## Despliegue automatico (Cloudflare Workers)
El sitio se sirve en https://alonsovine.com. El workflow `.github/workflows/deploy.yml`:
1) Se dispara manualmente (`workflow_dispatch`) o con commits cuyo mensaje empiece por `deploy:` sobre `main`.
2) Usa Node 22, `npm ci` y `npm run build` sin subpath.
3) Publica `out/` en Cloudflare Workers con `wrangler deploy` (config en `wrangler.jsonc`).
4) Deja `alonsovine.github.io/portfolioR` redirigiendo al dominio.

Para reconstruir con subpath (por ejemplo, volver a GitHub Pages), exporta `BASE_PATH=/portfolioR` antes de `npm run build`. Detalle en `docs/adr/0007-dominio-propio-cloudflare-workers.md`.

## Estructura que mas toco
```
src/
  app/            # layout, globals y page.tsx
  components/     # layout (Header/Footer), sections (Hero, About, Experience, Projects, Skills, Education, Terminal, Contact),
                  # shared (BootSequence, AsciiPortrait, SectionHeading…) y ui (PrensaRecord, LibertyChart, RenamerShowcase…)
  data/           # portfolio.ts (tipos y datos base) y liberty.ts (serie de ejemplo de la tarjeta de Liberty)
  i18n/           # diccionarios y hook de idioma
  lib/            # utilidades (animaciones, helpers)
  assets/         # imagenes y certificados consumidos por el export
docs/             # ADRs, convenciones, workflow y archivo de rediseños anteriores
public/           # recursos estaticos adicionales
```

## Detalles tecnicos y UX
- Stack: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, framer-motion, lucide-react, clsx.
- Estilo: papel y tinta con un único acento verde; los escaparates de Prensa y Liberty conservan su color de marca. `npm run check:design` vigila la paleta.
- i18n: diccionarios en `src/i18n/locales` consumidos vía `useLanguage`.
- Proyectos: Prensa, Liberty y PhotoDateRenamer tienen escenografía propia; el resto, galería con selector `git checkout`.
- Accesibilidad: todo respeta `prefers-reduced-motion`; la intro se salta con cualquier tecla.

## Como edito contenido rapido
- Texto visible: `src/i18n/locales/*.ts`. Links, stacks y proyectos: `src/data/portfolio.ts`.
- Idiomas: `src/i18n/locales/*.ts`.
- Imagenes (hero, proyectos, experiencia, certificados): `src/assets/` y `public/`.

## Buenas practicas que sigo aqui
- Mantengo `DECISIONES.md` y `REVISIONES.md` por rediseño; los anteriores se archivan en `docs/<rama>/`.
- Reutilizo animaciones via `scrollRevealConfig` y estilos via utilidades y clases de Tailwind.
- Evito rutas absolutas cuando despliego en Pages, siempre con `NEXT_PUBLIC_BASE_PATH` y `assetPrefix`.

## Proximos pasos personales
- Ajustar SEO y metadatos en `src/app/layout.tsx`.
- Añadir metricas opcionales y mejorar accesibilidad en hovers/animaciones.
- Actualizar certificados e imagenes conforme publique nuevos logros o proyectos.
