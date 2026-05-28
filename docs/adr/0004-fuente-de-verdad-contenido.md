# ADR-0004: Fuente de verdad del contenido — diccionarios i18n

- **Estado**: Accepted
- **Fecha**: 2026-05-28
- **Tags**: contenido, i18n, refactor

## Contexto

Hoy el contenido vive parcialmente duplicado en dos sitios:

1. `src/data/portfolio.ts` — exports como `heroContent`, `projects`, `experiences`, `education`.
2. `src/i18n/locales/{es,en}.ts` — los mismos textos traducidos.

Solo unos pocos componentes usan `portfolio.ts` como fallback (`About.tsx:24`: `dict.about.highlights ?? aboutContent.highlights`). El resto consume el diccionario directamente. Esto invita a edits inconsistentes (cambias un texto en español y olvidas hacerlo en EN o en `portfolio.ts`).

## Opciones

### A — Mantener ambos (actual)
- Pros: ya está así.
- Contras: ambigüedad, riesgo de inconsistencias, agente no sabe dónde mirar primero.

### B — `portfolio.ts` solo como **types**, datos solo en diccionarios
- Pros: una sola fuente de verdad del contenido, tipado preservado.
- Contras: si añadimos un 3er idioma, dato repetido por idioma (igual que hoy en i18n).

### C — `portfolio.ts` como datos estructurales (orden, IDs, imágenes), diccionarios solo para strings
- Pros: separa "estructura" de "texto traducible".
- Contras: hay que orquestar el join en cada componente; más complejo.

## Decisión

**Opción B**: dejamos `src/data/portfolio.ts` solo con `types` y constantes verdaderamente compartidas (e.g., `navLinks` si los hrefs no se traducen). Todo el contenido visible vive en `src/i18n/locales/{es,en}.ts`.

## Consecuencias

### Positivas
- Regla clara para agentes: "contenido → diccionario".
- Menos riesgo de drift.

### Negativas
- Requiere refactor (ver MEJORAS.md #24). Hasta que se ejecute, este ADR documenta la dirección.

## Plan de migración

1. Auditar qué componente usa qué export de `portfolio.ts`.
2. Mover los datos restantes a los diccionarios (con paridad ES/EN).
3. Borrar las constantes de datos en `portfolio.ts`, dejar solo tipos.
4. Verificar build y UI.
