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
