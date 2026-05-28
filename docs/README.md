# Documentación del proyecto

Esta carpeta es la **memoria del portfolio**: lo que humanos y agentes consultan antes de tocar código.

## Índice

### Para empezar (lee en este orden)
1. [`../CLAUDE.md`](../CLAUDE.md) — contexto cargado por Claude Code en cada sesión.
2. [`../AGENTS.md`](../AGENTS.md) — contrato estándar agents.md.
3. [`workflow.md`](./workflow.md) — pipeline Spec → Plan → Implement → Verify → PR.
4. [`conventions.md`](./conventions.md) — convenciones de código y commits.
5. [`definition-of-done.md`](./definition-of-done.md) — checklist por tipo de cambio.
6. [`glossary.md`](./glossary.md) — vocabulario compartido.

### ADRs (decisiones de arquitectura)
- [`adr/_TEMPLATE.md`](./adr/_TEMPLATE.md)
- [`adr/0000-uso-de-adrs.md`](./adr/0000-uso-de-adrs.md)
- [`adr/0001-stack-nextjs-export.md`](./adr/0001-stack-nextjs-export.md)
- [`adr/0002-tailwind-tokens-css-vars.md`](./adr/0002-tailwind-tokens-css-vars.md)
- [`adr/0003-i18n-contexto-react-sin-libreria.md`](./adr/0003-i18n-contexto-react-sin-libreria.md)
- [`adr/0004-fuente-de-verdad-contenido.md`](./adr/0004-fuente-de-verdad-contenido.md)
- [`adr/0005-estandar-seo-minimo.md`](./adr/0005-estandar-seo-minimo.md)

### Features (specs vivas)
- [`features/_TEMPLATE.md`](./features/_TEMPLATE.md)
- (se irán añadiendo `NN-slug.md` por cada mejora del backlog)

### Runbooks (operativa)
- [`runbooks/deploy.md`](./runbooks/deploy.md)
- [`runbooks/nueva-seccion.md`](./runbooks/nueva-seccion.md)

### Backlog
- [`../MEJORAS.md`](../MEJORAS.md) — 35 mejoras priorizadas.
- [`feature-playbook.md`](./feature-playbook.md) — cómo abordar cada una de las 35 mejoras.

## Reglas de mantenimiento

- Un ADR no se edita una vez `Accepted`. Se reemplaza con uno nuevo que lo marca como `Superseded by`.
- Una spec se actualiza durante su vida; al cerrar, se rellenan `Decisions during implementation` y `Outcome`.
- Si añades un documento, enlázalo en este índice.
