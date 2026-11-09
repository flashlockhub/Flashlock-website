# Asset-only Workers build

Root wrangler.jsonc targets the existing flashlock-website Worker on workers.dev only. Next.js output: export produces out/ and dist/. Wrangler builds and uploads dist/ without an OpenNext server bundle. Wrangler is pinned exactly; CI tests the same dry run.

Cloudflare Workers & Pages → flashlock-website → Settings → Build:
- Root directory: /
- Build command: empty (Wrangler build.command runs npm run build)
- Deploy command: npx wrangler deploy
- Preserve the existing branch/check integration.

No route/custom domain is configured here. flashlock.app remains GitHub Pages main:/docs behind the independent flashlock-csp-adapter. This build does not regenerate tracked docs/ or deploy the adapter. Do not point this Worker at flashlock.app as a build workaround.

Before Pages publication, changed docs bytes MUST be staged as reviewed old/new trusted manifest entries in the adapter, following security/csp/README.md. Generated dist/ is not automatically trusted by the adapter.

A later authentication failure concerns the named Workers Build token separately: a successful dry run does not prove deployment permission, and AI Search-only permission is not Workers deployment permission. Do not copy credentials.
