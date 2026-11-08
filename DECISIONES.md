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
