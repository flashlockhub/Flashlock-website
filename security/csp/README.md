# FlashLock CSP adapter

Independent Worker flashlock-csp-adapter; existing asset-only flashlock-website is untouched. Publication remains GitHub Pages main:/docs. Same-zone routed fetch reaches that existing TLS-strict origin; no alternate origin, user-selected backend, redirect following, credentials, or request headers are forwarded.

## Security model
A trusted reviewed committed docs export produces a whole-document SHA256 allowlist and per-document inline-script hashes. Runtime checks the complete response before releasing any HTML. It NEVER hashes observed scripts into an allowlist and never adds nonces. Unknown bytes (including inline injection or a new unapproved release) return no-store 503 with script-src none. Email obfuscation is preserved: verification reverses only the exact audited email link/span encoding and one exact external decoder tag, with safe-character checks, then compares the entire canonical document. Returned bytes remain original. This does not allow arbitrary injected inline scripts; tests cover both ordinary and email-obfuscated documents. Existing same-origin external scripts/decoder remain permitted. CSP is not a defense against compromise of trusted same-origin JS.

Bounded HTML: 128KiB, one origin subrequest, at most two native SHA256 operations, about17KiB source+manifest, no KV/storage/write/API service, default free-plan CPU limit (10ms) and memory128MiB. Cloudflare explicitly confirmed this account is Free when rejecting a custom CPU limit; no upgrade was made. Free100,000 requests/day cap applies; route fail-open=false means exhaustion fails closed. Non-HTML streams unbuffered. HTML no-store avoids mismatched cache policy; exact pre-existing17 hashed asset immutable rule remains. Origin fetch cacheTtl0 avoids stale adaptation; no edge cache expansion.

Header transform baseline rule excludes responses stamped by the adapter; cache rule unchanged. The adapter supplies XFO/nosniff/referrer and CSP itself. Report-only mode keeps baseline enforcement; enforcement is a binding change with identical reviewed source+manifest.

## Repeatable publication procedure (required)
1. Build and review the new docs export through normal PR checks. Never generate manifest from arbitrary fetched HTML. Run generator only against intended reviewed origin/main publication (generator checks tracked docs diff); validate no untracked HTML in publication.
2. Before Pages publishes new bytes, generate a manifest from the reviewed release and union the old and new document entries, retaining per-document policies. Upload that reviewed adapter version first. Verify old live Pages still matches. Then publish Pages via normal merge checks.
3. Test all routes, demo, errors, email decode, mobile, headers and injection probe. Remove obsolete manifest entries after cache rollover. New unprepared bytes intentionally503, not weaker CSP. Manifest/source are atomic in Worker upload.
4. Run node security/csp/test.mjs. Changes to the decoder transform require review, not permissive normalization.

Rollback: remove only route whose script is flashlock-csp-adapter; restore original scoped header ruleset from private pre-change snapshot. This returns prior baseline CSP while retaining strictTLS/proxied DNS/cache/mail. Do not delete/overwrite existing flashlock-website. Deployment helper and backups are remote artifacts, not credentials in git.

Normal repository PR checks still apply. Direct authorized infrastructure deployment does not imply PR40 merged or repair the unrelated external Workers Builds integration.
