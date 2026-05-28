# ADR-0000: Uso de Architecture Decision Records (MADR)

- **Estado**: Accepted
- **Fecha**: 2026-05-28
- **Tags**: proceso, documentación

## Contexto y problema

El proyecto está siendo desarrollado en colaboración con agentes de IA. Sin un registro explícito de las decisiones de arquitectura, cada nueva sesión del agente parte de cero y puede revertir o contradecir decisiones tomadas previamente. Además, el autor humano necesita memoria fuera del código para futuras iteraciones.

## Drivers

- Continuidad entre sesiones de agentes.
- Trazabilidad de "por qué" decidimos lo que decidimos.
- Onboarding rápido de colaboradores futuros (incluido el yo-futuro).
- Bajo overhead: si escribir el ADR cuesta más que el valor que aporta, se evita.

## Opciones consideradas

### A — Sin ADRs, solo commits y README
- Pros: cero overhead.
- Contras: información se pierde; el "porqué" no cabe en un commit; los agentes no la encuentran.

### B — ADRs formato MADR (Markdown Architecture Decision Records)
- Pros: estándar comunitario, ligero, agnóstico de herramientas, agent-friendly (texto plano).
- Contras: requiere disciplina para mantenerlos.

### C — Notion/Confluence externos
- Pros: rich-text, búsqueda.
- Contras: fuera del repo → los agentes no lo leen; rot rápido; coste.

## Decisión

**Adoptamos MADR** dentro de `docs/adr/`, numerados de forma incremental (`NNNN-kebab-title.md`). Plantilla en `_TEMPLATE.md`.

## Consecuencias

### Positivas
- Los agentes (Claude Code, etc.) leen `docs/adr/` antes de cambiar arquitectura.
- Decisiones quedan versionadas con el código.
- Las revertimos vía nuevo ADR con estado `Superseded by …`.

### Negativas
- Hay que recordar abrir el ADR. Mitigamos con el workflow (`docs/workflow.md` indica cuándo abrirlo).

## Referencias

- [MADR](https://adr.github.io/madr/)
- [Documenting Architecture Decisions — Michael Nygard, 2011](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
