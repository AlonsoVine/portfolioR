# Runbook: deploy a Cloudflare Workers

## Trigger normal

```powershell
git commit -m "deploy: <razón>"
git push origin main
```

El workflow `.github/workflows/deploy.yml`:
1. `npm ci` y `npm run build` sin `basePath`, con `NEXT_PUBLIC_SITE_URL=https://alonsovine.com`.
2. `wrangler deploy` publica `out/` según `wrangler.jsonc` (secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`).
3. Publica en GitHub Pages una página que redirige `alonsovine.github.io/portfolioR/*` al dominio.

## Trigger manual

GitHub → Actions → Deploy → Run workflow → branch `main`.

## Probar en local como en producción

```powershell
npm run build
npm run serve:out
```

Abre `http://127.0.0.1:4400/`.

## Cómo verificar tras deploy

1. URL pública: `https://alonsovine.com/` (y que `www.` redirige).
2. Hard refresh (Ctrl+F5).
3. Comprobar:
   - Hero carga con imagen de avatar.
   - Cambio de idioma y de tema.
   - Formulario de contacto envía.
   - `https://alonsovine.com/robots.txt` y `/sitemap.xml` responden.
   - `https://alonsovine.github.io/portfolioR/` redirige al dominio.
4. DevTools Network: ningún 404.

## Rollback

Cloudflare → Workers & Pages → `portfolio` → Deployments → elegir el anterior → Rollback.

O revertir el commit y hacer un nuevo `deploy: revert ...`.

## Si algo está roto

- **El workflow falla en "Deploy to Cloudflare Workers"**: token sin permiso de Workers o `CLOUDFLARE_ACCOUNT_ID` incorrecto.
- **Formulario contacto no envía**: secretos EmailJS no inyectados, o `alonsovine.com` no está en los orígenes permitidos de EmailJS.
- **Página en blanco**: revisar consola; suele ser un client component leyendo `window` en render.
