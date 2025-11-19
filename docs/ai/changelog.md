# Changelog

## 2025-11-18
- Documentacion: README actualizado con descripcion detallada del portfolio y del flujo de trabajo en Next.js.
- Operativa IA: `docs/ai/PROMPT_ComportamientoAI.md` reescrito sin caracteres corruptos para dejar claras las reglas y el registro obligatorio en `docs/ai/context.md`.
- Hero: Se redefinio la seccion de bienvenida para alinear el layout con la referencia (columna de texto, avatar circular) y se agrego el boton Descargar CV apuntando a `/assets/cv/20250612%20-%20Alonso%20Vi%C3%B1%C3%A9%20CV_Espa%C3%B1ol.pdf`.
- CTA descarga: El boton Descargar CV ahora usa un borde degradado tipo pill con los colores del boton primario para replicar la referencia visual.
- CTA descarga fondo: Ajustado el relleno del boton para que use #050b21, igualando el tono del fondo y evitando contrastes no deseados.
- Avatar 3D: El hero ahora usa un stack circular con flip 3D entre `mi-foto.png` y el logo redondo, eliminando el marco previo y aplicando `perspective`/`backface-visibility` segun la especificacion del usuario.
- Avatar tamaño: Incrementado ligeramente el diametro del stack para resaltarlo sin romper el layout.
