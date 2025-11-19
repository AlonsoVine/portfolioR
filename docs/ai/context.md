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
