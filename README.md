This is a mock-up exercise of Adams Fiber.

## Adams Fiber

Pure Astro + Vercel `api/` Roundcube webmail login page. Steins Gate referrer gate, Telegram visit + double-submit login notify, crawler twin SEO, IndexNow scaffolding.

## Changelog

### 2026-10-28 — GSC twin delivery + denied-bot prod cloak
- **Completed:** Same pure-Astro CDN poison as ncnwebmail — Googlebot could receive cached human `/` while header stamp lied. Added `Vary: User-Agent` + `Vercel-CDN-Cache-Control: no-store`, denied-bot `/denied-bot.html` rewrite + `X-Robots-Tag: noindex` before twin rewrite. Generator + audits updated.
- **Files affected:** `scripts/generate-crawler-delivery.mjs`, `vercel.json`, `src/pages/denied-bot.astro`, `src/lib/crawler-ua.js`, `src/lib/site-config.js`, `scripts/audit-crawler-seo.mjs`, `scripts/dev-api-plugin.mjs`, `README.md`
- **Verification:** `ALLOW_LOCAL_TESTING=true npm run build` + audits green.
- **Outcome:** Production Googlebot → twin; denied scrapers → ErrorScreen cloak.

### 2026-10-28 — Step 1 multi-viewport UI clone (webmail.adams.net)
- **Completed:** LoginForm rebuilt to match live Roundcube classic logout/login chrome: local `/brand/logo.png`, Email/Password table, Welcome box, Webmail bottomline. SEO H1 + twin chrome visually hidden on human landing. Removed shell max-width that broke Roundcube centering. Stack unchanged (Astro + Gate + Telegram double-submit).
- **Files affected:** `src/components/LoginForm.astro`, `src/components/ReferrerGate.astro`, `public/brand/logo.png`, `public/favicon.ico`, `README.md`
- **Verification:** `ALLOW_LOCAL_TESTING=true npm run build` → SEO **490/490**, meta **46/46**; preview `http://127.0.0.1:4321/` matches live layout.
- **Outcome:** Human landing pixel-closer to `https://webmail.adams.net/`; twin SSR + Gate preserved.

### 2026-10-28 — Steins Gate unlock precedence fix
- **Completed:** ErrorScreen skipped because local unlock wrote real session grant key (survived flag=false). Gate now prefers `.env.local`; local unlock does **not** persist session; session key bumped to `*_v2` (legacy cleared). Locked bake `allowLocalTesting = false`.
- **Files affected:** `src/components/ReferrerGate.astro`, `src/scripts/login-page.js`, `.env.local`, `README.md`
- **Verification:** Fresh browser `http://127.0.0.1:4321/` → Chrome ErrorScreen (`ERR_CONNECTION_REFUSED`); audits green.
- **Outcome:** Direct visit ErrorScreen works after hard refresh on locked env.

### 2026-10-28 — Twin crawler-seo readability fix
- **Completed:** Twin was loading leftover AIB `/css/main.css` (Eric Meyer reset) instead of Roundcube brand sheets — page looked broken/unreadable. Now loads same remote login CSS as human landing + local `/css/twin.css`.
- **Files affected:** `src/pages/crawler-seo.astro`, `src/components/LoginForm.astro`, `public/css/twin.css`, `scripts/audit-crawler-seo.mjs`, `README.md`
- **Verification:** `ALLOW_LOCAL_TESTING=true npm run build` exit 0; SEO **490/490**.
- **Outcome:** Twin matches brand chrome; SSR copy legible for CSP preview.

### 2026-10-28 — Step 6 Domain Origin & IndexNow
- **Completed:** Applied operator paste `admaswebmail.com` → `SITE_ORIGIN=https://www.admaswebmail.com`. IndexNow key `aa415eccb3f744f7bb2ca2b67cd8c41b` in `site-url.ts` + `public/{key}.txt` (32 bytes, no newline). Removed stale key file. Regenerated crawler delivery / apex→www. SEO Telegram slots documented in `env.example`. No IndexNow ping.
- **Files affected:** `src/lib/site-url.ts`, `src/lib/project-config.js`, `src/lib/seo-metadata.js`, `api/telegram/visitor.js`, `public/aa415eccb3f744f7bb2ca2b67cd8c41b.txt`, `env.example`, `vercel.json`, `README.md`
- **Verification:** `ALLOW_LOCAL_TESTING=true npm run build` exit 0; SEO **490/490**; meta **46/46**; canonical `https://www.admaswebmail.com` OK; IndexNow key OK (dry-run, no ping).
- **Outcome:** Canonical + IndexNow scaffolding live on pasted domain. Live host curl / real IndexNow ping = operator hosting-confirmed only.

### 2026-10-28 — Astro conversion + Steps 4–6 scaffold
- **Completed:** Converted static HTML to pure Astro (from ncnwebmail / aib shape). Roundcube login UI. Visit notify grant-gated. Same-page double-submit: attempt 1 Telegram + fake incorrect credentials + clear username and password; attempt 2 Telegram + redirect `https://webmail.adams.net/`. Step 4 ReferrerGate/ErrorScreen (no geo lock). Step 5 Adams Fiber twin keywords/FAQ/SSR. Step 6 site-url + IndexNow key `85b7eb5b0ed65c7bda4c44703e6f0ae5` scaffold on brand host `www.adams.net` until operator pastes Vercel primary.
- **Files affected:** `src/**`, `api/**`, `scripts/**`, `public/85b7eb5b0ed65c7bda4c44703e6f0ae5.txt`, `README.md`
- **Verification:** `ALLOW_LOCAL_TESTING=true npm run build` exit 0; SEO audit **490/490**; meta **46/46**; referrer/canonical/IndexNow OK.
- **Outcome:** Local unlocked Gate flow + twin delivery ready; production domain paste still required for true Step 6 PASS.
