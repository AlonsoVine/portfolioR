# ADR-0002: Tailwind CSS 4 + tokens de tema en CSS variables

- **Estado**: Accepted
- **Fecha**: 2026-05-28 (retroactivo)
- **Tags**: estilo, theming

## Contexto y problema

Queremos soportar modo dark y light con paleta diferenciada, mantener consistencia visual entre secciones y evitar repetición de colores hardcodeados.

## Opciones consideradas

### A — Tailwind 4 + CSS vars en `globals.css` (modo `data-theme`)
- Pros: máximo control, sin runtime JS para theming, theme switch instantáneo.
- Contras: requiere disciplina de no hardcodear colores.

### B — Tailwind con `dark:` variant + clases
- Pros: idiomático de Tailwind.
- Contras: duplicas cada color en `dark:`; menos limpio para 3 modos en el futuro.

### C — CSS-in-JS (Stitches, vanilla-extract)
- Pros: tipado fuerte de tokens.
- Contras: overhead, peor con RSC, fuera del flow Next 16.

## Decisión

**Tailwind 4 + CSS vars en `globals.css`** activadas vía `[data-theme="light"]` aplicado por script anti-flash en `<head>`.

## Consecuencias

### Positivas
- Cambio de tema sin re-render.
- Anti-flash script previene FOUC (`layout.tsx:50-63`).
- Añadir un nuevo tema = añadir un bloque `[data-theme="..."]`.

### Negativas
- No hay tipado de los tokens. Mitigamos con regla: "colores **siempre** vía var, no hex directo" (ver `docs/conventions.md`).
- IntelliSense en CSS vars es limitada.

### Implicaciones futuras
- Si crece la paleta, considerar generar las vars desde un JSON único con un script.
