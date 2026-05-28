# Runbook: añadir una sección nueva al portfolio

## 0. Antes de empezar
- Spec creada en `docs/features/NN-<slug>.md`.
- Plan aprobado por humano.

## 1. Datos y tipos
- Si necesita un tipo nuevo: añadir a `src/data/portfolio.ts`.
- Añadir entradas al diccionario en `src/i18n/locales/es.ts` **y** `en.ts`.

## 2. Componente
- Crear `src/components/sections/<Nombre>.tsx`.
- Marca `'use client'` solo si requiere estado/efectos.
- Envolver en `<SectionShell id="<id>">` y `<SectionHeading ...>`.
- Consumir contenido con `useLanguage()` + `dict.<seccion>`.

## 3. Animación
- Reutilizar `scrollRevealConfig` de `@/lib/utils`.
- Si añades transformaciones largas, gate con `prefers-reduced-motion`.

## 4. Estilos
- Tokens vía CSS vars (`var(--surface-card)`, `var(--pill-*-bg)`).
- Sin hex hardcodeados.

## 5. Integración
- Importar en `src/app/page.tsx` y colocar en el orden deseado.
- Añadir entrada en `nav.links` del diccionario para que aparezca en el header.

## 6. Assets
- A `src/assets/` o `public/images/`.
- Rutas con prefijo `withBasePath` / `NEXT_PUBLIC_BASE_PATH`.

## 7. Verificación
- DoD de `docs/definition-of-done.md`.

## 8. Cierre
- Actualizar `outcome` en la spec.
- Commit `feat(<seccion>): ...`.
