# Workflow agent-driven

Inspirado en *Spec-Driven Development* (Anthropic, 2025–2026), *Plan-Then-Code* y el ciclo OODA aplicado a copilotos. El objetivo es **maximizar control humano sobre las decisiones** y **delegar al agente la ejecución mecánica**.

## Las 5 fases

```
┌────────┐    ┌──────┐    ┌───────────┐    ┌────────┐    ┌────┐
│  SPEC  │───▶│ PLAN │───▶│ IMPLEMENT │───▶│ VERIFY │───▶│ PR │
└────────┘    └──────┘    └───────────┘    └────────┘    └────┘
   ▲                                                        │
   └────────────────── feedback loop ───────────────────────┘
```

### 1. SPEC (humano, asistido por agente)

**Output**: un archivo en `docs/features/NN-slug.md` usando `_TEMPLATE.md`.

Responde: *¿qué problema resolvemos, para quién, con qué éxito medible, y qué queda fuera?*

Reglas:
- 1 feature = 1 spec. Si crece, divídela.
- Incluye criterios de aceptación verificables (Gherkin opcional).
- Lista riesgos y open questions; el agente los marcará antes de implementar.

### 2. PLAN (agente, validado por humano)

El agente lee la spec y produce un **plan de implementación** dentro del mismo archivo (sección `## Plan`). Incluye:

- Archivos a tocar (rutas exactas).
- Orden de cambios.
- Decisiones técnicas (¿requiere ADR?).
- Riesgos identificados.
- Cómo se verificará.

**El humano aprueba el plan antes de tocar código.** En Claude Code: usar `EnterPlanMode`.

### 3. IMPLEMENT (agente)

- Commits pequeños, atómicos, en Conventional Commits.
- Nada fuera del plan sin volver a Plan.
- Si aparece una decisión no prevista → pausa, anota en `## Decisions during implementation` y pide validación.

### 4. VERIFY (agente + humano)

- `npm run lint` y `npm run build` limpios.
- Checklist de la [Definition of Done](./definition-of-done.md) marcada.
- Si es UI: capturas en dark/light, móvil/desktop, es/en.
- Si es contenido i18n: paridad en ambos diccionarios.
- Si toca arquitectura: ADR creado y enlazado.

### 5. PR (humano)

- Título: `<tipo>(<scope>): <resumen>` (Conventional Commits).
- Cuerpo: plantilla `.github/PULL_REQUEST_TEMPLATE.md`.
- Enlaza la spec (`docs/features/NN-slug.md`) y los ADRs creados.

## Cuándo abrir un ADR

Abre un ADR (`docs/adr/NNNN-titulo.md` siguiendo `_TEMPLATE.md`) cuando la decisión cumpla **alguna** de:

- Cambia el stack (librería >20 KB gzipped, nuevo framework).
- Modifica el modelo de despliegue.
- Introduce un patrón nuevo replicable (state management, fetching, theming).
- Tiene alternativas no triviales que merecen quedar registradas para tu yo-futuro.

## Cuándo NO abrir un ADR

- Bugfixes.
- Refactors locales.
- Cambios de contenido / textos / imágenes.
- Ajustes visuales puntuales.

## Roles agente vs. humano

| Tarea                         | Quien manda      |
|-------------------------------|------------------|
| Definir problema y éxito       | Humano           |
| Diseñar plan técnico           | Agente, valida humano |
| Escribir código rutinario      | Agente           |
| Decisión arquitectónica        | Humano           |
| Verificación final UX          | Humano           |
| Linting / build / formatting   | Agente           |
| Redacción de ADR y spec        | Agente, edita humano |
| Aprobar merge                  | Humano           |

## Anti-patrones que evitamos

- "Vibe coding" sin spec ni plan.
- Agente generando archivos `.md` de resumen no pedidos.
- Comentarios obvios en código (`// incrementa i`).
- Refactors oportunistas dentro de un PR de feature.
- Decisiones de arquitectura encubiertas en un PR de bugfix.
