# REVISIONES — rama `feat/awwwards-epic`

Seis vueltas. En cada una: mejoras, verificación (lint, build, capturas en escritorio y móvil, claro y oscuro, español e inglés) y un jurado nuevo y sin contexto que puntúa con los criterios de Awwwards a partir de capturas y del código. La vuelta siguiente parte de su informe.

| Vuelta | Foco | Diseño | Creatividad | Usabilidad | Contenido |
|:-:|---|:-:|:-:|:-:|:-:|
| 1 | Prensa, arranque tipo build, lente ASCII, tema en círculo | 7,0 | 5,5 | 7,5 | 6,0 |
| 2 | Cabeceras como commits, stack instalable, PhotoDateRenamer | 7,0 | 6,5 | 7,0 | 5,5 |
| 3 | Orden narrativo, `git grep`, diffs en experiencia, formación compacta | 7,4 | 6,6 | 7,2 | 7,0 |
| 4 | Hero con `git status`, intro que acaba en el nombre, Liberty, grafo lateral | 7,0 | 6,5 | 7,0 | 7,5 |
| 5 | Relevo intro → hero, flotantes en móvil, cabeceras ligadas al scroll | 7,0 | 6,5 | 6,5 | 6,0 |
| 6 | Cortina que descubre el nombre entero, un solo flotante en móvil | **7,4** | **7,0** | **7,3** | **7,6** |

Veredicto final del jurado: «Honorable Mention sólida»; Prensa y Liberty, «piezas de autor».

## Defectos encontrados y corregidos por el camino

- `ExperienceTimeline`: el `ref` de la lista nunca se asignaba y `useScroll` rompía la página en desarrollo (venía de `main`).
- Arranque: el primer frame podía dar progreso negativo y `String.repeat` fallaba.
- Desbordamiento horizontal en móvil (paquetes del stack sin punto de corte y brazo del vinilo).
- Hidratación con movimiento reducido (error #418): PhotoDateRenamer y las cabeceras pintaban distinto en servidor y cliente.
- El correo del pie se partía a mitad del dominio; la línea de créditos quedaba bajo el botón flotante.

## Verificación final

- `npm run lint` limpio, `npm run build` sin errores, `npm run check:design` OK.
- Export servido bajo `/portfolioR`: 0 errores de consola, 0 recursos 404, 0 imágenes rotas y sin desbordamiento horizontal, en escritorio, en móvil y con movimiento reducido. Lo mismo en GitHub Pages tras el despliegue.
