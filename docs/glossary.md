# Glosario

Vocabulario compartido entre humano y agentes para evitar ambigüedad.

| Término | Significado en este proyecto |
|---|---|
| **Sección** | Bloque de la landing (`Hero`, `About`, `SkillsGrid`, `ExperienceTimeline`, `ProjectsGrid`, `Education`, `Contact`). Cada uno en `src/components/sections/`. |
| **Spec** | Documento en `docs/features/NN-slug.md` que define el problema, criterios de aceptación y plan de una feature. |
| **ADR** | Architecture Decision Record. Documento en `docs/adr/NNNN-titulo.md` que captura una decisión arquitectónica con contexto, opciones y consecuencias. Formato [MADR](https://adr.github.io/madr/). |
| **Token de tema** | Variable CSS definida en `src/app/globals.css` (`--foreground`, `--surface-card`, `--pill-amber-bg`…). Único mecanismo aprobado para colores. |
| **Diccionario** | Objeto en `src/i18n/locales/{es,en}.ts` que contiene todo el contenido traducible. Fuente de verdad del texto visible. |
| **Subpath** | El prefijo `/portfolioR` aplicado en producción por GitHub Pages. Todas las rutas a assets deben respetarlo vía `NEXT_PUBLIC_BASE_PATH`. |
| **Export estático** | Modo `output: "export"` de Next.js. Sin runtime de servidor; solo HTML/JS/CSS pre-renderizados. |
| **Trigger deploy** | Commit en `main` cuyo mensaje empieza por `deploy:` y dispara el workflow de Pages. |
| **Scroll reveal** | Animación de entrada al hacer scroll, centralizada en `scrollRevealConfig` (`src/lib/utils.ts`). |
| **Pill** | Chip rectangular redondeado para mostrar tags (tecnologías, etiquetas). Estilos en CSS vars `--pill-*-{bg,border,text}`. |
| **Highlight tech** | Función que resalta dentro de un párrafo las tecnologías de un array dado. Duplicada hoy en `ProjectsGrid` y `ExperienceTimeline` (ver MEJORAS.md #22). |
| **DoD** | Definition of Done. Checklist en `docs/definition-of-done.md`. |
