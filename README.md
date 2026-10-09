# FlashLock website

Existing GitHub Pages address: https://flashlockhub.github.io/Flashlock-website/

Custom-domain target: https://flashlock.app/ (requires the domain's DNS and
GitHub Pages custom-domain configuration; building alone does not make it live).

The FlashLock Android landing page: short product copy, interactive flashcard demo,
Google Play beta link, privacy page, and the existing medical-student page.

The interactive demo follows the Android study screen: tap or swipe sideways to
reveal, choose a rating, then explicitly open the example app. It is a sample
deck, not a connection to the installed app. Pencil/trash artwork is illustrative;
speech uses browser support, and feedback sound starts muted. Roboto is bundled
locally under the Apache 2.0 license in `public/fonts/ROBOTO-LICENSE.txt`.

## Local development

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

## Build for the deployment target

Both targets generate a static export in `out/` and `dist/`, then replace `docs/`
with the files GitHub Pages publishes. They explicitly set the URL and base path
so shell environment variables cannot accidentally select the wrong target.

### Custom domain: flashlock.app

```sh
npm run build:domain
```

This uses root paths and `https://flashlock.app/` canonical/Open Graph URLs. It
regenerates `docs/CNAME` containing `flashlock.app` on every build, plus
`docs/.nojekyll`. Publish this target only when the domain is ready to be connected
to this repository in GitHub Pages and its DNS points to the Pages host. DNS and
GitHub settings are separate infrastructure changes; the build does not perform them.

### Fallback: GitHub project URL

```sh
npm run build:pages
```

This uses `/Flashlock-website` paths and
`https://flashlockhub.github.io/Flashlock-website/` canonical/Open Graph URLs.
It recreates `docs/` without a `CNAME`, removing a previous domain-build marker.
If switching a live custom-domain deployment back, also remove the custom domain
in GitHub Pages settings; rebuilding alone does not change those settings.

## Publish the selected build

Build the intended target above, review the regenerated files, then:

```sh
git add app lib public scripts next.config.mjs package.json package-lock.json README.md docs
git commit -m "Update FlashLock website"
git push origin main
```

GitHub Pages publishes the committed `docs/` directory on `main`.
Both build targets add `.nojekyll` so GitHub serves Next's `_next` assets unchanged.
Commit source changes and regenerated `docs/` together. No server, credentials,
or paid services are required for this static website.

`npm run build` creates `out/` and `dist/` only; it does not refresh `docs/` or add
deployment markers. Serve static files with a static server; do not use `next start`.

## Zoo 3D study card

`app/FlipCard.js` loads the local Zoo-generated `public/models/flashcard.glb`
using a dynamically imported Three.js renderer. Accessible HTML question/answer
faces follow the same 720ms turn. Rating turns the card back for the next question.
The outgoing face retains the old answer so the next answer is not exposed.
No idle animation runs. Model-loading/WebGL failures preserve a CSS flip, and
reduced-motion mode reveals immediately. WebGL resources are disposed on unmount.
The native demo's ratings, speech and Open app action remain in `app/page.js`.
Model provenance and editable CAD source are under `public/models/`.
