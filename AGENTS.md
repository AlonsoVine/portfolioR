# AGENTS.md

> Estándar abierto [agents.md](https://agents.md) para que cualquier agente de IA (Claude Code, Cursor, Codex, Aider, Continue…) tenga el mismo contrato de trabajo. Si tu agente concreto necesita más contexto, consulta también `CLAUDE.md`.

## Project at a glance

- **Tipo**: portfolio personal estático.
- **Stack**: Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript 5 · Tailwind CSS 4 · framer-motion · lucide-react · EmailJS.
- **Despliegue**: GitHub Pages, subpath `/portfolioR`, vía workflow en `.github/workflows/deploy.yml` con trigger en commits `deploy: …`.

## Setup

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # /out
npm run lint
```

Variables de entorno: ver `.env.example` (EmailJS y, opcionalmente, `NEXT_PUBLIC_BASE_PATH`).

## Code style

- TypeScript estricto. **No usar `any`** salvo justificado en comentario.
- Componentes en PascalCase, hooks en camelCase con prefijo `use`, archivos en `kebab-case` solo si ya existen así.
- Tailwind utility-first. Tokens de color **siempre** vía CSS vars de `globals.css`.
- Imports: orden 1) externos, 2) `@/` alias, 3) relativos. ESLint lo hace cumplir.
- Sin comentarios de relleno; solo el "porqué" no obvio.

## Testing & checks

- `npm run lint` — obligatorio.
- `npm run build` — obligatorio antes de PR.
- Tests E2E (cuando se añadan, ADR pendiente): `npm run test:e2e` con Playwright.
- Verificación manual en dark/light y `es/en` para cambios de UI.

## Constraints específicos del proyecto

1. Export estático: **no** introducir Route Handlers, Server Actions, ISR ni middleware.
2. Toda ruta a asset estático: prefijar con `NEXT_PUBLIC_BASE_PATH` o el helper `withBasePath`.
3. Contenido visible en `src/i18n/locales/{es,en}.ts`. Mantener paridad ES/EN.
4. Antes de añadir una dependencia, abrir un ADR si pesa >20 KB gzipped o cambia el stack.

## Workflow

Pipeline obligatorio para features: **Spec → Plan → Implement → Verify → PR**. Detalle en [`docs/workflow.md`](./docs/workflow.md).

## PR conventions

- Conventional Commits (`feat:`, `fix:`, `refactor:`, …).
- Cuerpo del PR usando [`/.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md).
- Para desplegar: commit final con prefijo `deploy:` tras merge a `main`.

## Definition of Done

Ver [`docs/definition-of-done.md`](./docs/definition-of-done.md).
