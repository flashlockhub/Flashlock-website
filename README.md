# FlashLock website

Live site: https://flashlockhub.github.io/Flashlock-website/

The FlashLock Android landing page: short product copy, interactive flashcard demo,
Google Play beta link, privacy page, and the existing medical-student page.

## Local development

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

## Publish an update

```sh
npm run build:pages
git add app lib public scripts next.config.mjs package.json package-lock.json docs
git commit -m "Update FlashLock website"
git push origin main
```

GitHub Pages publishes the committed `docs/` directory on `main`.
`build:pages` sets the project-site URL and base path, builds the static export,
and adds `.nojekyll` so GitHub serves Next's `_next` assets unchanged.
Commit source changes and regenerated `docs/` together. No server, credentials,
or paid services are required for this static website.

`npm run build` also creates a root-path static export in `out/` and `dist/` for
other hosting. Serve those files with a static server; do not use `next start`.
