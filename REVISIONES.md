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

### Vuelta 1b (commits 4850f4e…9132931) — evaluada por el árbitro

Añadidos a la vuelta 1: cita en About que se enciende con el scroll, impresión sin galerías ni formulario, etiquetas del carrusel en ES/EN, sin precarga de imágenes de carruseles, corrección de un error de hidratación con reduced motion.

Checks (`capturas/vuelta-1b/checks.md`): lint 0 · consola 0 (tras la corrección) · overflow OK 360–1920 · Lighthouse escritorio Perf 92/92, A11y 100, BP 100 · móvil simulado Perf 56/55 (línea base 40/58) · LCP móvil con throttling real 3,0 s.

**Notas del árbitro**: Diseño 6,5 · Usabilidad 6 · Creatividad 6 · Contenido 6,5 → **ponderada 6,25**.

Defectos señalados:
1. **Bloqueante**: la firma gigante del footer nunca aparece (`whileInView` sobre un span recortado por su padre `overflow-hidden`). Inventario 39 perdido.
2. **Mayor**: modo claro no cumple AA tras recorrer la página (axe): numeración y eyebrows en acento, índice lateral, pills violeta, fechas del timeline, instituciones, placeholder del select.
3. **Mayor**: la "ola de luz" del nombre no funciona (`animation-fill-mode: both` fija la opacidad final).
4. **Mayor**: impresión de 26 páginas.
5. Menor: la cita duplica la última frase del párrafo de encima.
6. Menor: tres controles de "volver arriba" visibles a la vez al final.
7. Menor: los H2 están desplazados en el HTML estático (sin JS no se ven).
8. Menor: el header se esconde en móvil y su estado con sombra apenas se ve.
9. Menor: tres puntos verdes con "ping".
Novedades consideradas de catálogo: marquee de stack (repite la sección siguiente), cita iluminada, magnéticos/spotlight, reloj con ping, "Hecho a mano".

## Vuelta 2 (commit 05264ae)

Corrige los 4 defectos bloqueantes/mayores y los 5 menores de la vuelta 1b (DECISIONES D-22…D-31). Novedades: marquee de trayectoria (sustituye al de stack), barra de progreso e índice lateral leídos como pipeline, rol del hero que no se corta en móvil.

Checks (`capturas/vuelta-2/checks.md`): lint 0 · build sin warnings · consola 0 · overflow OK 360–1920 · impresión 9 páginas · Lighthouse escritorio 92/100/100 · móvil A11y 100, BP 100 · TBT con CPU ×4 327–391 ms (línea base 902–3725 ms).

**Notas del árbitro (vuelta 2)**: Diseño 7 · Usabilidad 7,5 · Creatividad 6,5 · Contenido 7 → **ponderada 7,05** (+0,8).
Defectos: cifras del hero que parpadean al hidratar (mayor); label-in-name en las 11 tarjetas de formación (mayor); ~32 textos `isEn ? :` fuera de los diccionarios (mayor); DNI visible en un certificado (mayor, privacidad); CTA flotante enfocable cuando no se ve; índice lateral a 4,45:1 en claro y encima del footer; menú móvil translúcido; muescas de la barra en el hero; restos en impresión; ping doble en el puesto actual. Nada del inventario perdido.

## Vuelta 3 (commits 02ca798, 5afaab3)

Corrige todos los defectos de la vuelta 2 (D-32…D-41). Para subir Creatividad y Diseño: timeline como grafo de ramas con año y empresa fijos en el hueco libre, skills en bento con el número de tecnologías en contorno y botones de proyecto con la paleta de marca. El DNI aparecía en dos certificados (Nebrija y UTAMED); se tapa en ambos.

Checks (`capturas/vuelta-3/checks.md`): lint 0 · build sin warnings · consola 0 · overflow OK · impresión 9 páginas · A11y 100 · BP 100. **Rendimiento**: con la máquina cargada, el TBT de escritorio es peor que el de la línea base (≈0,5 s frente a ≈0,1 s; Perf 60 frente a 86) por el DOM más grande. La vuelta 3 no lo empeora respecto a la 2. Con CPU ×4 la suma de tareas largas sigue por debajo de la línea base.

Incidencia: durante la medición se borró `node_modules` (un `git worktree remove --force` siguió una unión de directorio). Se restauró con `npm ci` desde el lockfile; no afecta al repo.

**Notas del árbitro (vuelta 3)**: Diseño 7,5 · Usabilidad 7,5 · Creatividad 7 · Contenido 7 → **ponderada 7,35** (+0,30).
Defectos: diálogos por debajo del header y de los flotantes (mayor, heredado de la línea base); la frase "1 jugable, el resto código" no era cierta (mayor); "Desliza" se imprimía; URLs duplicadas en la cabecera impresa; bento con huecos y cifras ambiguas; timeline de dos columnas demasiado estrecho a 768 px; email escrito a mano. Nada del inventario perdido.

## Vuelta 4 (commits 2926349, 382f6ba)

Corrige todos los defectos de la vuelta 3 (D-43…D-47). Novedades para subir Creatividad y Diseño: hero "eclipse" con el retrato recortado aportado por el autor (D-53), nombre en abanico al salir del hero (D-48), entrada tipo telón en imágenes (D-49) y cursor contextual (D-50). Por petición del autor se elimina el giro del avatar (D-54).

Checks (`capturas/vuelta-4/checks.md`): lint 0 · consola 0 · overflow OK · impresión 10 páginas · A11y 100 · BP 100 · Perf escritorio 69–80 (línea base 84–88; deuda de TBT ya registrada).

### (Histórico) cambios añadidos tras la vuelta 1
- Cita destacada en About que se enciende palabra a palabra con el scroll (frase ya existente del About, ES/EN).
- Impresión como CV compacto (sin galerías, fotos de certificados ni formulario).
- Etiquetas del carrusel y del botón "volver al inicio" pasadas a los diccionarios ES/EN.

### Pendiente
Vueltas 2 y 3 como mínimo: build + capturas + Lighthouse de los cambios de arriba, árbitro adversarial completo, corrección de bloqueantes y mayores, y registro de notas.
