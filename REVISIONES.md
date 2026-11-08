# REVISIONES — rama `mejora-sobria`

Registro de cada vuelta: checks objetivos, informe del juez independiente (contexto limpio), defectos corregidos e ideas adoptadas o descartadas. Las capturas viven en `capturas/` (ignorada por git, no se despliega).

Cómo se miden los checks: build estático servido en `127.0.0.1` con base path `/portfolioR`; Playwright (Chromium 1248) para capturas, consola, overflow, teclado, reduced motion e impresión; Lighthouse 12 (2 pasadas móvil + 2 escritorio) para las notas. `npm run check:design` es el script que falla con colores prohibidos, `background-clip:text`, gradientes decorativos o emojis.

Nota sobre SEO 92: la única auditoría que falla es `robots-txt`, porque Lighthouse lo busca en la raíz del dominio y el sitio vive bajo `/portfolioR`. `src/app/robots.ts` existe y se exporta; pasa igual en la línea base y en GitHub Pages no depende del proyecto.

## Línea base (`capturas/sobria-00-linea-base`, rama `mejora-epica`)

| Check | Resultado |
|---|---|
| check:design | Falla (gradientes, background-clip:text, tonos prohibidos, emojis) |
| Consola | 0 errores / 0 warnings |
| Overflow 360–1920 | OK |
| Lighthouse móvil (perf / a11y / BP / SEO) | 37–49 / 100 / 100 / 92 |
| Lighthouse escritorio | 63–65 / 100 / 100 / 92 |

## Vuelta 1 — rediseño editorial (`f2ced52`, `6d01b11`, `8b16972`, `01983ac`)

Servidor local: http://127.0.0.1:4400/portfolioR/ (`npm run serve:out`). Capturas: `capturas/sobria-vuelta-1`.

### Checks

| Check | Línea base | Vuelta 1 |
|---|---|---|
| check:design | Falla | OK |
| Lint | OK | OK |
| Consola | 0 | 0 |
| Overflow 360–1920 | OK | OK |
| Lighthouse móvil perf / a11y / BP / SEO | 37–49 / 100 / 100 / 92 | 48–84 / 100 / 100 / 92 |
| Lighthouse escritorio perf / a11y / BP / SEO | 63–65 / 100 / 100 / 92 | 100 / 100 / 100 / 92 |
| Teclado (139 tabulaciones) | — | Todas con indicador; modal abre, Esc cierra y devuelve el foco |
| Reduced motion | — | Contenido completo y estático (cita con opacidad 1) |
| Impresión A4 | — | 9 páginas ES/EN, claro/oscuro |

### Juez (contexto limpio)

Diseño 7,0 · Usabilidad 6,0 · Creatividad 5,5 · Contenido 6,5 → **ponderada 6,35**. Veredicto: no parece de estudio todavía; "fórmula de portfolio editorial" y fallos que un estudio no entregaría.

Defectos y respuesta:

| # | Gravedad | Defecto | Acción |
|---|---|---|---|
| 1 | Bloqueante | Menú móvil invisible: `translate-y-0` en el header crea bloque contenedor y el panel `fixed` mide 0 px | Corregido: sin clase translate en reposo (`Header.tsx`) |
| 2 | Bloqueante | Insignia Lighthouse 95/95/100/100 escrita a mano, no coincide con lo medido | Corregido: sustituida por `BuildStamp` (commit y fecha reales del build) + enlace a PageSpeed |
| 3 | Mayor | CTA flotante tapa texto en escritorio | Corregido: en ≥1024 px el CTA pasa al header; flotante solo en móvil/tablet; botón de subir en el margen |
| 4 | Mayor | Imagen OG del diseño antiguo | Corregido: `og-portfolio.png` nueva compuesta con las fuentes y tokens del sitio |
| 5 | Mayor | Portadas de proyecto saturadas rompen la paleta | Corregido: capa neutra en modo `saturation` que se retira con opacidad al señalar |
| 6 | Mayor | Cita original sustituida por una inventada | Corregido: restaurada la original en ES y EN |
| 7 | Menor | Separador «/» ambiguo con PL/SQL o Git/GitHub | Corregido: «·» |
| 8 | Menor | «#» suelto bajo cada eyebrow | Corregido: «Enlace», visible al pasar por la cabecera o con foco (siempre visible en táctil) |
| 9 | Menor | Transiciones de color (body, botones, enlaces) | Corregido: eliminadas; solo se animan transform y opacity |
| 10 | Menor | Impresión de 9 páginas | Corregido: fuera del PDF las descripciones largas de Formación |

Contenido señalado por el juez: highlight de inglés y de IA reformulados con matices no presentes → restaurados al texto original; «que uso en proyectos reales» → retirado; «del análisis al despliegue» repetido tres veces → el título de Perfil pasa a «Multidisciplinar por elección» (frase original del subtítulo) y el hero recupera su subtítulo original. Títulos genéricos («Con qué trabajo», «Trabajo propio», «Hablemos») → «Stack y herramientas», «Proyectos personales», «Escríbeme». GA4: ya estaba en la línea base y no se añade nada; queda como pregunta pendiente en DECISIONES.

Ideas del juez:

- **Trayectoria como pipeline en el hero** → adoptada en parte: la lista de empresas sube a la columna izquierda del hero y entra en el primer pantallazo a 1440×900; descartado rotular etapas `build/test/release`, porque atribuiría a cada empresa un significado que el CV no dice.
- **Usar la columna izquierda y agrupar los dos puestos de Atos (Cestic)** → adoptada la agrupación (el segundo puesto no repite la empresa en grande, filete discontinuo); descartado el contador «11 títulos» por la regla de no meter cifras de impacto.
- **Dirección de arte única en las imágenes de proyecto** → adoptada vía la capa de desaturación; sustituir las portadas por otras capturas queda fuera porque no hay material nuevo.
- **Hash del commit y fecha del build en el pie** → adoptada (`BuildStamp`).
