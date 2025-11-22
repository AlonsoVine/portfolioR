# Contexto para la IA

## 2025-11-18T20:30:00Z

- Acciones: Actualice el README con una descripcion alineada al portfolio y reescribi `docs/ai/PROMPT_ComportamientoAI.md` para limpiar la codificacion y aclarar las reglas.
- Decisiones y pendientes: Mantener el contenido de documentacion en ASCII para reducir problemas de encoding; pendiente confirmar con el usuario si desea reintroducir acentos completos mas adelante.
- Proximos pasos: Verificar que el equipo siga el nuevo README/prompt y ampliar el portfolio o assets cuando haya nuevo contenido.
- Archivos tocados: README.md:1, docs/ai/PROMPT_ComportamientoAI.md:1, docs/ai/context.md:1.
- Notas o riesgos: Revisar mas adelante si es necesario reintroducir caracteres con acentos usando UTF-8 consistente.

## 2025-11-18T21:05:00Z

- Acciones: Reubique el CV en `public/assets/cv`, actualice `src/data/portfolio.ts` y redefini `src/components/sections/Hero.tsx` para replicar la bienvenida de la referencia (nuevo layout, CTA Descargar CV y avatar circular); ejecute `npm run lint`.
- Decisiones y pendientes: Mantener el uso de codigos `\u` para representar caracteres especiales mientras se decide si migrar todo a UTF-8; pendiente validar visualmente con el usuario que el layout coincide con la captura.
- Proximos pasos: Ajustar estilos menores si tras la revision visual se requieren retoques y considerar mover el resto del contenido textual a escapes consistentes.
- Archivos tocados: public/assets/cv/20250612 - Alonso Vi\u00F1\u00E9 CV_Espa\u00F1ol.pdf, src/data/portfolio.ts:67, src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Confirmar que el enlace al CV funcione tras el despliegue (ruta con espacios codificados) y que las tabs introducidas en `src/data/portfolio.ts` convivan bien con el resto del estilo.

## 2025-11-18T21:20:00Z

- Acciones: Ajuste el CTA de descarga en `src/components/sections/Hero.tsx` para que use un borde degradado como en la referencia (gradient pill con colores del boton primario), envolviendo el contenido en un contenedor `p-[1px]`; ejecute `npm run lint`.
- Decisiones y pendientes: Mantener ambos botones con la misma paleta para consistencia visual; pendiente revisar si se requiere un estado distinto al hover actual.
- Proximos pasos: Validar visualmente en el navegador y ajustar detalles de grosor o padding si el usuario lo solicita.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Verificar que el gradiente y la animacion se vean correctamente en navegadores con soporte limitado para `bg-[linear-gradient]`.

## 2025-11-18T21:30:00Z

- Acciones: Cambie el fondo interno del boton Descargar CV (`src/components/sections/Hero.tsx`) a un tono hexadecimal fijo (#050b21) para igualarlo al fondo del hero y evitar que desentone; valide con `npm run lint`.
- Decisiones y pendientes: Mantener el color fijo hasta contar con definiciones tematicas (light/dark) que permitan interpolar; pendiente confirmar visualmente que el tono coincide con el degradado del fondo.
- Proximos pasos: Ajustar si es necesario un valor distinto para temas claros o introducir una variable especifica de hero.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: El valor fijo podria requerir ajustes si cambia `--background`; conviene parametrizarlo mas adelante.

## 2025-11-18T21:55:00Z

- Acciones: Copie los assets `mi-foto.png` y `logo-negro-redondo-conFondo.png` a `public/images`, actualice `src/data/portfolio.ts` para referenciar caras frontal/trasera y rehice el avatar de `src/components/sections/Hero.tsx` con flip 3D conforme a la descripcion (sin marco, perspective, caras separadas 1px); añadi estilos en `src/app/globals.css`; ejecute `npm run lint`.
- Decisiones y pendientes: Mantener el giro disparado por hover hasta definir interacciones adicionales (tap en mobile); pendiente validar en dispositivos tactiles que el efecto sea adecuado.
- Proximos pasos: Ajustar velocidades/angulo o proveer fallback estatico si se detecta preferencia reduce motion.
- Archivos tocados: public/images/mi-foto.png, public/images/logo/logo-negro-redondo-conFondo.png, src/data/portfolio.ts:67, src/components/sections/Hero.tsx:1, src/app/globals.css:1, docs/ai/context.md:1.
- Notas o riesgos: El efecto usa transformaciones 3D; hay que revisar en navegadores legacy y considerar añadir `prefers-reduced-motion` en siguientes iteraciones.

## 2025-11-18T22:05:00Z

- Acciones: Aumente ligeramente el tamaño del stack del avatar (`src/components/sections/Hero.tsx`) pasando a dimensiones `h-72 w-72` (desktop `sm:h-80 sm:w-80`) para que luzca más protagonista; volvi a ejecutar `npm run lint`.
- Decisiones y pendientes: Mantener este incremento mientras no afecte el layout responsive; pendiente validar visualmente en viewport pequeño por si requiere breakpoint adicional.
- Proximos pasos: Ajustar spacing de los CTA si el nuevo tamaño reduce el espacio entre columnas.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Verificar que en pantallas pequeñas no se corte el halo; considerar un `max-w` si el usuario quiere versiones más grandes.

## 2025-11-18T22:20:00Z

- Acciones: Cambie el relleno del boton Descargar CV para que consuma nuevas variables (`--hero-cta-surface` y `--hero-cta-surface-hover`) definidas en `src/app/globals.css`, asignando valores distintos para dark y light mode; ejecute `npm run lint`.
- Decisiones y pendientes: Mantener los valores propuestos (#050b21 y #fff3e0) hasta recibir feedback visual; pendiente evaluar si el color del modo claro debe derivar dinámicamente del fondo del hero.
- Proximos pasos: Ajustar tonalidades/hover tras validar en distintos monitores y considerar soporte para `prefers-color-scheme`.
- Archivos tocados: src/components/sections/Hero.tsx:1, src/app/globals.css:1, docs/ai/context.md:1.
- Notas o riesgos: Si el hero recibe un gradiente diferente, habrá que recalibrar estas variables para que sigan combinando con el contexto.

## 2025-11-18T22:32:00Z

- Acciones: Rediseñe la capa de fondo del hero (`src/components/sections/Hero.tsx`) eliminando la banda abrupta y reemplazándola por dos overlays radiales que se extienden más allá de los bordes para que el difuminado cubra todo el espacio; verificado con `npm run lint`.
- Decisiones y pendientes: Mantener el blur extra hasta confirmar visualmente que elimina la línea; pendiente revisar rendimiento en dispositivos de gama baja si el blur es costoso.
- Proximos pasos: Ajustar opacidad o rango de los gradientes según el feedback del usuario y añadir soporte condicional para `prefers-reduced-motion` si se considera necesario.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Los gradientes usan `-inset-x-16`; si el layout cambia, puede requerir ajuste para evitar overflow en pantallas muy pequeñas.

## 2025-11-18T22:42:00Z

- Acciones: Volvi a ajustar los overlays del hero (`src/components/sections/Hero.tsx`) añadiendo una base radial oscura y dos gradientes extendidos (superior dorado e inferior profundo) para que reaparezca el haz difuminado sin líneas duras; corrí `npm run lint`.
- Decisiones y pendientes: Mantener estas dimensiones mientras el usuario valide visualmente; pendiente comprobar en pantallas muy anchas (-35vw) para asegurarnos de que el gradiente siga cubriendo.
- Proximos pasos: Añadir controles finos de opacidad si vuelve a perderse en modo claro u otros fondos.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: El blur grande puede impactar dispositivos limitados; considerar media queries si notamos jank.

## 2025-11-18T22:55:00Z

- Acciones: Ante la desaparicion del efecto, reverti `src/components/sections/Hero.tsx` al gradiente original radial y restableci el CTA secundario para que siga usando las variables `--hero-cta-surface`; execute `npm run lint`.
- Decisiones y pendientes: Mantener el fondo tal como estaba hasta recibir nuevas instrucciones sobre el rediseño; pendiente documentar cuando el usuario defina el nuevo aspecto deseado.
- Proximos pasos: Esperar las indicaciones del usuario para aplicar el nuevo estilo y preparar un enfoque mas controlado (quizas usando pseudo-elementos).
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Necesitamos cuidado al manipular overlays para no perder coherencia entre temas claro/oscuro.

## 2025-11-18T23:05:00Z

- Acciones: Para evitar el corte brusco superior, envolvi el gradiente original del hero con un contenedor `overflow-hidden` y añadi dos overlays extra (uno extendido hacia arriba con blur y otro degradado vertical) en `src/components/sections/Hero.tsx`; valide con `npm run lint`.
- Decisiones y pendientes: Mantener la combinacion actual mientras el usuario confirma que la transicion ya no se corta; pendiente ajustar opacidades en caso de notar sobreexposicion en modo claro.
- Proximos pasos: Recoger feedback visual y, si hace falta, modular los valores de `top`/`h` para adaptarse a pantallas mas pequeñas.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: El blur grande puede impactar el rendimiento en dispositivos modestos; considerar media queries o `prefers-reduced-motion` en mejoras futuras.

## 2025-11-18T23:15:00Z

- Acciones: Ajuste nuevamente el fondo del hero (`src/components/sections/Hero.tsx`) para recuperar el color original y desplegarlo desde la parte superior completa usando un solo radial extendido (`top-[-40%]` con blur controlado); ejecute `npm run lint`.
- Decisiones y pendientes: Mantener la configuracion actual hasta nueva indicacion; pendiente validar visualmente que el gradiente sea visible tanto en modo claro como oscuro.
- Proximos pasos: Ajustar intensidad/blur si todavía no se percibe correctamente.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: El gradiente expandido podría provocar overflow en pantallas muy pequeñas; monitorear y aplicar media queries si es necesario.

## 2025-11-18T23:22:00Z

- Acciones: Reverti `src/components/sections/Hero.tsx` al gradiente original simple (una sola capa radial) porque las extensiones no mostraban el efecto esperado; ejecute `npm run lint`.
- Decisiones y pendientes: Mantener esta version base hasta definir exactamente el nuevo estilo; pendiente recibir la siguiente indicacion del usuario.
- Proximos pasos: Aplicar el rediseño cuando el usuario lo describa.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno; regresamos al estado comprobado.

## 2025-11-18T23:35:00Z

- Acciones: Cree `src/components/ui/ScrollToTopButton.tsx` con un listener de scroll para mostrarse al salir del header y desplazamiento suave hacia arriba; lo importe en `src/app/page.tsx` y ejecute `npm run lint`.
- Decisiones y pendientes: El umbral actual es 160px; pendiente validar si el usuario desea otro comportamiento o posicion.
- Proximos pasos: Ajustar estilos/responsive si se solicita y evaluar ocultarlo cuando existan modales.
- Archivos tocados: src/components/ui/ScrollToTopButton.tsx:1, src/app/page.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno, el listener se limpia correctamente.

## 2025-11-18T23:45:00Z

- Acciones: Copie `src/assets/img/logo/logo-negro-redondo-conFondo.png` a `public/` para usarlo como favicon y actualice `src/app/layout.tsx` con metadata de título "Alonso Viñe", descripción ajustada y `icons` apuntando al nuevo recurso; ejecute `npm run lint`.
- Decisiones y pendientes: Mantener estos metadatos hasta nuevo aviso; pendiente confirmar si se requieren variantes `apple-touch-icon` u otros tamaños.
- Proximos pasos: Añadir metadatos adicionales (Open Graph, Twitter) en futuras iteraciones si el usuario lo solicita.
- Archivos tocados: public/logo-negro-redondo-conFondo.png, src/app/layout.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: El archivo PNG debe permanecer en `public/` para que Next.js pueda servirlo como icono.

## 2025-11-18T23:52:00Z

- Acciones: Mejore `src/components/ui/ScrollToTopButton.tsx` con efectos hover/focus (escala, traslación, cambio de borde/fondo) y cursor pointer para reforzar que es clicable en ambos temas; corrí `npm run lint`.
- Decisiones y pendientes: Mantener el umbral y estilos actuales salvo feedback; pendiente probar en dispositivos táctiles que el estado no estorbe.
- Proximos pasos: Evaluar si conviene añadir tooltip o label visible en mobile si hay confusión.
- Archivos tocados: src/components/ui/ScrollToTopButton.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: El focus ring usa `outline-amber-300`; revisar contraste en modo claro.

## 2025-11-19T00:10:00Z

- Acciones: Reemplacé por completo la estructura de `experiences` en `src/data/portfolio.ts` (nuevos campos company/project/location/tech, textos en ASCII y chips de tecnologías) y rediseñé `src/components/sections/ExperienceTimeline.tsx` para añadir iconos (Building, Briefcase, MapPin, Calendar), separar empresa/proyecto, reducir la fecha y mostrar las tecnologías en chips; ejecuté `npm run lint`.
- Decisiones y pendientes: Los textos se mantienen sin acentos para evitar problemas de codificación; pendiente validar con el usuario si necesita localización o más campos (ej. estado del proyecto).
- Proximos pasos: Ajustar estilos de la timeline si se requiere más contraste o si se añaden nuevos elementos.
- Archivos tocados: src/data/portfolio.ts:116, src/components/sections/ExperienceTimeline.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: La sustitución completa del bloque de experiencias elimina caracteres corruptos previos; revisar que futuros cambios mantengan ASCII o migren el archivo entero a UTF-8.

## 2025-11-19T00:25:00Z

- Acciones: Reescribí `src/components/layout/Footer.tsx` para añadir branding con tagline “Full Stack / Analista”, botones de LinkedIn y GitHub con estética del hero y los textos “Hecho con ♥ …” y “Desarrollado con React…”; corrí `npm run lint`.
- Decisiones y pendientes: Mantener la importación de `socialLinks` para heredar URLs; pendiente validar si debemos añadir más redes o traducir textos al inglés.
- Proximos pasos: Ajustar responsividad si los botones ocupan demasiado espacio en móviles.
- Archivos tocados: src/components/layout/Footer.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: El nombre usa caracteres `\u00F1\u00E9`; verificar que no se vuelva a corromper.

## 2025-11-19T00:45:00Z

- Acciones: Rediseñé `src/components/sections/Contact.tsx` replicando la estructura de la referencia: formulario renovado, cards “Conecta conmigo” y “Disponible para colaborar”, plus descripción actualizada; mantuve estilos y coherencia con el hero; ejecuté `npm run lint`.
- Decisiones y pendientes: Emails/URLs de ejemplo se mantienen hasta integrar servicios reales; pendiente decidir si se añade validación o backend.
- Proximos pasos: Integrar servicio de correo y convertir los datos de plataformas en configurables.
- Archivos tocados: src/components/sections/Contact.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Texto del email es estático; conviene moverlo a configuración cuando se disponga de dirección definitiva.

## 2025-11-19T00:55:00Z

- Acciones: Ajusté la sección de contacto para reflejar el email real `alonvineba@gmail.com`, añadí el texto “Disponible para colaborar” tal como en la referencia, y apliqué un hover sutil a los enlaces de “Conecta conmigo”; lidé con los acentos manteniendo ASCII donde fue necesario; corrí `npm run lint`.
- Decisiones y pendientes: Mantener el mail hardcodeado hasta que exista configuración global; pendiente validar si los hover deben cambiarse en móviles.
- Proximos pasos: Centralizar los datos de contacto en `src/data/portfolio.ts` o en un archivo de config.
- Archivos tocados: src/components/sections/Contact.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Revisar que las traducciones sin acento sean aceptables; caso contrario, migrar archivo completo a UTF-8.

## 2025-11-19T01:05:00Z

- Acciones: Ajusté la card “Disponible para colaborar” para que use el gradiente del CTA del formulario y devolví los iconos de “Conecta conmigo” a un color más sutil (usa `var(--foreground)/70`); verifiqué con `npm run lint`.
- Decisiones y pendientes: Mantener el gradiente mientras guste al usuario; pendiente revisar si se necesita una versión clara.
- Proximos pasos: Evaluar si queremos animaciones adicionales en la card o si basta con el mensaje.
- Archivos tocados: src/components/sections/Contact.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T01:12:00Z

- Acciones: Ajusté el botón “Descargar CV” del hero para replicar el hover del CTA de LinkedIn en el footer (fondo degradado, highlight interior y color de icono coherente); corrí `npm run lint`.
- Decisiones y pendientes: Mantener este comportamiento salvo nuevo feedback; pendiente verificar en móvil si el highlight se percibe bien.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/Hero.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T01:25:00Z

- Acciones: Añadí highlights configurables en `aboutContent` (titulo, descripcion, icono) y rediseñé `src/components/sections/About.tsx` para renderizarlos bajo el texto, manteniendo la estética general; corrí `npm run lint`.
- Decisiones y pendientes: Los textos siguen en ASCII; pendiente confirmar si se requieren iconos adicionales o datos externos.
- Proximos pasos: Valorar si estos highlights deben hacerse editables desde CMS.
- Archivos tocados: src/data/portfolio.ts:97, src/components/sections/About.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Asegurar que futuros cambios en `aboutContent` preserven la nueva estructura.

## 2025-11-19T01:32:00Z

- Acciones: Hice las cards de About más discretas eliminando el borde y usando fondo `bg-black/20` con sombra suave; cambié el color de los iconos a un amarillo (`text-amber-200`) para que coincida con los enlaces de secciones; corrí `npm run lint`.
- Decisiones y pendientes: Mantener este color mientras encaje con la paleta; pendiente revisar si se necesita un modo claro distinto.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/About.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T01:50:00Z

- Acciones: Reemplacé el antiguo listado plano de skills por `skillCards` agrupados (datos en `src/data/portfolio.ts`), reescribí `SkillsGrid` para renderizar tarjetas con iconos y etiquetas estilo la referencia y actualicé `src/app/page.tsx` para usar la nueva estructura; corrí `npm run lint`.
- Decisiones y pendientes: Los grupos usan colores fijos; pendiente validar si se requiere modo claro específico.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/data/portfolio.ts:1, src/components/sections/SkillsGrid.tsx:1, src/app/page.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Los textos permanecen en ASCII para evitar corrupción; considerar migración completa a UTF-8 a futuro.

## 2025-11-19T02:05:00Z

- Acciones: Actualicé `skillCards` en `src/data/portfolio.ts` añadiendo JavaScript a Lenguajes, Tailwind a Frameworks, MongoDB a Bases de Datos y Postman a Herramientas; corrí `npm run lint`.
- Decisiones y pendientes: Mantener esta agrupación hasta nuevo feedback; pendiente si se agregan más certificaciones.
- Proximos pasos: Ninguno.
- Archivos tocados: src/data/portfolio.ts:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T02:20:00Z

- Acciones: Rediseñé la sección de proyectos para soportar tarjetas con badge de destacado, pills de tecnología más legibles, demo opcional y datos actualizados en `src/data/portfolio.ts` (Jardin Digital destacado, otros sin demo); reescribí `ProjectsGrid` y ajusté `Project` para demo opcional/featured; ejecuté `npm run lint`.
- Decisiones y pendientes: Las descripciones están en ASCII; pendiente validar si se requieren más proyectos o nuevos badges.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/data/portfolio.ts:1, src/components/sections/ProjectsGrid.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Al usar demo opcional, asegúrate de definirla cuando haya despliegue real.

## 2025-11-19T02:30:00Z

- Acciones: Oculté por completo el botón de demo en proyectos sin demo, ajustando el layout para que solo se muestre el CTA de código cuando aplica; corrí `npm run lint`.
- Decisiones y pendientes: Mantener este comportamiento mientras no haya demos para esos proyectos.
- Proximos pasos: Añadir demos reales cuando estén disponibles.
- Archivos tocados: src/components/sections/ProjectsGrid.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T02:45:00Z

- Acciones: Restilicé las tarjetas de certificaciones (`src/components/sections/Education.tsx`): layout de 3 columnas, borde sutil, badge con icono y acento amarillo, header con fecha y textos actualizados; ejecuté `npm run lint`.
- Decisiones y pendientes: Mantener el badge “Certificacion” y el acento amarillo; pendiente validar en modo claro si el contraste es suficiente.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/Education.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T02:53:00Z

- Acciones: Ajusté las cards de certificaciones para mostrar solo el icono junto al título (sin texto “Certificacion”) manteniendo el acento amarillo y la fecha al lado; corrí `npm run lint`.
- Decisiones y pendientes: Mantener esta versión minimalista; pendiente feedback visual.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/Education.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T03:00:00Z

- Acciones: Reubicado el icono de certificacion junto a la institucion en las cards de Education y colocado la fecha arriba a la derecha, con el titulo y detalle debajo; ejecute `npm run lint`.
- Decisiones y pendientes: Mantener este layout salvo nuevo feedback.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/Education.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T03:08:00Z

- Acciones: Aplique el efecto hover/glow de las cards de stack a las certificaciones añadiendo overlay degradado activado al hover; corrí `npm run lint`.
- Decisiones y pendientes: Mantener el brillo sutil; pendiente revisar contraste en modo claro si se habilita.
- Proximos pasos: Ninguno.
- Archivos tocados: src/components/sections/Education.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T03:20:00Z

- Acciones: Añadí modal en certificaciones para abrir la imagen al hacer click (soporte ESC y cierre por overlay), moviendo estado/control a `src/components/sections/Education.tsx`; corrí `npm run lint`.
- Decisiones y pendientes: Uso la imagen PNG/JPG para una vista rápida sin PDF; pendiente decidir si mostrar PDFs en el futuro.
- Proximos pasos: Opcionalmente agregar navegación entre certificados dentro del modal.
- Archivos tocados: src/components/sections/Education.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno identificado.

## 2025-11-19T03:28:00Z

- Acciones: Aplique el overlay hover de certificaciones a las cards de proyectos y reduje la intensidad del gradiente amarillo en el hover; corrí `npm run lint`.
- Decisiones y pendientes: Mantener el glow más sutil salvo feedback.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/ProjectsGrid.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T03:36:00Z

- Acciones: Reposicioné los puntos de la timeline para alinearlos con el título de cada card sobre la línea central y ajusté el spacing vertical; corrí `npm run lint`.
- Decisiones y pendientes: Mantener este alineado salvo nuevo feedback.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/ExperienceTimeline.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T03:45:00Z

- Acciones: Ajusté de nuevo la posición del nodo amarillo de la timeline (top-6 centrado en la línea) para que quede junto al título y evitar desplazamientos; corrí `npm run lint`.
- Decisiones y pendientes: Verificar visualmente si el offset top-6 es suficiente; pendiente feedback.
- Proximos pasos: Ninguno.
- Archivos tocados: src/components/sections/ExperienceTimeline.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T03:55:00Z

- Acciones: Alineé el nodo amarillo sobre la línea del timeline con una pequeña anilla (`ring-[var(--background)]`) para que “corte” la línea manteniendo el estilo actual; ejecuté `npm run lint`.
- Decisiones y pendientes: Validar visualmente que el ring y el ping se perciben como parte de la línea, con intensidad suave.
- Proximos pasos: Ajustar offset si aún queda desalineado.
- Archivos tocados: src/components/sections/ExperienceTimeline.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T04:05:00Z

- Acciones: Mejore el contenedor del nodo en la timeline (ancho y offset) para que el punto amarillo realmente corte la línea central y sea visible; corrí `npm run lint`.
- Decisiones y pendientes: Revisar visualmente si el nuevo `top-10` cumple la alineación buscada; pendiente feedback.
- Proximos pasos: Ajustar nuevamente si es necesario.
- Archivos tocados: src/components/sections/ExperienceTimeline.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T04:15:00Z

- Acciones: Ajusté nuevamente el offset del nodo del timeline (`top-[52px]`) para intentar alinearlo con el título cortando la línea; corrí `npm run lint`.
- Decisiones y pendientes: A la espera de feedback visual final; pendiente quizá usar cálculo dinámico.
- Proximos pasos: Evaluar si se requiere otra iteración con medidas dinámicas.
- Archivos tocados: src/components/sections/ExperienceTimeline.tsx:1, docs/ai/context.md:1.
- Notas o riesgos: Ninguno.

## 2025-11-19T04:25:00Z

- Acciones: Apliqué el tono naranja oscuro (#d97706) para modo claro mediante variables `--accent-warm`/`--accent-warm-soft` y lo usé en SectionHeading, Skills (pills/iconos), Projects (badge/pills), About, Education e indicadores de la timeline; corrí `npm run lint`.
- Decisiones y pendientes: El header mantiene el hover amber original; pendiente decidir si también se actualiza.
- Proximos pasos: Revisar en light si queda algún amarillo residual y ajustarlo.
- Archivos tocados: src/app/globals.css, src/components/shared/SectionHeading.tsx, src/components/sections/SkillsGrid.tsx, src/components/sections/ProjectsGrid.tsx, src/components/sections/About.tsx, src/components/sections/Education.tsx, src/components/sections/ExperienceTimeline.tsx, docs/ai/context.md.
- Notas o riesgos: Ninguno.

## 2025-11-19T04:50:00Z

- Acciones: Definí variables `--accent-warm`/`--accent-warm-soft` (dark: #fbbf24, light: #e36927) y las apliqué a iconos/badges en Skills, About, Education y timeline. Restauré los chips de tecnologías de proyectos a estilo neutro (borde-soft, fondo blanco/5). Ejecuté `npm run lint`.
- Decisiones y pendientes: Pendiente evaluar si se aplica el acento cálido al hover del header.
- Proximos pasos: Revisar el resto de acentos en modo claro y ajustar si es necesario.
- Archivos tocados: src/app/globals.css, src/components/sections/SkillsGrid.tsx, src/components/sections/ProjectsGrid.tsx, src/components/sections/About.tsx, src/components/sections/Education.tsx, docs/ai/context.md.
- Notas o riesgos: Chips de tecnologías vuelven a un estado similar al original para evitar problemas de contraste.

## 2025-11-19T05:05:00Z

- Acciones: Volví a aplicar la paleta de chips multicolor en proyectos con soporte para los nuevos tonos cálidos (sin tocar chips de cert/otros) y dejé consistencia light/dark mediante `--accent-warm`; corrí `npm run lint`.
- Decisiones y pendientes: Mantener los chips de proyectos con colores diferenciados; pendiente revisar si alguna otra sección requiere revertir estilos similares.
- Proximos pasos: Ninguno inmediato.
- Archivos tocados: src/components/sections/ProjectsGrid.tsx, docs/ai/context.md.
- Notas o riesgos: Ninguno.

## 2025-11-19T05:20:00Z

- Acciones: Reforcé los tonos de chips en Skills y Proyectos creando variables de paleta (`--pill-*`) separadas por tema; en light se usan versiones más oscuras pero coherentes con los tonos de dark; ajusté viewers a las nuevas variables y mantuve el resto de chips como estaban; ejecuté `npm run lint`.
- Decisiones y pendientes: El acento cálido en amber usa #e36927 en light y #fbbf24 en dark; pendiente revisar si otros amarillos del header deben adaptarse.
- Proximos pasos: Verificar en light que los chips sean legibles; si hay elementos residuales, aplicar la paleta.
- Archivos tocados: src/app/globals.css, src/components/sections/SkillsGrid.tsx, src/components/sections/ProjectsGrid.tsx, docs/ai/context.md.
- Notas o riesgos: Ninguno.

## 2025-11-19T05:30:00Z

- Acciones: Corrigí el uso de las variables de color en chips para Skills y Proyectos (sintaxis `var(--pill-*)` en border/bg/text) y mantuve los tonos originales en dark con versiones más oscuras en light; corrí `npm run lint`.
- Decisiones y pendientes: Header y otros amarillos siguen pendientes de revisión si se desea unificar.
- Proximos pasos: Validar visualmente en modo claro que los chips recuperaron contraste.
- Archivos tocados: src/app/globals.css, src/components/sections/SkillsGrid.tsx, src/components/sections/ProjectsGrid.tsx, docs/ai/context.md.
- Notas o riesgos: Ninguno.

## 2025-11-19T05:40:00Z

- Acciones: Arreglé la sintaxis de las clases de chips para usar `var(--pill-*)` en Skills y Proyectos; corrí `npm run lint`.
- Decisiones y pendientes: Confirmar visualmente en modo claro que los colores se aplican.
- Proximos pasos: Revisar otros componentes con acentos cálidos si es necesario.
- Archivos tocados: src/components/sections/SkillsGrid.tsx, src/components/sections/ProjectsGrid.tsx, docs/ai/context.md.
- Notas o riesgos: Ninguno.

## 2025-11-19T06:05:00Z

- Acciones: Añadí paletas rose y teal en `globals.css`, remapeé los chips de Skills a variables con estilos inline (evitando que queden blancos en modo claro), di un color propio a Herramientas (`tone: rose`) y extendí los chips de Proyectos a la misma paleta con estilos inline para asegurar contraste en ambos temas.
- Decisiones y pendientes: Mantener los tonos actuales salvo nuevo feedback visual; pendiente validar en UI que cada card de Stack conserva un color distinto y que las pills se ven en light/dark.
- Proximos pasos: Ajustar si algún color resulta demasiado suave o si se piden nuevos matices.
- Archivos tocados: src/app/globals.css, src/components/sections/SkillsGrid.tsx, src/components/sections/ProjectsGrid.tsx, src/data/portfolio.ts.
- Notas o riesgos: Las variables nuevas deben mantenerse sincronizadas con futuros usos de chips para evitar disparidad de colores.

## 2025-11-19T06:50:00Z

- Acciones: Correg� la ruta de la imagen de 'Con�ceme mejor' a /assets/img/about-img.png y copi� el recurso a public/assets/img; la imagen previa queda comentada como respaldo en About.tsx.
- Decisiones y pendientes: Mantener esta foto hasta nuevo aviso; pendiente decidir si volver al video o ajustar el recorte.
- Proximos pasos: Validar visualmente que la imagen ahora se muestre en ambos temas y dispositivos.
- Archivos tocados: src/components/sections/About.tsx; public/assets/img/about-img.png.
- Notas o riesgos: Ninguno.

- Acciones: A�ad� una animaci�n hover al contenedor de la imagen en 'Con�ceme mejor' (lift, glow y scale suave) sin alterar la imagen base; se mantiene el respaldo comentado.
- Decisiones y pendientes: Mantener este hover mientras guste; pendiente ajustar intensidad si resulta excesivo.
- Proximos pasos: Validar visualmente en ambos temas.
- Archivos tocados: src/components/sections/About.tsx.
- Notas o riesgos: El blur y glow pueden impactar levemente en dispositivos modestos.

- Acciones: A�ad� overlay de texto 'Alonso Vi��' en la imagen de About, apareciendo con transici�n suave al hover y desapareciendo al salir; mantiene el glow y escala previos.
- Decisiones y pendientes: Mantener esta animaci�n mientras guste; pendiente ajustar tama�o/opacidad si se requiere mayor sutileza.
- Proximos pasos: Validar visualmente en ambos temas.
- Archivos tocados: src/components/sections/About.tsx.
- Notas o riesgos: Ninguno.

- Acciones: Correg� la ruta del certificado UOC a /images/certificados/Certificado-UOC-Iniciacion-IA_page-0001.jpg y copi� los certificados (Nebrija, UOC, UTAMED) a public/images/certificados para que carguen en Education.
- Decisiones y pendientes: Mantener nombres ASCII en public para evitar problemas de encoding; pendiente migrar el resto si aparecen nuevos certificados con tildes.
- Proximos pasos: Validar en la UI que los tres primeros certificados se muestran y se abren en el modal.
- Archivos tocados: src/data/portfolio.ts; public/images/certificados/Certificado-UniversidadNebrija-PromptEngineering.jpg; public/images/certificados/Certificado-UOC-Iniciacion-IA_page-0001.jpg; public/images/certificados/Certificado-Utamed-InteligenciaArtificialParaProgramadores_page-0001.jpg.
- Notas o riesgos: Evitar rutas con caracteres especiales en futuros assets.

- Acciones: Reescrib� src/data/portfolio.ts en UTF-8 (estaba con bytes inv�lidos) para que Next/Turbopack pueda parsear; confirmada la ruta del certificado UOC en /images/certificados/Certificado-UOC-Iniciacion-IA_page-0001.jpg.
- Decisiones y pendientes: Mantener todo el archivo en UTF-8; pendiente migrar otros archivos si presentan encoding cp1252.
- Proximos pasos: Correr build/refresh para verificar que el error de invalid utf-8 desaparece y que los primeros certificados cargan.
- Archivos tocados: src/data/portfolio.ts, docs/ai/context.md.
- Notas o riesgos: Evitar pegar texto con acentos desde fuentes con encoding distinto sin guardar en UTF-8.

