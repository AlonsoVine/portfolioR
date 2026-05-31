# Feature 02 — Analítica del portfolio

- **Estado**: Deferred
- **Owner humano**: Alonso Viñé
- **Fecha creación**: 2026-05-31
- **Esfuerzo estimado**: 30-60 min (según opción)
- **Impacto**: ⭐⭐⭐
- **Dificultad**: 🟢

## 1. Problema

No hay forma de medir visitas, fuentes de tráfico, dispositivos o secciones más vistas. Sin datos, las decisiones futuras de contenido/UX son a ciegas.

## 2. Por qué está diferida

La decisión depende de un cambio mayor pendiente:

- Si el portfolio se queda en **GitHub Pages** → instalar **Cloudflare Web Analytics** (gratis, sin cookies, 1 script tag).
- Si se migra a **Vercel** (necesario si se monta el chatbot IA — Feature 03 cuando se cree) → usar **Vercel Analytics** nativo (gratis, integrado, cero setup adicional).

Implementar Cloudflare ahora y migrar a Vercel después significa tocarlo dos veces. Mejor decidir la plataforma primero.

## 3. Opciones evaluadas

| Opción | Coste | Privacy | Setup | Notas |
|---|---|---|---|---|
| Cloudflare Web Analytics | Gratis | Sin cookies | 1 script | Mejor para GitHub Pages |
| Vercel Analytics | Gratis hobby tier | Sin cookies | Nativo | Mejor si migramos a Vercel |
| GoatCounter | Gratis personal | Sin cookies | 1 script | Alternativa simple |
| Plausible | ~9 €/mes | Sin cookies | 1 script | El más bonito, pago |
| Google Analytics 4 | Gratis | Cookies + banner | GTM | Descartado: invasivo |

## 4. Decisión tomada

**Diferir** hasta que se confirme la migración a Vercel (driver: chatbot IA).

Si pasan más de 2 meses sin movimiento en la migración, revisitar y montar **Cloudflare Web Analytics** como solución interim.

## 5. Criterios de aceptación (cuando se ejecute)

- [ ] Dashboard accesible solo por el owner.
- [ ] Métricas mínimas: pageviews, visitantes únicos, países, referrers, top pages.
- [ ] Sin cookies (sin banner GDPR).
- [ ] Sin impacto visible en Lighthouse Performance (< 10 KB de script, async).
- [ ] Documentado en `docs/runbooks/analytics.md` cómo acceder al dashboard.

## 6. Referencias

- [Cloudflare Web Analytics docs](https://developers.cloudflare.com/web-analytics/)
- [Vercel Analytics docs](https://vercel.com/docs/analytics)
- MEJORAS.md #29 (analítica privacy-friendly)
