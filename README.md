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

## Security checks

```sh
npm run security:secrets
npm run security:audit
```

The secret check downloads Gitleaks 8.30.1 from its official release, verifies a
pinned SHA-256 before every run, and scans the current tree (including published
`docs/`) with default detectors plus Android signing-password checks. It excludes
only Git internals, installed dependencies and disposable build output; it never
scans old Git history or prints matched values. Linux/macOS x64/arm64 need Bash,
curl, tar and Python 3; Windows developers can use WSL. A secret finding fails the
check and reports only the detector, filename and line number. Historical leaks
still require separate rotation/remediation; a passing check does not revoke them.

The read-only GitHub Actions workflow runs these checks and builds both static
targets on pull requests, main-branch pushes and weekly. It does not publish the
site. Dependabot proposes npm and GitHub Actions updates; repository-level
Dependabot alerts and branch protection are separate GitHub settings.

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
faces follow the same angle as the mesh. Tap for a 720ms turn, or drag horizontally
to control the angle continuously: pause/reverse without lifting, then release to
settle on the nearest side. Pointer capture keeps a held drag attached outside the
card, cancellation restores the original side, and vertical gestures scroll the
page. Dragging does not rate a card. Rating turns it back for the next question.
The outgoing face retains the old answer so the next answer is not exposed.
No idle animation runs. Model-loading/WebGL failures preserve a CSS flip, and
reduced-motion mode reveals immediately. WebGL resources are disposed on unmount.
The native demo's ratings, speech and Open app action remain in `app/page.js`.
Model provenance and editable CAD source are under `public/models/`.

## Google Play referral labels

Android download links use `androidBetaUrl(campaign)` in `lib/download.js`.
The package and Google Play destination stay the same. Links carry fixed
`utm_source=flashlock.app`, `utm_medium=website` and `utm_campaign` values, both as
query parameters and as a URL-encoded Play `referrer`. There are no visitor IDs,
inbound-query forwarding, cookies, storage, analytics scripts or click beacons.
The website itself does not count clicks. The attribution values are sent to
Google when a visitor follows the link, not in a background request.

| Origin | Campaign |
| --- | --- |
| Homepage download links | `home` |
| Completed homepage demo | `home-demo` |
| Medical page | `medical` |
| Each comparison | Its route slug, e.g. `flashlock-vs-ankiblock` |
| Each guide | `guide-` plus its route slug, e.g. `guide-import-anki-decks` |

These label the page hosting the clicked CTA, not necessarily the visitor's first
landing page or their original search source. Keep them stable when editing copy.
New download CTAs should use the shared helper and an explicit static campaign.
All links on one guide/comparison share a campaign; `home-demo` distinguishes the
demo-completion CTA without collecting its card answers or other interaction data.

In Play Console's store listing reports, filter **Ads and referrals** and
**UTM source = flashlock.app**, then break down by UTM campaign. Keep store-listing
visitors and **Install clicks** separate from successful user acquisitions:
the 2026 listing reports measure intent, not completed installs. Confirm acquired
users in Grow users/Statistics/exports, retaining only the attribution dimensions
actually available in that report. Small campaigns may be grouped under Other;
missing data is not a measured zero. These labels alone do not establish
search-to-install attribution or an end-to-end conversion rate.

Official references checked 30 October 2026:

- [Play Console report definitions and UTM dimensions](https://support.google.com/googleplay/android-developer/answer/9859173?hl=en)
- [Google Play store-listing URL format](https://developer.android.com/distribute/marketing-tools/linking-to-google-play)
- [URL-encoded Play referrer example](https://developer.android.com/games/playgames/user-acquisition?hl=en)

No Android-app analytics or Install Referrer SDK changes are included here, and
delivery of these labels into a live Play Console report still needs a real
referral and the relevant account access. Do not fabricate visits to populate it.

## SEO content and sharing (30 October 2026)

- Keep the 13 existing routes and short homepage. Medical content, import/setup guides and comparisons link to their sources; a local AAB delivery is not proof that a feature is available on Google Play.
- Use `pageMetadata(path, title, description)` from `lib/seo.js` for canonical, Open Graph and Twitter metadata. `public/app/flashlock-share.svg` is the editable, code-native source for the 1200×630 PNG used in previews. Render with the existing Sharp dependency; no external image service is used.
- `Breadcrumbs` derives visible navigation and BreadcrumbList JSON-LD from the same items. Homepage identity markup contains only public organization/site facts, with no fabricated ratings or pricing. Rich results are not guaranteed.
- The four WOFF2 assets are full-glyph conversions of the retained TTFs. Source licenses remain in `public/fonts/`. fontTools 4.68.0 `woff2.compress(source, destination, transform_tables=set())` was used; glyph order, cmap, outlines and layout metrics match the originals. Styles request WOFF2 only; no third-party font calls.
- Sitemap `lastmod` dates reflect actual page changes, not build time. Add new canonical routes deliberately; exclude the custom noindex 404. Keep both deployment-target builds working.
- Search Console indexing and real-user Core Web Vitals require account/field data. Local/mobile lab checks are not evidence of a ranking or field-vitals pass.
