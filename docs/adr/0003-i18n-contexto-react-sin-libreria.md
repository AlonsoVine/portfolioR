# ADR-0003: i18n con React Context (sin librería externa)

- **Estado**: Accepted
- **Fecha**: 2026-05-28 (retroactivo)
- **Tags**: i18n, dependencias

## Contexto

Necesitamos soporte de español e inglés. Es un sitio pequeño (≈7 secciones, ≈200 strings).

## Opciones

### A — Provider React + objetos `es.ts`/`en.ts` (actual)
- Pros: cero dependencias, control total, type-safe vía `typeof es`, simple.
- Contras: si crece a 5+ idiomas o requiere pluralización/ICU, se queda corto.

### B — `next-intl`
- Pros: estándar Next 13+, ICU messages, namespaces, SSR-aware.
- Contras: ~30 KB extra; routing por locale complica el export.

### C — `react-i18next`
- Pros: maduro, plugins.
- Contras: bundle grande, API verbosa.

## Decisión

**Provider propio en `src/i18n/index.tsx`** con diccionarios tipados.

## Consecuencias

### Positivas
- Bundle mínimo.
- Tipado fuerte: añadir clave en un diccionario y olvidarte en otro **da error de TS**.
- Sin acoplamiento al routing.

### Negativas
- Si añadimos un 3er idioma o necesitamos formateo ICU, migrar.
- No SEO por locale (un solo HTML servido; el contenido cambia client-side). Aceptable porque ES es el idioma por defecto y es el que se indexa.

### Implicaciones futuras
- Si #19 (Blog) llega, reevaluar `next-intl` para rutas `/es/blog/...` y `/en/blog/...`.
