# REVISIONES — rama `mejora-epica`

Cada vuelta: valorar → mejorar/añadir → checks → capturas → árbitro adversarial (subagente independiente con contexto limpio) → corregir bloqueantes y mayores.

Nota ponderada = 0,4·Diseño + 0,3·Usabilidad + 0,2·Creatividad + 0,1·Contenido. Listón: ponderada ≥ 8,8, Creatividad ≥ 8,5, resto ≥ 8,0.

Capturas (no versionadas, no desplegadas): `capturas/00-linea-base/`, `capturas/vuelta-N/`. Cada carpeta incluye capturas por sección a 390/768/1440 en claro y oscuro, estados (menú, lightbox, modal, select, foco de teclado, inglés, reduced motion), `overflow.json`, `console.json`, `lighthouse.json`, PDF de impresión y un vídeo `.webm` del scroll.

## Cómo se mide

- **Lighthouse**: Lighthouse 12 contra la build estática servida localmente bajo `/portfolioR/` con Chromium 148 headless, 2 ejecuciones por preset (móvil y escritorio). Google Analytics se bloquea en las capturas pero no en Lighthouse.
- **Lighthouse móvil "simulado" (Lantern)** da LCP ≈ 10 s tanto en la línea base como después: es un artefacto del modelo (atribuye al render todo el JS previo). Con throttling real (`throttlingMethod: devtools`) el LCP se mide aparte.
- **`robots-txt` (SEO 92)**: falla solo en local porque el sitio vive bajo un subpath y `/robots.txt` del host no es el del proyecto. No es un cambio de esta rama.

## Línea base (main @ 1d10894)

| Check | Resultado |
| --- | --- |
| Lint | 13 errores, 2 warnings |
| Build | OK (aviso de datos antiguos de `baseline-browser-mapping`) |
| Consola | Error de hidratación React #418 en modo claro (×3 anchuras) |
| Scroll horizontal 360–1920 | **Falla a 768 px** (888 px) |
| Lighthouse móvil (simulado) | Perf 40 / 58 · A11y 91 · BP 100 · SEO 92 |
| Lighthouse escritorio | Perf 87 / 78 · A11y 91 · BP 100 · SEO 92 |
| LCP móvil con throttling real | 3,8 s (avatar) |
| Fallos A11y | contraste (firma del footer), orden de títulos (h4), nombre de enlaces sociales del hero, `label-content-name-mismatch` (idioma, badge) |

## Vuelta 1 (commit 8ee9df0) — checks completos, árbitro sin terminar

| Check | Resultado |
| --- | --- |
| Lint | 0 errores, 0 warnings |
| Build | OK |
| Consola | 0 errores/warnings (hidratación corregida) |
| Scroll horizontal 360–1920 | OK en las 10 anchuras |
| Lighthouse escritorio | Perf 91 / 91 · A11y 100 · BP 100 · SEO 92 (local) |
| Lighthouse móvil (simulado) | Perf 38 / 56 (línea base 40 / 58, dentro del ruido) · A11y 100 · BP 100 |
| LCP móvil con throttling real | 3,3–4,0 s (línea base 3,8 s) |
| Impresión | Todo el contenido visible en PDF (`capturas/vuelta-1/print-*.pdf`) |

Añadido: ver DECISIONES D-06…D-20. El árbitro adversarial de la vuelta 1 se lanzó y se detuvo antes de terminar porque se alcanzó el límite de uso: **esta vuelta no tiene notas todavía**.

### Cambios posteriores, sin build ni capturas (commit "wip")
- Cita destacada en About que se enciende palabra a palabra con el scroll (frase ya existente del About, ES/EN).
- Impresión como CV compacto (sin galerías, fotos de certificados ni formulario).
- Etiquetas del carrusel y del botón "volver al inicio" pasadas a los diccionarios ES/EN.

### Pendiente
Vueltas 2 y 3 como mínimo: build + capturas + Lighthouse de los cambios de arriba, árbitro adversarial completo, corrección de bloqueantes y mayores, y registro de notas.
