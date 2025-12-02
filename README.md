# PortfolioR

Soy Alonso Vine Barrancos y este es mi portfolio en Next.js 16 (App Router) y React 19. Muestro mi experiencia, proyectos, certificaciones y un poco de mi estilo visual (hero, timelines, hover states) con animaciones suaves y soporte para despliegue estatico en GitHub Pages.

## Que es este proyecto
- Landing multiseccion, responsive y con anclado de navegacion.
- Contenido dinamico centralizado en `src/data/portfolio.ts` para editar textos, skills, experiencias, proyectos y certificaciones sin tocar componentes.
- Animaciones con `framer-motion`, iconos con `lucide-react` y estilos con Tailwind CSS 4 mas variables en `src/app/globals.css`.
- Assets agrupados en `src/assets/` y `public/` (certificados, logos de empresas, fotos del hero y proyectos).

## Ejecucion local
Requisitos: Node 20.9.x y npm.
```
npm ci
npm run dev
```
La app queda en `http://localhost:3000`. Si necesitas un base path (ej. para probar Pages), exporta `NEXT_PUBLIC_BASE_PATH` antes de levantar.

## Build y export
- `npm run build`: genera el artefacto estatico en `out/` (config `output: "export"` con `basePath` y `assetPrefix` ya definidos en `next.config.ts`).
- `npm run start`: sirve el build (no usa `out/`, sino el bundle de Next).
- `npm run export`: opcion directa de `next export` si la necesitas.
- `npm run lint`: analisis estatico con ESLint 9 y TypeScript 5.

## Despliegue automatico (GitHub Pages)
He configurado un workflow en `.github/workflows/deploy.yml` que:
1) Se dispara manualmente (`workflow_dispatch`) o con commits cuyo mensaje empiece por `deploy:` sobre `main`.
2) Usa Node 20.9, `npm ci`, `npm run build` y sube `out/` como artefacto.
3) Despliega a GitHub Pages con un `.nojekyll` para servir los archivos exportados.
4) Inyecta `NEXT_PUBLIC_BASE_PATH` y `BASE_PATH` con `/portfolioR` para que las rutas de imagenes funcionen bajo el subpath del repo.

Si cambias el nombre del repo o el subpath, alinea `NEXT_PUBLIC_BASE_PATH`, `BASE_PATH` y `basePath`/`assetPrefix` en `next.config.ts`.

## Estructura que mas toco
```
src/
  app/            # layout, globals y page.tsx
  components/     # layout (Header/Footer) y secciones (Hero, About, Skills, Projects, Experience, Education, Contact)
  data/           # portfolio.ts con todo el contenido editable
  i18n/           # diccionarios y hook de idioma
  lib/            # utilidades (animaciones, helpers)
  assets/         # imagenes y certificados consumidos por el export
docs/ai/          # prompt de comportamiento y bitacoras
public/           # recursos estaticos adicionales
```

## Detalles tecnicos y UX
- Stack: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, framer-motion, lucide-react, clsx.
- Estilo: variables de tema y tonos diferenciados para modo claro/oscuro; hovers con gradientes y blur suave.
- i18n: diccionarios en `src/i18n/locales` consumidos via `useLanguage`.
- Timeline y projects: chips de tecnologias, badges de destacado y modales para certificados.
- Hero: avatar circular con flip 3D y CTA de descarga de CV.

## Como edito contenido rapido
- Texto, links, stacks: `src/data/portfolio.ts`.
- Idiomas: `src/i18n/locales/*.ts`.
- Imagenes (hero, proyectos, experiencia, certificados): `src/assets/` y `public/`.

## Buenas practicas que sigo aqui
- Mantengo `docs/ai/context.md` como bitacora y `docs/ai/changelog.md` para cambios de comportamiento.
- Reutilizo animaciones via `scrollRevealConfig` y estilos via utilidades y clases de Tailwind.
- Evito rutas absolutas cuando despliego en Pages, siempre con `NEXT_PUBLIC_BASE_PATH` y `assetPrefix`.

## Proximos pasos personales
- Ajustar SEO y metadatos en `src/app/layout.tsx`.
- Añadir metricas opcionales y mejorar accesibilidad en hovers/animaciones.
- Actualizar certificados e imagenes conforme publique nuevos logros o proyectos.
