# Runbook: deploy a GitHub Pages

## Trigger normal

```powershell
git commit -m "deploy: <razón>"
git push origin main
```

El workflow `.github/workflows/deploy.yml`:
1. `npm ci`
2. `npm run build` con `NEXT_PUBLIC_BASE_PATH=/portfolioR`
3. Sube `out/` como artefacto
4. Despliega a Pages con `.nojekyll`

## Trigger manual

GitHub → Actions → Deploy → Run workflow → branch `main`.

## Cómo verificar tras deploy

1. URL pública: `https://alonsovine.github.io/portfolioR/`
2. Hard refresh (Ctrl+F5).
3. Comprobar:
   - Hero carga con imagen de avatar.
   - Logo del header se ve (test de `basePath`).
   - Cambio de idioma funciona.
   - Cambio de tema funciona y persiste.
   - Modal de certificados abre.
4. DevTools Network: ningún 404 en `/portfolioR/...`.

## Rollback

GitHub → Settings → Pages → "Visit site history" → restablecer al deploy anterior.

O revertir el commit `deploy:` y hacer un nuevo `deploy: revert ...`.

## Si algo está roto

- **404 en imágenes**: falta prefijo `NEXT_PUBLIC_BASE_PATH`. Buscar `src="/images/...` sin prefijo.
- **Página en blanco**: revisar consola; suele ser un client component intentando leer `window` en render.
- **Formulario contacto no envía**: variables EmailJS no inyectadas en build. Verificar secretos en el workflow.
