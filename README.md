# PortfolioR

Portfolio profesional construido con Next.js 16 (App Router) y React 19 para presentar experiencia, proyectos y certificaciones de Alonso Vine Barrancos.

## Descripcion general
- Landing page multiseccion con navegacion anclada y diseno responsivo.
- Contenido dinamico gestionado desde `src/data/portfolio.ts`, lo que permite ajustar textos, skills, experiencias y proyectos sin tocar componentes.
- Animaciones con `framer-motion`, iconografia `lucide-react` y estilos gestionados por Tailwind CSS 4 junto con variables en `src/app/globals.css`.
- Activos graficos organizados en `src/assets/` (certificados, imagenes de experiencia y proyectos) para soporte visual inmediato.

## Caracteristicas principales
- **Hero**: CTA doble y mensaje principal para reclutadores.
- **Sobre mi y Skills**: Bloques resumidos de historia profesional y cuadricula categorizada de habilidades.
- **Timeline de experiencia y educacion**: datos cronologicos con bullets accionables.
- **Proyectos destacados**: tarjetas con stack, demo y codigo.
- **Contacto**: enlaces directos a redes y correo.

## Stack y dependencias
- Framework: Next.js 16, React 19.
- Estilos: Tailwind CSS 4, CSS variables.
- Animaciones/UX: framer-motion, lucide-react, clsx.
- Tipado y linting: TypeScript 5, ESLint 9 con configuracion Next.

## Scripts
- `npm run dev`: servidor de desarrollo en `http://localhost:3000`.
- `npm run build`: build de produccion.
- `npm run start`: servidor en modo produccion.
- `npm run lint`: analisis estatico.

## Estructura relevante
```
src/
  app/            # layout, globals y page.tsx
  components/     # layout y secciones reutilizables
  data/           # portfolio.ts con contenido editable
  lib/            # utilidades compartidas
  assets/         # imagenes y certificados
docs/ai/          # lineamientos y bitacoras para la IA
public/           # recursos estaticos adicionales
```

## Flujo de trabajo recomendado
1. Ajustar el contenido en `src/data/portfolio.ts`.
2. Validar recursos en `src/assets/`.
3. Ejecutar `npm run dev`, reiniciando servidores previos como indica `docs/ai/PROMPT_ComportamientoAI.md`.
4. Anadir notas en `docs/ai/context.md` y registrar cambios funcionales en `docs/ai/changelog.md`.
5. Desplegar (Vercel u opcion propia) tras pasar build y lint.

## Proximos pasos sugeridos
- Personalizar SEO desde `src/app/layout.tsx`.
- Anadir metricas o tracking opcional antes de produccion.
- Mantener certificados e imagenes sincronizados con logros mas recientes.
