# Cloudflare edge baseline — 2026-11-09

Status: **partial protection**, not full CSP. PR39 remains the published application.

Full(strict) TLS and active universal apex/wildcard certificate verified; four apex A records and www CNAME proxied. Mail/unrelated DNS unchanged. Scoped response headers: XFO DENY, nosniff, strict-origin-when-cross-origin, and CSP `frame-ancestors 'none'; object-src 'none'; base-uri 'none'`.

Immutable browser caching is restricted to an exact allowlist of 17 content-fingerprinted JS/CSS chunk paths and HTTP200. No HTML, API, private, unversioned asset, build-ID manifest or error caching broadened. Future chunk hashes are not automatically immutable; refresh the exact allowlist through reviewed deployment, or implement a verified build-synchronized adapter.

## Full CSP remains incomplete
The restrictive default-src none candidate was temporarily staged report-only with exact inline hashes, no unsafe-inline or unsafe-eval for scripts. 44 live route/viewport cases passed with no CSP events/page errors, working demo and disabled signup. The union contains 51 unique hashes; prior 95 count includes route occurrences. Temporary report-only header removed after testing rather than leave a stale fixed policy. Enforced baseline does not restrict script/default sources.

Full enforcement needs reviewed response-synchronized policy delivery. A Worker could compute exact script hashes from returned HTML and emit its matching header. Existing account Workers Scripts Read/Edit plus zone Workers Routes Read/Edit would be needed; route reads currently return403. No Worker/purchase/account created. An alternative is reviewed build-injected per-document CSP metadata plus edge frame-ancestors, with different limitations; neither adapter is deployed. Do not enforce a static union or relax script CSP.

## Verification and rollback
Run `python3 scripts/check-edge-baseline.py`; `REQUIRE_FULL_CSP=1` intentionally fails until restrictive default/script response directives exist. Uses curl because the existing browser-integrity configuration can reject Python urllib. Broad browser tests are also required. Existing strict byte-equality check is unchanged: Cloudflare email obfuscation (already enabled) rewrites five HTML routes and adds a same-origin decoder script. Preserve that unrelated setting; these differences are not source drift.

Credential remains on original host and is never committed. Private before/after snapshots reside in untracked artifacts/audit there. Rollback: delete only the newly created response ruleset, restore five saved web DNS records to proxied=false TTL300, and restore prior SSL full. Preserve managed rules and mail records. All repository changes use normal PR/required checks.
