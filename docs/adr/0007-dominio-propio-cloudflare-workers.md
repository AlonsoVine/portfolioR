# ADR-0007: Dominio propio y hosting en Cloudflare Workers

- **Estado**: Accepted
- **Fecha**: 2026-11-24
- **Tags**: despliegue, dominio
- **Modifica**: ADR-0001 (solo la parte de hosting; el stack sigue igual)

## Contexto y problema

El portfolio vivía en `alonsovine.github.io/portfolioR`. Se ha comprado `alonsovine.com` en Cloudflare Registrar y queremos servir el sitio en la raíz de ese dominio con el menor coste y mantenimiento posibles.

## Drivers

- Coste: solo el dominio; hosting gratis.
- Sitio en la raíz, sin subpath.
- Mantener el disparador `deploy:` y los secretos en GitHub.
- No romper los enlaces ya compartidos a la URL antigua.

## Opciones consideradas

### A — GitHub Pages con dominio propio
- Pros: casi sin cambios.
- Contras: HTTPS y CDN en manos de GitHub; sin cabeceras ni redirecciones propias; el DNS en Cloudflare tendría que quedarse en modo "solo DNS".

### B — Cloudflare Pages
- Pros: pensado para sitios estáticos.
- Contras: Cloudflare recomienda Workers para proyectos nuevos; Pages ya no recibe funciones nuevas.

### C — Cloudflare Workers con static assets, desplegado desde GitHub Actions
- Pros: gratis para un sitio estático, todo en la misma cuenta que el dominio, `_headers` para caché, dominio propio con certificado automático.
- Contras: hace falta un token de API de Cloudflare en los secretos del repo.

## Decisión

**Opción C.** `wrangler.jsonc` publica `out/` como static assets. El workflow construye sin `basePath` y despliega con `cloudflare/wrangler-action`. La URL antigua de GitHub Pages pasa a servir solo una redirección a `https://alonsovine.com/` que conserva la ruta.

## Consecuencias

### Positivas
- Ya no hace falta prefijar los assets en producción (`basePath` vacío).
- URL canónica corta, propia y estable aunque cambie el hosting.

### Negativas / trade-offs
- El `basePath` se lee de `BASE_PATH` (vacío por defecto). `BASE_PATH="/portfolioR"` sigue reconstruyendo la versión con subpath si hiciera falta volver.
- La URL del sitio se lee de `NEXT_PUBLIC_SITE_URL` (`src/lib/site.ts`), con `https://alonsovine.com` como valor por defecto.
- Un secreto más (`CLOUDFLARE_API_TOKEN`) que rotar.
