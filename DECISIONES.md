# DECISIONES — rama `mejora-sobria`

Rediseño completo hacia un look sobrio, editorial y de estudio. Los documentos de la tarea anterior (`mejora-epica`) están archivados en `docs/mejora-epica/`.

## 1. Inspección

| Aspecto | Estado al empezar |
| --- | --- |
| Rama de origen | `mejora-epica` @ `0a30041`, que existe; `mejora-sobria` se crea a partir de ella |
| Stack | Next.js 16.0.3 (App Router, `output: "export"`, `basePath` `/portfolioR` en producción), React 19.2, TypeScript 5, Tailwind 4, framer-motion 12, lucide-react, @emailjs/browser (import dinámico) |
| Estilos | `src/app/globals.css` con tokens en CSS vars por `data-theme` (claro/oscuro) y utilidades Tailwind en los componentes |
| Fuentes | `next/font/google` (se descargan en build y se sirven desde el propio sitio): Geist, Geist Mono, Cinzel |
| Contenido | `src/i18n/locales/{es,en}.ts` (fuente de verdad) + `src/data/portfolio.ts` |
| Build / ejecución | `npm run build` genera `out/`, que se sirve en local con un servidor estático bajo `/portfolioR/`. `npm run dev` para desarrollo |
| Despliegue | GitHub Actions con commits `deploy:` en `main`. No se toca |
| Terceros | Google Analytics (`gtag`) ya estaba en `main` y el autor pidió mantenerlo en la tarea anterior. No se añade nada nuevo |

Línea base: `capturas/sobria-00-linea-base/`, con capturas a 390/768/1440 en claro y oscuro, estados, impresión, vídeo, `lighthouse.json`, `overflow.json` y `console.json`.

## 2. Inventario de efectos, interacciones y funcionalidades (estado de `mejora-epica`)

**Globales**
- G1. Aurora (3 blobs difuminados ámbar/rosa/violeta)
- G2. Grano SVG
- G3. Barra de progreso de lectura en degradado, con muescas por sección
- G4. Tema claro/oscuro con anti-FOUC y View Transitions
- G5. Idioma ES/EN persistido
- G6. Firma en consola
- G7. Konami → modo retro
- G8. Skip link
- G9. `MotionConfig reducedMotion="user"`
- G10. Foco visible
- G11. Scroll suave
- G12. Impresión A4 compacta + botón imprimir
- G13. Puntero: spotlight en tarjetas, botones magnéticos y cursor contextual ("Ampliar"/"Abrir")
- G14. Índice lateral de secciones como pipeline (≥1400 px)

**Header**
- H1. Barra fija de cristal que se oculta al bajar
- H2. Logo
- H3. Sección activa con subrayado animado (`layoutId`)
- H4. Menú móvil con enlaces numerados
- H5. Toggles de idioma y tema

**Hero**
- R1. Nombre letra a letra con iniciales sólidas y "ola de luz" al hover
- R2. Rol, ubicación y entradas escalonadas en CSS
- R3. Frase rotatoria (6 frases)
- R4. Subtítulo
- R5. CTAs (degradado, borde degradado, con flecha), magnéticos
- R6. Iconos sociales
- R7. Retrato recortado delante de un disco solar degradado, con órbitas y profundidad con el puntero
- R8. Parallax con el scroll
- R9. Badge "Disponible" con ping
- R10. Cifras con contador (años, empresas, 40+ proyectos, formaciones)
- R11. Nombre en abanico al salir
- R12. Indicador "Desliza"

**Secciones**
- S1. Revelados al entrar (fade + 24 px)
- S2. Botón "copiar enlace a la sección"
- S3. Divisores con ornamento ✦
- S4. Marquee de trayectoria (empresas y años, reactivo a la velocidad)
- S5. Skills en bento con pills de color y cifras en contorno
- S6. About: foto con parallax y telón, 3 highlights con icono, cita que se ilumina con el scroll, CTA
- S7. Experiencia: contador de años, línea con muelle y cometa, ramas tipo git, año fijo, nodos con ping, tarjetas alternas, logos, tecnologías resaltadas
- S8. Proyectos: tarjetas, numeración "01 / 06", spotlights, conmutador capturas/vídeo, carrusel con autoplay y pausa, lightbox con teclado y foco atrapado, telón en imágenes, botones Código / Ver web
- S9. Educación: 11 tarjetas con imagen; modal del certificado (portal, `inert`, foco atrapado, Esc)
- S10. Contacto: combobox accesible de motivo, validación por campo, contador de caracteres, honeypot, tiempo mínimo, rate limit, éxito animado, copiar email, plataformas, tarjeta "Disponible"

**Flotantes y footer**
- F1. CTA flotante "Contáctame"
- F2. Volver arriba
- F3. Footer: reloj de Madrid, navegación, firma gigante, redes, badge Lighthouse, imprimir

## 3. Inventario de contenido (no se puede inventar ni perder)

**Identidad.** Alonso Viñé · "Full Stack Developer · DevOps & IA" · Madrid, España · "Disponible para colaborar" · email alonvineba@gmail.com · LinkedIn · GitHub · CV ES/EN descargable.

**Experiencia** (puesto | empresa | periodo | proyecto | tecnologías):

| Puesto | Empresa | Periodo | Proyecto | Tecnologías |
| --- | --- | --- | --- | --- |
| DevOps Engineer · CI/CD & Release Automation | Seres | Ene 2026 – Actual | Aplicación central de Seres | GitLab, GitLab CI/CD, Nexus, Java, Maven, Docker, Jenkins, SonarQube, Bash/Shell, Linux, Scrum, Jira |
| Ingeniero Informático | Inetum | Dic 2024 – Jul 2025 | Minisdef (Ejército del Aire y del Espacio) | Angular, TypeScript, Bootstrap, RxJS, Java, Spring Boot, REST APIs, Scrum, Jira, GitHub |
| Analista de Testing Automatizado y Soluciones Power Platform | Fervimax Group (FCC) | May 2024 – Nov 2024 | Digital Services / DevOps | Selenium, CI/CD, Power Apps, Power Automate, Power BI, Figma |
| Desarrollador Full Stack | Atos (Cestic) | Sep 2022 – Ago 2024 | SEMADE – Ministerio de Defensa | Angular, PrimeNG, Bootstrap, Java, Spring Boot, Oracle SQL, Git, GitHub |
| Analista Funcional y de Datos & Scrum Master Assistant | Atos (Cestic) | Jul 2021 – Ago 2022 | SEMADE – Ministerio de Defensa | SQL, GitHub, Git, Jenkins, Trello, Postman, Scrum, Jira |
| Desarrollador Full Stack | Atos | Mar 2021 – Jun 2021 | Soluciones IoT internas | Angular, Spring Boot, Azure IoT, Android, Java |

Todos los puestos son en Madrid, España. Los bullets de cada puesto están en `es.ts`/`en.ts` y no se modifican.

**Proyectos:**
- **Liberty**: código en GitHub y demo web.
- **PhotoDateRenamer**: código y demo.
- **Jardín Digital**: código y demo.
- **Space Invaders**: código y demo.
- **ForYouToBe**: solo código.
- **Jarvis Asistente de Voz**: solo código.
- Además, el dato aportado por el autor: "40+ proyectos en GitHub".

**Formación** (título | institución | año):

| Título | Institución | Año |
| --- | --- | --- |
| Inteligencia Artificial para Programadores | Universidad Tecnológica | 2025 |
| Iniciación a la Inteligencia Artificial | Universitat Oberta de Catalunya | 2025 |
| Prompt Engineering | Universidad Nebrija | 2025 |
| Bootcamp Full Stack Web · Especialización en Desarrollo con Agentes IA | Neoland | 2025 |
| AWS Certified Cloud Practitioner | AWS | 2024 |
| EF SET English Certificate (C2 Proficient) | EF SET | 2024 |
| GitHub Foundations | GitHub | 2024 |
| LPI Linux Essentials | LPI | 2024 |
| Crear y administrar aplicaciones de lienzo con Power Apps | Microsoft Learn | 2024 |
| Scrum Master | Udemy | 2024 |
| Selenium 4 | Udemy | 2024 |

**Tecnologías (antes de añadir nada):**
- **Lenguajes y programación**: Java, TypeScript, JavaScript, Node, Python, SQL, HTML5, CSS3.
- **Frameworks y librerías**: Angular, React, Next.js, Spring Boot, Express, Django, NestJS, Mongoose, PrimeNG, Bootstrap, Tailwind, RxJS, Android SDK, Vitest.
- **Cloud y DevOps**: AWS, Azure, Docker, Jenkins, GitHub Actions, GitLab CI/CD, Maven, Nexus, SonarQube.
- **Bases de datos**: Oracle SQL Developer, MySQL, MongoDB, Firebase, Análisis de datos (R).
- **Herramientas y plataformas**: Git/GitHub/GitLab, Linux, Selenium, Figma, Postman, Bash/Shell, Power Platform, Power Automate, Power BI, PowerApps, Jira, Scrum.
- **Certificaciones**: EF SET (C2 Proficient), LPI Linux, AWS Cloud Practitioner, Prompt Engineering, GitHub Foundations, Introducing AI, AI for Developers.

**About:** 3 párrafos, 3 highlights, una cita y un CTA (en `es.ts`/`en.ts`).

## 4. Concepto: «expediente técnico»

La página se lee como un documento técnico bien compuesto: una hoja de servicio con secciones numeradas, filetes finos, metadatos en monoespaciada y un titular tipográfico por sección. Todo cuelga de una retícula de 12 columnas con dos ejes fijos: la columna 1, para los metadatos (número de sección, etiqueta, enlace), y la columna 4, para los titulares y las listas. En Perfil y Experiencia el cuerpo de texto arranca en la columna 6.

Por qué este concepto y no otro:
- El perfil es de alguien que **documenta pipelines, versiona artefactos y trabaja para Defensa**. El tono que mejor le representa es el de «oficio, precisión y trazabilidad», no el de «espectáculo».
- Un documento resiste mejor el paso del tiempo que una moda visual. La misma estructura sirve de **versión imprimible** casi sin cambios.
- Deja que el contenido real (puestos, proyectos, formación) sea el protagonista. La jerarquía la marcan el cuerpo, el peso y el espacio, no el color.

Asimetrías deliberadas:
- El apellido va desplazado y en cursiva respecto al nombre.
- Los espaciados entre secciones son distintos en cada una.
- Las dos piezas principales de Proyectos alternan el lado de la imagen.
- El resto de proyectos forman un índice más estrecho.
- Formación se agrupa por año, con el año en grande.

## 5. Paleta (tokens en `src/app/globals.css`)

| Token | Oscuro | Claro | Uso |
| --- | --- | --- | --- |
| `--background` (papel) | `#121211` | `#f2f1ed` | fondo |
| `--foreground` (tinta) | `#ecebe6` | `#161615` | texto principal, botón principal |
| `--foreground-muted` | `#a7a59f` | `#53524d` | cuerpo secundario |
| `--foreground-subtle` | `#8d8b85` | `#686761` | metadatos (≥ 4,5:1 sobre el papel) |
| `--border-soft` / `--border-strong` | `#2c2b29` / `#4b4a46` | `#d7d5cf` / `#a6a49d` | filetes |
| `--surface-soft` | `#1a1a18` | `#e9e8e3` | fondo de imágenes |
| `--accent` (señal) | `#7cc9a6` | `#1c6b4e` | solo lo «vivo»: puesto actual, disponibilidad, sección activa, foco |

Justificación:
- Los neutros son cálidos y de saturación muy baja (≤ 6 %): papel y tinta, no gris de interfaz.
- Hay un único acento, verde de señal (tono ≈ 153–157°), fuera de los rangos prohibidos. Tiene **significado y no decora**: en una página técnica, verde es «en marcha».
- El acento ocupa menos del 1 % de la superficie.
- Contraste AA: tinta sobre papel ≥ 15:1; atenuado ≥ 6:1; sutil ≥ 4,5:1; acento claro sobre papel ≈ 6:1.
- `scripts/check-design.mjs` (`npm run check:design`) falla si aparecen:
  - colores con saturación > 25 % en los tonos 250–320° o 15–45°;
  - `background-clip: text`;
  - degradados decorativos;
  - emojis.
- Excepciones admitidas: `mask-image` y el patrón de líneas del modo retro (easter egg opcional, solo se activa con el código Konami).

## 6. Tipografía

Las tres son OFL, se descargan en build con `next/font/google` y se sirven desde el propio sitio. El visitante no hace ninguna petición a Google.

| Fuente | Uso |
| --- | --- |
| **Instrument Serif** (regular y cursiva) | Nombre, titulares, cita, años de Formación. Serif estrecha de contraste alto que permite cuerpos enormes sin ocupar la pantalla entera |
| **Schibsted Grotesk** (400/500/600) | Texto. Grotesca de periódico con carácter, distinta de Inter/system-ui y muy legible en párrafos largos |
| **IBM Plex Mono** (400/500) | Metadatos en versalitas: fechas, números de sección, tecnologías. Le da el aire de documento técnico y encaja con el perfil |

Escala:
- Nombre: 9–16 rem.
- Titulares de sección: 2,75–6 rem.
- Entradillas: 1,75–2,6 rem.
- Cuerpo: 1,0625 rem.
- Metadatos: 0,75 rem.

Sustituyen a Geist, Geist Mono y Cinzel, que se eliminan.

## 7. Destino de cada efecto del inventario

| Código | Destino | Motivo |
| --- | --- | --- |
| G1 Aurora · G2 Grano | **Eliminados** | Prohibidos (blobs/glow) y además costaban rendimiento |
| G3 Progreso de lectura | **Reestilizado** | Filete de tinta de 2 px, sin degradado ni muescas |
| G4 Tema · View Transitions | **Se mantiene** | Toggle de texto («Claro/Oscuro») con disco partido; anti-FOUC intacto |
| G5 Idioma | **Se mantiene** | «ES / EN» con el idioma activo en tinta |
| G6 Firma en consola · G7 Konami | **Se mantienen** | Retro sin viñeta radial; aviso en papel y tinta |
| G8 Skip link · G9 MotionConfig · G10 Foco | **Se mantienen** | Foco: contorno de 2 px en el acento |
| G11 Scroll suave · G12 Impresión | **Se mantienen** | La impresión se reescribe para el nuevo marcado |
| G13 Spotlight, magnetismo y cursor | **Eliminados** | Son espectáculo. La pista «Ampliar/Abrir» la dan ahora el cursor nativo `zoom-in` y botones con texto |
| G14 Índice lateral | **Reestilizado** | Números y filete que crece en la sección activa (≥ 1520 px) |
| H1 Barra que se oculta | **Se mantiene** | Ahora es sólida con filete inferior (sin cristal) |
| H2 Logo | **Sustituido** | Firma tipográfica «Alonso Viñé» en serif |
| H3 Sección activa | **Se mantiene** | Filete verde que se desplaza (`layoutId`, transform) |
| H4 Menú móvil | **Se mantiene** | Pantalla completa con enlaces numerados en serif |
| R1 Letra a letra y ola de luz | **Sustituido** | Cada línea del nombre sube desde su máscara (transform), sin ola |
| R2 Rol/ubicación | **Se mantiene** | Fila de metadatos sobre un filete que se traza |
| R3 Frase rotatoria | **Eliminada** | Ruido; la reemplaza el bloque «Ahora» con el puesto actual real |
| R5 CTAs | **Reestilizados** | Bloque de tinta y enlaces con filete; sin degradado ni magnetismo |
| R6 Iconos sociales | **Sustituidos** | Enlaces de texto con «↗» |
| R7 Retrato con disco y órbitas | **Sustituido** | Recorte en escala de grises que recupera el color al pasar por encima (opacidad) |
| R8 Parallax · R11 Abanico · R12 «Desliza» | **Eliminados** | Coreografía sin información |
| R9 «Disponible» con ping | **Reestilizado** | Punto verde con pulso suave; estático con movimiento reducido |
| R10 Contadores | **Eliminados** | Prohibidos (cifras de impacto) |
| S1 Revelados | **Se mantienen** | `scrollRevealConfig` |
| S2 Copiar enlace | **Reestilizado** | «#» en la columna de metadatos, visible siempre |
| S3 Divisores ✦ | **Sustituidos** | Filete que se traza al entrar (scaleX) |
| S4 Marquee | **Sustituido** | Tira estática «Trayectoria» bajo el hero |
| S5 Bento | **Sustituido** | Índice tipográfico por capas; sin píldoras de color ni cifras |
| S6 About | **Reestilizado** | Foto en escala de grises con telón; entradilla en serif; highlights como lista de definiciones; la cita que se entinta con el scroll se conserva |
| S7 Experiencia | **Reestilizada** | Lista con filetes; columna de fecha y empresa fija (sticky); filete de progreso en el margen. Fuera: contador de años, cometa, ramas, ping, tarjetas alternas y logos |
| S8 Proyectos | **Reestilizados** | Filas asimétricas. Se conservan carrusel con autoplay y pausa, controles visibles (contador, saltos, anterior/siguiente), lightbox con teclado y foco atrapado, conmutador Capturas/Vídeo, telón y enlaces Código/Web. Fuera: spotlights, emojis y logos |
| S9 Educación | **Reestilizada** | Tabla agrupada por año; «Ver certificado» abre el mismo modal (portal, `inert`, foco atrapado, Esc), ahora a pantalla completa en papel |
| S10 Contacto | **Reestilizado** | Toda la lógica intacta: combobox accesible, validación, contador, honeypot, tiempo mínimo, rate limit, copiar email |
| F1 CTA flotante · F2 Volver arriba | **Reestilizados** | Bloque de tinta y botón cuadrado |
| F3 Footer | **Reestilizado** | Firma en serif, navegación, contacto, reloj de Madrid, colofón, Lighthouse en texto e imprimir |

Animaciones: solo `transform` y `opacity`. Las excepciones son transiciones de color en hover y el cambio de tema, que no se animan en scroll. Con `prefers-reduced-motion` todo aparece en su sitio, sin revelados, telones ni pulsos.

## 8. Ambigüedades resueltas

- **«40+ proyectos en GitHub»**: lo pidió el autor en la tarea anterior, pero esta tarea prohíbe contadores y cifras de impacto. Se conserva el dato como **texto** en la entradilla de Proyectos («seis proyectos escogidos entre los más de 40 que tengo en GitHub»), sin contador ni destacado, más un enlace «Resto de proyectos en GitHub».
- **Metadatos**: la descripción decía «5+ años». Se cambia por hechos: «desde 2021 en proyectos para Defensa con Atos…».
- **Cita del Perfil**: «convertir un "no se puede" en "mira cómo lo hicimos"» era un cliché. Se reescribe a partir de su trabajo real en Seres (sustituir flujos manuales por pipelines reproducibles): «Lo que hoy se hace a mano, mañana debería hacerse solo. Y poder explicarse».
- **Microcopy reescrito**: títulos y descripciones de sección, CTAs («Ver proyectos», «Escribirme»), descripción del Perfil (antes «Apasionado por la tecnología…»), disponibilidad, ayuda del formulario y página 404. No se añade ningún dato nuevo.
- **Traducciones**: la versión inglesa mostraba en español varios bullets, el puesto «Ingeniero Informático» y los meses, porque las claves de traducción iban sin tildes. Se corrige usando las traducciones que ya existían, sin redactar nada nuevo.
- **Logos**: los de empresa y proyecto se retiran. En monocromo a 40 px no se reconocían y, en color, rompían la paleta. El nombre compuesto en serif cumple esa función.
- **Google Analytics**: ya estaba en `main` y el autor pidió mantenerlo. No se añade nada nuevo.
- **Badge de Lighthouse** (95/95/100/100): son valores escritos a mano en el código. Se mantienen, pero hay que verificarlos tras desplegar (ver preguntas).
- **Servidor local**: `npm run serve:out` sirve `out/` bajo `/portfolioR` solo en `127.0.0.1` (por defecto en el puerto 4400).

## 9. Tecnologías añadidas (commit aislado `contenido: tecnologías añadidas`)

| Categoría | Añadidas |
| --- | --- |
| Lenguajes y programación | PL/SQL |
| Frameworks y librerías | Vite |
| Cloud y DevOps | Docker Compose, Nginx, Vercel, GitHub Pages |
| Bases de datos | PostgreSQL, Supabase |
| Herramientas y plataformas | VS Code, IntelliJ IDEA, DBeaver, PuTTY, FileZilla, Tailscale |
| **IA aplicada al desarrollo** (nueva; EN: «AI-assisted development») | Claude Code, GitHub Copilot, ChatGPT |

Criterios:
- Son coherentes con su trabajo real: Oracle → PL/SQL; DevOps → Docker Compose y Nginx; sus proyectos ya se publican en GitHub Pages; usa agentes de IA a diario según su propio texto.
- Sin niveles, barras, porcentajes ni años.
- Ninguna tecnología existente se ha tocado ni quitado.

## 10. Dependencias

- No se añade ninguna dependencia.
- Se eliminan del uso Geist, Geist Mono y Cinzel.
- `lucide-react` sigue en `package.json`, pero ya no se importa en la interfaz: los iconos se sustituyen por texto y flechas tipográficas.

## 11. Preguntas de contenido pendientes para el autor

1. ¿Tienes **logros cuantificados reales** (por ejemplo, reducción del tiempo de release en Seres o número de proyectos cliente migrados)? Hoy no se muestra ninguno porque no se pueden inventar.
2. ¿**Fechas** de los proyectos personales (Liberty, PhotoDateRenamer, etc.)? Permitirían ordenarlos y fecharlos como el resto del documento.
3. ¿Las cifras del **badge de Lighthouse** (95/95/100/100) son de la versión publicada? Conviene medirlas de nuevo con PageSpeed tras desplegar.
4. ¿Mantenemos la foto `public/images/mi-foto_sin fondo.jpg` (1,2 MB, ya no se usa) o la borramos del repositorio?
5. ¿Generamos una **imagen OG** nueva con el estilo actual? La actual (`og-portfolio.webp`) es de la etapa anterior.
6. ¿«Suelo responder en ≤ 24h» sigue siendo cierto?
