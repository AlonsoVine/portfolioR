# DECISIONES — rama `mejora-epica`

Registro de decisiones, inventario de efectos que no pueden degradarse y preguntas pendientes sobre contenido.

## 1. Inspección inicial

| Aspecto | Hallazgo |
| --- | --- |
| Stack | Next.js 16.0.3 (App Router) · React 19.2 · TypeScript 5 · Tailwind 4 (`@tailwindcss/postcss`) |
| Animación | `framer-motion` 12 (ya instalado). Sin GSAP ni Lenis |
| Iconos | `lucide-react` |
| Formulario | `@emailjs/browser` (claves por env) |
| Despliegue | `output: "export"`, `basePath` `/portfolioR` en producción, GitHub Pages vía Actions si el commit empieza por `deploy:` |
| Estilos | Tokens de tema en CSS vars (`globals.css`), modo claro/oscuro por `data-theme` en `<html>` + script anti-FOUC |
| i18n | Contexto propio (`src/i18n`), diccionarios `es.ts` / `en.ts`; contenido base en `src/data/portfolio.ts` |
| Fuentes | Geist, Geist Mono, Cinzel (next/font) |
| Comandos | `npm run dev`, `npm run build` (genera `/out`), `npm run lint` |

### Estado de la línea base (antes de tocar nada)

- `npm run build`: OK.
- `npm run lint`: **13 errores y 2 warnings preexistentes** (`any`, `setState` en efectos, ref escrita en render, `Date.now()` en render, tipos sin uso).
- Consola: **error de hidratación React #418 en modo claro** (el `ThemeToggle` pinta un icono distinto en servidor y cliente).
- Scroll horizontal: **falla a 768 px** (888 px de ancho): la navegación de escritorio del header aparece en `md` y no cabe, y la rejilla del footer.
- Lighthouse local (build servida en `/portfolioR/`, 2 ejecuciones): móvil Perf 40–58 (LCP ≈ 10 s, el H1 del hero arranca en `opacity:0` hasta hidratar), escritorio Perf 78–87, Accesibilidad 91, Best Practices 100, SEO 92 (el fallo de `robots-txt` se debe al subpath local).
- Capturas, vídeo y JSON de la línea base: `capturas/00-linea-base/`.

## 2. Inventario de efectos, animaciones, interacciones y recursos visuales (lista que no se puede degradar)

### Globales
1. **Aurora**: 3 blobs difuminados (ámbar, rosa, violeta) flotando en bucle 38–46 s, montados tras el primer frame; colores propios en modo claro; parados con reduced motion.
2. **Grano/ruido** SVG fijo a pantalla completa (`bg-noise`, opacidad 0.06, `mix-blend-overlay`).
3. **Barra de progreso de lectura** superior con degradado ámbar→rosa→violeta y muelle (`useSpring`).
4. **Tema claro/oscuro** con script anti-FOUC, persistido en `localStorage`, respeta `prefers-color-scheme`; transición de color de fondo y texto en `body` (0.5 s).
5. **Idioma ES/EN** con persistencia.
6. **Firma ASCII "AV" en consola** con mensajes de estilo.
7. **Easter egg Konami** (↑↑↓↓←→←→BA): modo retro con scanlines, viñeta y filtro de color; toast "MODO RETRO ACTIVADO"; Esc para salir.
8. **Skip link** "Saltar al contenido principal".
9. **`MotionConfig reducedMotion="user"`** en todo el árbol.
10. **Foco visible** ámbar (`:focus-visible`), selección de texto ámbar.
11. **Scroll suave** nativo (desactivado con reduced motion).
12. **Estilos de impresión** (A4, sin decoración, URLs tras enlaces externos, avatar sin flip) + botón "Imprimir versión actual" en el footer.

### Header
13. Cápsula de cristal fija (`glass-panel`, blur 16 px) que gana sombra al hacer scroll > 32 px.
14. Logo con micro-escala al hover; nombre en Cinzel.
15. **Sección activa** detectada con IntersectionObserver: color + subrayado degradado; subrayado aparece en hover (scaleX).
16. Menú móvil: botón hamburguesa/X, panel que se despliega con `scaleY`, bloqueo de scroll del body.
17. Toggle de idioma (sube al hover) y de tema (icono gira 180° al hover, brillo).

### Hero
18. **Nombre en Cinzel** con iniciales sólidas y resto al 20 % de opacidad; entrada fade+slide.
19. Rol, ubicación (icono pin), entradas escalonadas (0.2–0.6 s).
20. **Tagline rotativa** (6 frases derivadas de los datos, cada 8 s, fade vertical, pausa al hover/foco, quieta con reduced motion).
21. Subtítulo con años de experiencia calculados.
22. CTA primario degradado ámbar→rosa con sombra cálida y velo blanco al hover; CTA secundario con borde degradado (descarga CV); CTA terciario con flecha que se desplaza.
23. Iconos sociales que suben y escalan al hover.
24. **Avatar con flip 3D** (rotateY 180°) al hover: foto ↔ monograma; halo difuminado esmeralda/rosa.
25. **Parallax del avatar** con el scroll (translateY −40 px y rotate −3°).
26. Badge "Disponible para colaborar" con punto que hace ping.
27. Degradado radial ámbar en la parte superior.

### Secciones
28. **`scrollRevealConfig`** (fade + 24 px) en tarjetas de todas las secciones, con retardos escalonados.
29. **SectionShell**: glow radial opcional, botón "copiar enlace a esta sección" que aparece al hover/foco.
30. **SectionDivider** con líneas degradadas y ornamento ✦ en Cinzel.
31. Skills: 6 tarjetas con icono, pills por tono (tokens `--pill-*`), elevación y velo degradado al hover.
32. About: imagen con elevación, zoom al hover y nombre "ALONSO VIÑÉ" que emerge; 3 highlights; bloque de texto con brillo superior y CTA con flecha.
33. Experiencia: contador "5+ años de experiencia"; **línea de timeline que se rellena con el scroll** (degradado ámbar→rosa→violeta); nodos con ping verde en el puesto actual; tarjetas alternas izquierda/derecha; tecnologías resaltadas en los bullets; logos de empresa; badge "Actual".
34. Proyectos: tarjetas con elevación y sombra cálida al hover; **spotlights** (Liberty con conmutador Capturas/Vídeo, PhotoDateRenamer con imagen única); **carrusel** con crossfade cada 3.2 s, pausa al hover/foco, flechas y puntos, **lightbox** con teclado (←/→/Esc), cierre al hacer scroll, foco atrapado; pills de tecnología; botones Código / Ver web.
35. Educación: tarjetas con imagen que hace zoom, velo y borde ámbar al hover; **modal de certificado** con foco atrapado, Esc y clic fuera.
36. Contacto: **select de motivo propio accesible** (combobox con teclado, animación de apertura); validación por campo con mensajes; contador de caracteres; honeypot, tiempo mínimo y rate-limit; estado de éxito animado; botón con `whileTap`; plataformas con elevación; tarjeta de disponibilidad degradada.

### Flotantes y footer
37. **CTA "Contáctame" pegajoso** visible entre el 30 % y el 92 % del scroll.
38. **Botón volver arriba** que aparece tras 160 px y sube al hover.
39. Footer: firma "A·LONSO V·IÑÉ" en Cinzel, navegación, iconos sociales, **badge Lighthouse**, botón de imprimir.

### Recursos visuales
40. Fotos (`mi-foto.webp`, `about-img.webp`), monograma/logo, logos de empresa, capturas y vídeo de proyectos, certificados, CV ES/EN, imagen OG (`public/assets/og-portfolio.webp`).

## 3. Decisiones (se amplía en cada vuelta)

- **D-01 · Rama y alcance**: todo el trabajo en `mejora-epica`; no se toca `main`, no se hace merge ni deploy. Ningún commit empieza por `deploy:`.
- **D-02 · Capturas**: van a `capturas/` en la raíz del proyecto, ignorada por git (`.gitignore`) y fuera de `out/`, así que no se despliega. Subcarpetas `00-linea-base`, `vuelta-1`, … Las herramientas (Playwright 1.56, Lighthouse 12, servidor estático) viven fuera del repo para no añadir dependencias al portfolio.
- **D-03 · Sin librerías nuevas**: `framer-motion` ya cubre scroll-linked, springs y layout animations. No se añade Lenis (el scroll suave secuestrado empeora anclas, teclado y reduced motion) ni GSAP (peso extra para lo mismo).
- **D-04 · Google Analytics**: ya estaba en `main` (commit `4775730`). La tarea prohíbe *añadir* analítica, no retirar la existente sin pedirlo, así que se mantiene tal cual; no se añade ningún otro rastreador. En las pruebas se bloquea para no ensuciar mediciones.
- **D-05 · Contenido**: solo se reorganiza, se corrige ortografía (tildes ausentes en `es.ts`) o se deriva de datos ya presentes (años calculados, nº de empresas, proyectos y formaciones contados de los propios arrays).
- **D-06 · Intro del hero en CSS, no en framer**: el H1 y el resto del hero entraban con `initial={{opacity:0}}` de framer, que en el HTML estático deja el contenido invisible hasta hidratar (LCP móvil ≈ 10 s). Ahora la coreografía (letra a letra + escalonado) es `@keyframes` sobre `transform`/`opacity` y arranca con el primer pintado.
- **D-07 · Nombre como logotipo**: las letras atenuadas del nombre (hero y firma del footer) son un logotipo: WCAG 1.4.3 exime de contraste a los logotipos. Aun así el nombre completo está como texto real (`sr-only`) y la versión decorativa va `aria-hidden`. La opacidad de las letras atenuadas sube de 0.20 a 0.24 (oscuro) / 0.26 (claro) para que el nombre se lea mejor.
- **D-08 · Sin cursor personalizado**: se descarta sustituir el cursor (rompe expectativas, añade latencia y es ruido en un CV). Las interacciones de puntero son: spotlight que sigue al cursor dentro de tarjetas, CTAs magnéticos, inclinación 3D del avatar y ola de luz en el nombre. Todo solo con `(hover:hover) and (pointer:fine)` y sin reduced motion; un único listener delegado con `requestAnimationFrame`.
- **D-09 · Títulos en Cinzel**: los H2 pasan a Cinzel (la tipografía del nombre) con numeración editorial `01–06` que se repite en el menú móvil y en el índice lateral. Une la voz tipográfica del hero con el resto de la página.
- **D-10 · Marquee de stack**: sustituye al primer `SectionDivider` (hero → stack). Sale de los propios `skillCards` (4 por categoría, sin certificaciones), alterna relleno y contorno, reacciona a la velocidad y al sentido del scroll con `skewX` y se detiene fuera de pantalla. Con reduced motion queda estático. Es decorativo (`aria-hidden`): la información está en la sección Stack.
- **D-11 · Timeline con `scaleY`**: el relleno de la línea animaba `height`; ahora es `scaleY` con muelle, más un "cometa" que marca el punto de avance. Los nodos se encienden al llegar y las tarjetas entran desde su lado.
- **D-12 · Índice lateral de secciones**: solo desde 1400 px de ancho (donde hay margen libre), oculto en el hero y fuera del orden de tabulación cuando no se ve.
- **D-13 · Header que se aparta**: se oculta al bajar pasados 640 px y vuelve al subir o al recibir foco; nunca con reduced motion ni con el menú abierto. Navegación de escritorio desde `lg` (arregla el desbordamiento a 768 px).
- **D-14 · Cambio de tema**: usa la View Transitions API (fundido de opacidad por defecto, 0.45 s) cuando existe y no hay reduced motion; si no, cambia como antes.
- **D-15 · Hora de Madrid en el footer**: deriva de la ubicación ya publicada ("Madrid, España"); se pinta solo en cliente para no generar desajustes de hidratación.
- **D-16 · Copiar email**: el email ya era público en Contacto y Footer; se añade un botón para copiarlo con confirmación accesible (`role="status"`).
- **D-17 · emailjs bajo demanda**: `@emailjs/browser` se importa dinámicamente al enviar; menos JS en la carga inicial.
- **D-18 · Tarjetas de formación como `<button>`**: antes eran `div` con `onClick` (no operables con teclado). El modal de certificado entra/sale con animación y queda por encima del header.
- **D-19 · Ortografía**: se añaden las tildes que faltaban en `es.ts` y en títulos de categorías ("Conóceme", "Código", "Formación", "Envíame", "programación"…). No cambia el contenido.
- **D-20 · Badge Lighthouse**: muestra las puntuaciones manuales de la última auditoría PSI del sitio publicado (95/95/100/100). No se actualizan porque no se puede auditar el sitio publicado desde esta rama; solo se corrige su nombre accesible y su color en modo claro.
- **D-21 · Cita destacada en About**: reutiliza la última frase del propio texto del About (ES/EN). El estado "apagado" no baja de 3:1 de contraste (`--quote-dim` por tema).

### Vuelta 2 (tras el árbitro de la vuelta 1b)
- **D-22 · Marquee de trayectoria en vez de marquee de stack**: el árbitro lo vio repetitivo (enumeraba lo mismo que Skills justo debajo). Ahora recorre empresas y años derivados de `experiences` (Atos y Atos (Cestic) se agrupan). Mantiene la reacción a la velocidad del scroll y el contorno, así que el ítem del marquee no se pierde.
- **D-23 · Progreso como pipeline**: la barra de lectura conserva el degradado con muelle (inventario 3) y añade una muesca por sección que se "supera" al pasarla. El índice lateral muestra cada sección como etapa: superada (✓), en curso (pulso) o pendiente (anillo), con "Etapa NN / 06". Encaja con el perfil DevOps sin añadir contenido nuevo.
- **D-24 · Cita sin duplicar**: la frase "Lo que más me mueve…" sale del párrafo 3 del About (ES/EN) y vive solo en la cita iluminada. No se cambia el texto.
- **D-25 · Acento en claro**: `--accent-warm` pasa a `#b4471a` en modo claro y la pill violeta deja de ser naranja (`#5b21b6`). Así cumplen AA sobre `--background` y en las tarjetas. El modo oscuro no cambia.
- **D-26 · Impresión en 9 páginas** (antes 26): rejillas de 2–3 columnas, timeline a una columna, sin fotos decorativas, galerías, formulario ni navegación del footer. Los enlaces de proyecto se imprimen como texto.
- **D-27 · Títulos legibles sin JS**: `RevealText` oculta las palabras por CSS solo si `html[data-js]`, atributo que pone el script anti-FOUC, así que el HTML estático se lee.
- **D-28 · Header en móvil**: por debajo de 768 px ya no se esconde al bajar. Es pequeño, y al esconderse se perdía el acceso al menú.
- **D-29 · Un solo "volver arriba"**: se quita el enlace del footer y se deja el botón flotante (inventario 38). El reloj de Madrid pierde el ping (queda un punto fijo) y el ping verde queda solo en el puesto actual y la disponibilidad.
- **D-30 · Rol del hero**: cada parte ("Full Stack Developer", "DevOps & IA") no se parte por dentro, pero el corte entre partes sí puede ocurrir. A 390 px se cortaba la línea.
- **D-31 · `turbopack.root`**: un `package-lock.json` vacío de 2023 en `C:\proyectos` provocaba un warning de build. No se ha borrado, porque es ajeno al repo; se fija la raíz en `next.config.ts`.

## 4. Preguntas pendientes sobre contenido

1. ¿Hay logros cuantificables (tiempos de release, nº de pipelines o proyectos cliente migrados en Seres, etc.) que se puedan publicar? Darían más fuerza a Experiencia; no se han inventado.
2. ¿Fechas o año de cada proyecto personal? Permitiría ordenarlos o fecharlos.
3. ¿Quieres mantener el badge Lighthouse con cifras manuales o quitarlo/actualizarlo tras el próximo deploy?
4. ¿Se mantiene Google Analytics? Ya estaba en `main` y no se ha tocado, pero choca con un portfolio "sin rastreadores".
5. Varias imágenes de proyecto (ForYouToBe, Jarvis) son ilustraciones generadas, no capturas reales. ¿Hay capturas reales?
