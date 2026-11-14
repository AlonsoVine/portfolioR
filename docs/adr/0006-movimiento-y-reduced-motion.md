# ADR-0006: Movimiento con CSS y framer-motion, y reduced motion sin romper la hidratación

- **Estado**: Accepted
- **Fecha**: 2026-11-14
- **Decisores**: Alonso Viñé
- **Tags**: animación | a11y | rendimiento

## Contexto y problema

La rama `feat/awwwards-epic` multiplica las animaciones: arranque, retrato en ASCII, escaparates de proyecto, cabeceras ligadas al scroll. Hacía falta una regla para decidir con qué se anima cada cosa y cómo se respeta `prefers-reduced-motion` en un sitio exportado estáticamente, donde el servidor no conoce esa preferencia.

## Drivers

- Sin librerías nuevas: el sitio es estático y el peso importa.
- `prefers-reduced-motion` respetado de verdad en todas las piezas.
- Nada de errores de hidratación: el HTML del servidor y el primer render del cliente tienen que coincidir.

## Opciones consideradas

### Opción A — Todo con framer-motion

- Pros: una sola API.
- Contras: coreografías de entrada que no necesitan JS dependerían de la hidratación; más trabajo en el hilo principal.

### Opción B — Añadir GSAP o Lenis

- Pros: timelines y scroll suave muy potentes.
- Contras: dependencias y peso nuevos para efectos que CSS ya resuelve.

### Opción C — CSS primero, framer-motion para lo ligado al scroll

- Pros: sin dependencias nuevas; las entradas funcionan aunque el JS llegue tarde.
- Contras: dos mecanismos que conviene conocer.

## Decisión

Opción C.

- Entradas, hovers y estados (`is-in`, `data-active`, `:hover`) en CSS, con las curvas `--ease-out-expo` y `--ease-out-quart`.
- framer-motion solo para lo que depende del scroll (`useScroll`, `useTransform`) o del layout (`layoutId`).
- Canvas (`AsciiPortrait`) para lo que es dibujo; se detiene al terminar.
- **Regla de hidratación**: el JSX nunca cambia de estructura ni de texto según `useReducedMotion()` en el primer render. La preferencia se aplica con `@media (prefers-reduced-motion: reduce)` en CSS (por ejemplo, la clase `.scroll-linked`) o después de montar (`requestAnimationFrame` o el patrón `useIsClient`).
- Los estados ocultos solo existen con `html[data-js]`: sin JS, todo se ve.

## Consecuencias

- Cada pieza nueva lleva su bloque `@media (prefers-reduced-motion: reduce)` en `globals.css`.
- Revisar con el build de producción y movimiento reducido emulado: es donde aparecen los errores de hidratación (#418).
