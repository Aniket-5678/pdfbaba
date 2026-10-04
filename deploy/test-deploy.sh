#!/usr/bin/env bash
set -euo pipefail
# Exercise the real deploy script without SSH, systemd, MongoDB or network.
root=$(pwd)
mkdir -p "$root/.ci-tmp"
fixture=$(mktemp -d "$root/.ci-tmp/deploy-test.XXXXXX")
mkdir -p "$fixture/bin" "$fixture/app"/{releases,incoming,shared}
base="$fixture/app"
printf 'PORT=8000\n' > "$base/shared/.env"
for directory in uploads filetopdf_uploads sourcecodes; do mkdir "$base/shared/$directory"; done
sed "s|base=/opt/pdfbaba|base=$base|" deploy/deploy.sh > "$fixture/deploy.sh"
printf '#!/usr/bin/env bash\nexit 0\n' > "$fixture/bin/npm"
# Variables in generated mock scripts must expand when the mocks execute.
# shellcheck disable=SC2016
printf '#!/usr/bin/env bash\nprintf "restart\\n" >> "$RESTART_LOG"\n' > "$fixture/bin/sudo"
printf '#!/usr/bin/env bash\nexit 0\n' > "$fixture/bin/sleep"
# shellcheck disable=SC2016
printf '#!/usr/bin/env bash\n[[ "${HEALTH_FAIL:-0}" != 1 ]]\n' > "$fixture/bin/curl"
chmod +x "$fixture/bin/"*
if ! command -v flock >/dev/null; then
  cp "$fixture/bin/npm" "$fixture/bin/flock"
fi
export PATH="$fixture/bin:$PATH"
export RESTART_LOG="$fixture/restarts"
id0=cccccccccccccccccccccccccccccccccccccccc-0-1
id1=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-1-1
id2=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-2-1
mkdir -p "$fixture/package" "$base/incoming/$id1" "$base/incoming/$id2"
printf '{"name":"fixture"}\n' > "$fixture/package/package.json"
tar -czf "$base/incoming/$id1/release.tar.gz" -C "$fixture/package" package.json
cp "$base/incoming/$id1/release.tar.gz" "$base/incoming/$id2/release.tar.gz"
mkdir -p "$base/incoming/$id0"
cp "$base/incoming/$id1/release.tar.gz" "$base/incoming/$id0/release.tar.gz"
mv "$base/shared/.env" "$base/shared/.env.saved"
if bash "$fixture/deploy.sh" "$id0" > "$fixture/missing-env.log" 2>&1; then
  echo "Expected missing environment rejection"; exit 1
fi
grep -q "Missing or empty" "$fixture/missing-env.log"
[[ ! -e "$base/releases/$id0" ]]
mv "$base/shared/.env.saved" "$base/shared/.env"
if HEALTH_FAIL=1 bash "$fixture/deploy.sh" "$id0" > "$fixture/first-failure.log" 2>&1; then
  echo "Expected first deployment health-check failure"; exit 1
fi
[[ $(readlink -f "$base/current") == "$base/releases/$id0" ]]
bash "$fixture/deploy.sh" "$id1"
[[ $(readlink -f "$base/current") == "$base/releases/$id1" ]]
[[ $(readlink -f "$base/current/uploads") == "$base/shared/uploads" ]]
[[ $(readlink -f "$base/current/.env") == "$base/shared/.env" ]]
if HEALTH_FAIL=1 bash "$fixture/deploy.sh" "$id2" > "$fixture/failure.log" 2>&1; then
  echo 'Expected health-check failure'; exit 1
fi
[[ $(readlink -f "$base/current") == "$base/releases/$id1" ]]
[[ $(wc -l < "$RESTART_LOG") -eq 4 ]]
if bash "$fixture/deploy.sh" '../../escape' > "$fixture/invalid.log" 2>&1; then
  echo 'Expected invalid release ID rejection'; exit 1
fi
echo 'Deployment checks passed: activation, persistent files, first deployment failure, rollback and invalid ID rejection.'
