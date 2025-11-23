# Changelog

## 2025-11-18
- Documentacion: README actualizado con descripcion detallada del portfolio y del flujo de trabajo en Next.js.
- Operativa IA: `docs/ai/PROMPT_ComportamientoAI.md` reescrito sin caracteres corruptos para dejar claras las reglas y el registro obligatorio en `docs/ai/context.md`.
- Hero: Se redefinio la seccion de bienvenida para alinear el layout con la referencia (columna de texto, avatar circular) y se agrego el boton Descargar CV apuntando a `/assets/cv/20250612%20-%20Alonso%20Vi%C3%B1%C3%A9%20CV_Espa%C3%B1ol.pdf`.
- CTA descarga: El boton Descargar CV ahora usa un borde degradado tipo pill con los colores del boton primario para replicar la referencia visual.
- CTA descarga fondo: Ajustado el relleno del boton para que use #050b21, igualando el tono del fondo y evitando contrastes no deseados.
- Avatar 3D: El hero ahora usa un stack circular con flip 3D entre `mi-foto.png` y el logo redondo, eliminando el marco previo y aplicando `perspective`/`backface-visibility` segun la especificacion del usuario.
- Avatar tamaño: Incrementado ligeramente el diametro del stack para resaltarlo sin romper el layout.
- CTA descarga tema: El relleno del boton Descargar CV usa nuevas variables con colores especificos para modo oscuro y modo claro para integrarse mejor en ambos contextos.
- Fondo Hero: Sustituida la banda cortada por dos gradientes radiales superpuestos que se extienden a todo el ancho para eliminar la línea y suavizar el difuminado.
- Fondo Hero (ajuste): Reintroducido el haz dorado con tres capas radiales (base oscura, glow superior e inferior) para que el gradiente se perciba de nuevo sin cortes.
- Fondo Hero (reversión): Vuelto al gradiente radial original hasta que se defina un nuevo estilo según las indicaciones del usuario.
- Fondo Hero (extensión): Añadido un contenedor con overlays adicionales (radial extendido + degradado vertical) para que el haz no se corte en la parte superior.
- Fondo Hero (top glow): Se recupera el color original extendiendo un único radial dorado desde la parte superior del hero con blur suave para mantenerlo visible sin cortes.
- Fondo Hero (base): Restituido nuevamente el gradiente original simple al no conseguir el efecto deseado con los overlays extendidos.
- UX: Se añadió un botón fijo "Volver al inicio" que aparece al salir del header y permite volver suavemente al hero respetando temas claro/oscuro.
- Meta: El título del sitio pasa a "Alonso Viñe" y se establece el icono del navegador con `public/logo-negro-redondo-conFondo.png`.
- UX hover: El botón "Volver al inicio" ahora muestra efectos hover/focus (escala, desplazamiento y borde) para enfatizar que es clicable.
- Experiencia: Las tarjetas del timeline muestran iconos (empresa, proyecto, ubicación, fechas), separan empresa/proyecto, reducen la tipografía de fechas y añaden chips de tecnologías alimentadas desde `src/data/portfolio.ts`.
- Footer: El pie de página incluye tagline “Full Stack / Analista”, botones tipo hero para LinkedIn/GitHub y los mensajes “Hecho con ♥” y “Desarrollado con React, Tailwind CSS y mucho café”.
- Contacto: La sección replica la referencia con formulario renovado, tarjetas “Conecta conmigo” y “Disponible para colaborar”, email real `alonvineba@gmail.com`, efectos hover en los enlaces y card final con el gradiente del botón principal.
- Hero CTA: El botón “Descargar CV” replica el efecto hover de los botones sociales del footer (fondo degradado con highlight e icono acorde).
- Sobre mi: Se añadieron cards discretas bajo el texto principal (Desarrollo Frontend, Buenas Prácticas, Aprendizaje Continuo) leyendo datos desde `aboutContent`, ahora sin borde y con iconos en amarillo para alinear con los enlaces de sección.
- Skills: El grid ahora muestra tarjetas agrupadas (Lenguajes, Frameworks, Cloud, Bases de Datos, Herramientas, Certificaciones) con iconos y etiquetas coloreadas según la referencia.
- Skills data: Se sumaron JavaScript, Tailwind, MongoDB y Postman a sus grupos respectivos dentro de `skillCards`.
- Proyectos: Se actualizaron los datos (Jardin Digital destacado, resto sin botón demo) y el grid para mostrar badge, pills de tecnología y manejo opcional de demo.
- Proyectos UX: Ocultado el botón de demo cuando un proyecto no tiene demo definida, manteniendo solo el CTA de código.
- Certificaciones: Cards en 3 columnas con imagen superior, badge “Certificación” en amarillo y fecha, destacando institución y descripción.
- Certificaciones UX: Simplificado el encabezado mostrando el icono amarillo junto a la institución y la fecha a la derecha, con título y detalle debajo.
- Certificaciones hover: Las cards heredan el glow/hover del stack tecnológico con overlay degradado sutil.
- Certificaciones modal: Ahora al hacer click se abre la imagen del certificado en un modal con cierre por overlay y tecla ESC.
- Proyectos hover: Las cards de proyectos adoptan el overlay de certificaciones con gradiente amarillo más sutil.
- Timeline: Los nodos amarillos se alinean ahora con el título de cada card sobre la línea central.
- Timeline ring: El nodo amarillo ahora “corta” la línea central con un ring que usa el color de fondo para integrarlo.
- Skills (light mode): Acentos amarillos sustituidos por un naranja cálido configurable para mejorar la legibilidad en modo claro.
- Acentos cálidos: SectionHeading, Skills, Projects, About, Education y timeline adoptan el tono naranja #d97706 para modo claro mediante `--accent-warm`.
- Chips proyectos: Etiquetas de tecnologías vuelven a un estilo neutro (borde-soft, fondo blanco/5) para mantener contraste en ambos modos.
- Chips proyectos (color): Se restaura la paleta multicolor en proyectos usando `--accent-warm` para el tono amber y colores diferenciados para el resto.
- Paleta chips: Variables `--pill-*` definen tonos por tema (oscuro/claro) para chips en Skills y Proyectos, reforzando visibilidad en modo claro.
- Paleta chips fix: Corregida la sintaxis de variables `var(--pill-*)` en Skills y Proyectos para recuperar los colores previstos en ambos temas.
- Paleta chips inline: Se añadieron tonos rose/teal en `globals.css`, se dieron colores únicos a cada card de Skills (Herramientas pasa a rose) y los chips de Skills/Proyectos usan estilos inline basados en variables para asegurar contraste en light/dark.
- About: Actualizada la imagen principal de 'Con�ceme mejor' a /assets/img/about-img.png y se dej� la anterior comentada como respaldo.

- About hover: Se agreg� animaci�n sutil al hover de la imagen (elevaci�n, glow y escala suave) manteniendo el fallback comentado.

- Certificados: Corregidas rutas de los primeros t�tulos (UOC) y copiados los assets Nebrija/UOC/UTAMED a public/images/certificados para que carguen en Education.

- Encoding: Reescrito src/data/portfolio.ts en UTF-8 para eliminar bytes inv�lidos que romp�an el parseo; rutas de certificados (incluida UOC) apuntan a los assets en public/images/certificados.

- i18n: A�adido LanguageProvider, diccionarios ES/EN, selector en el header y refactor de Hero, About, Skills, Experience, Projects, Education, Contact y Footer para consumir textos localizados; page.tsx ya no pasa datos fijos.

- i18n About: Cards de highlights traducidas al ingl�s (Frontend Development, Best Practices, Continuous Learning) en el diccionario EN.
- Timeline: Tecnolog�as mencionadas en los bullets ahora se muestran en cursiva (seg�n la lista de tech de cada experiencia) para destacarlas en ambos idiomas.
- Proyectos: Descripciones en EN traducidas y tecnolog�as dentro del texto ahora se muestran en cursiva usando la lista tech de cada proyecto.
- Educaci�n: Detalles en EN traducidos respetando instituciones/t�tulos; palabras clave tecnol�gicas en los detalles se muestran en cursiva (AWS, GitHub, Linux, Power Apps, Selenium, Scrum, Python, etc.).
- Educaci�n EN: Traduje detalles de UTAMED y UOC; palabras clave ampliadas (AI/IA, ECTS, 200/600 horas) para cursiva en las descripciones.
- Educaci�n EN: Descripciones de UTAMED y UOC afinadas en ingl�s manteniendo nombres propios.
- Educaci�n: Las descripciones en EN de las primeras certificaciones se traducen en render y resaltan en negrita las palabras t�cnicas (AI, ML, NLP, ECTS, horas, etc.), manteniendo t�tulos e instituciones originales.
- Educaci�n: Todas las descripciones en EN provienen del diccionario traducido y los t�rminos t�cnicos se resaltan en negrita solo al mostrar en ingl�s.
