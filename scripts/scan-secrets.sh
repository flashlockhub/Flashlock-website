#!/usr/bin/env bash
# Scan the current tree, not old Git history; never emit matched secret values.
set -euo pipefail
umask 077

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
version=8.30.1
case "$(uname -s)/$(uname -m)" in
  Linux/x86_64) platform=linux_x64; checksum=551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb ;;
  Linux/aarch64|Linux/arm64) platform=linux_arm64; checksum=e4a487ee7ccd7d3a7f7ec08657610aa3606637dab924210b3aee62570fb4b080 ;;
  Darwin/arm64) platform=darwin_arm64; checksum=b40ab0ae55c505963e365f271a8d3846efbc170aa17f2607f13df610a9aeb6a5 ;;
  Darwin/x86_64) platform=darwin_x64; checksum=dfe101a4db2255fc85120ac7f3d25e4342c3c20cf749f2c20a18081af1952709 ;;
  *) echo 'Unsupported platform: run this check on Linux/macOS x64 or arm64 (Windows: WSL).' >&2; exit 2 ;;
esac

for dependency in curl tar python3; do
  command -v "$dependency" >/dev/null || { echo "Missing dependency: $dependency" >&2; exit 2; }
done
cache_root="${XDG_CACHE_HOME:-$HOME/.cache}/flashlock-security"
mkdir -p "$cache_root"
archive="$cache_root/gitleaks_${version}_${platform}.tar.gz"
scratch="$(mktemp -d)"
trap 'rm -rf "$scratch"' EXIT

verify_archive() {
  python3 - "$1" "$checksum" <<'PY'
import hashlib, sys
with open(sys.argv[1], 'rb') as archive:
    actual = hashlib.file_digest(archive, 'sha256').hexdigest() if hasattr(hashlib, 'file_digest') else hashlib.sha256(archive.read()).hexdigest()
if actual != sys.argv[2]:
    sys.exit('Gitleaks archive checksum mismatch; refusing to execute it.')
PY
}

if [[ ! -f "$archive" ]]; then
  curl --proto '=https' --tlsv1.2 --fail --silent --show-error --location \
    --connect-timeout 15 --max-time 120 \
    "https://github.com/gitleaks/gitleaks/releases/download/v${version}/gitleaks_${version}_${platform}.tar.gz" \
    --output "$scratch/download.tar.gz"
  verify_archive "$scratch/download.tar.gz"
  mv "$scratch/download.tar.gz" "$archive"
fi
verify_archive "$archive"
# Extract only the verified executable, into a new private directory on every run.
tar -xzf "$archive" -C "$scratch" gitleaks
status=0
"$scratch/gitleaks" dir "$repo_root" --config "$repo_root/.gitleaks.toml" \
  --redact=100 --no-banner --ignore-gitleaks-allow --log-level error \
  --report-format json --report-path "$scratch/report.json" \
  >"$scratch/scanner.log" 2>&1 || status=$?

if [[ "$status" -eq 1 && -f "$scratch/report.json" ]]; then
  # Only identifiers and locations are printed, never matches, snippets or values.
  python3 - "$scratch/report.json" "$repo_root" <<'PY'
import json, os, sys
with open(sys.argv[1]) as report:
    findings = json.load(report)
print(f'Secret scan failed: {len(findings)} finding(s).')
for finding in findings:
    filename = os.path.relpath(finding['File'], sys.argv[2])
    print(f"{filename}:{finding['StartLine']}: {finding['RuleID']}")
PY
elif [[ "$status" -ne 0 ]]; then
  echo "Secret scanner failed (exit $status); no scanner output was published." >&2
else
  echo "Secret scan passed (Gitleaks $version, current tree only)."
fi
exit "$status"
