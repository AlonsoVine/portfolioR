# DECISIONES — rama `feat/awwwards-epic`

Evolución del rediseño sobrio hacia algo con más movimiento y más «alma de programador», sin perder la elegancia. Los documentos de la tarea anterior (`mejora-sobria`) están archivados en `docs/mejora-sobria/`; los de `mejora-epica`, en `docs/mejora-epica/`.

## Concepto: «el portfolio se compila»

Se mantiene el expediente técnico de `mejora-sobria` (retícula de 12 columnas, papel y tinta, un único acento verde) y se le añade un hilo: la página se comporta como un repositorio que se construye delante del visitante.

- **Arranque** (`BootSequence`): la primera visita de la sesión empieza con un `npm run build` que compila las secciones y termina en el nombre; la cortina sube y el hero lo recoge entero. Se salta con cualquier tecla. Sin JS o con movimiento reducido no existe: `html[data-boot]` lo marca el script de tema antes del primer pintado.
- **Hero**: el retrato se compila en ASCII tras el arranque y luego queda como lente bajo el cursor, con marco de inspector de DevTools. Bloque `git status` (uptime, HEAD, foco, último build real) en lugar de la lista de empresas, que repetía la trayectoria.
- **Secciones como commits**: índice que rueda como un contador, hash por sección que se descifra, filete y titular ligados al scroll, y un índice lateral convertido en grafo de commits.
- **Proyectos con escenografía propia**: Prensa (vinilo que sale de la funda y se prensa), Liberty (su tarjeta de patrimonio en 3D, manipulable mes a mes) y PhotoDateRenamer (nombres que se reescriben con su fecha EXIF). El resto conserva su galería.
- **Contenido consultable como código**: stack como arrays que se instalan y `git grep` al señalar una tecnología; experiencia plegada tras `git log --more`; terminal que teclea sola.

## Decisiones

| Decisión | Por qué |
| --- | --- |
| Rojo de Prensa y azul de Liberty dentro de sus piezas | Son colores de marca de los propios productos y solo aparecen dentro de su escaparate. El resto de la página sigue con un único acento verde. Ambos pasan `check:design`. |
| Prensa sustituye a ForYouToBe; Jarvis se retira | Decisión del autor: Prensa es la evolución de ForYouToBe y Jarvis es un proyecto antiguo que no aporta. Sus imágenes se borran del repo. |
| Orden: Sobre mí → Experiencia → Proyectos → Stack → Formación → Contacto | Orden narrativo: quién es, qué ha hecho, qué ha construido y con qué. |
| Fuera el bloque «Certificaciones» del stack | Duplicaba Formación, donde siguen todas con su certificado. |
| Experiencia y Formación plegables | Tres viñetas por puesto y una línea por certificado; el resto se despliega. Al imprimir sale todo. |
| En móvil, un solo botón flotante (volver arriba) | Los dos flotantes tapaban texto; el contacto ya está en el menú. Se apartan mientras se baja leyendo. |
| Sin librerías nuevas | Todo el movimiento sale de CSS y de framer-motion, que ya estaba. Ver ADR-0006. |

## Sistema de movimiento

Reglas en `docs/adr/0006-movimiento-y-reduced-motion.md`. Lo esencial: coreografías en CSS siempre que se pueda, framer-motion para lo ligado al scroll, y el HTML del servidor nunca depende de `prefers-reduced-motion` (esa preferencia se aplica con CSS o después de montar, si no React falla al hidratar).

## Pendiente (propuesto por el jurado, no hecho)

- Escaparates propios para Jardín Digital y Space Invaders, al nivel de Prensa y Liberty.
- Segunda foto en «Sobre mí»: el jurado la ve repetida respecto al retrato del hero.
- Transición de elemento compartido (FLIP) entre el nombre del arranque y el `h1` del hero.
