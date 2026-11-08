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
