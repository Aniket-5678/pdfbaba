#!/usr/bin/env bash
set -euo pipefail
root=$(pwd)
mkdir -p "$root/.ci-tmp"
fixture=$(mktemp -d "$root/.ci-tmp/legacy-test.XXXXXX")
mkdir -p "$fixture/bin" "$fixture/app/node_modules" "$fixture/frontend" "$fixture/base/incoming"
mkdir -p "$fixture/app/uploads" "$fixture/frontend/.well-known"
printf 'PORT=8000\nJWT_SECRET=fixture-only\n' > "$fixture/app/.env"
printf 'old backend\n' > "$fixture/app/index.js"
printf 'old frontend\n' > "$fixture/frontend/index.html"
printf 'user data\n' > "$fixture/app/uploads/keep.pdf"
printf 'challenge\n' > "$fixture/frontend/.well-known/keep"
sed -e "s|base=/opt/pdfbaba|base=$fixture/base|" -e "s|app=/root/pdfbaba|app=$fixture/app|" -e "s|frontend=/var/www/html|frontend=$fixture/frontend|" deploy/legacy-deploy.sh > "$fixture/deploy.sh"
# Mock external services; rsync and symlink operations are real on Linux.
# shellcheck disable=SC2016
printf '#!/usr/bin/env bash\nln -s "$REPO_NODE_MODULES" node_modules\n' > "$fixture/bin/npm"
# shellcheck disable=SC2016
printf '#!/usr/bin/env bash\nif [[ "$1" == jlist ]]; then cat "$PM2_FIXTURE"; else printf "%%s\\n" "$*" >> "$PM2_LOG"; fi\n' > "$fixture/bin/pm2"
# shellcheck disable=SC2016
printf '#!/usr/bin/env bash\n[[ "${HEALTH_FAIL:-0}" != 1 ]]\n' > "$fixture/bin/curl"
printf '#!/usr/bin/env bash\nexit 0\n' > "$fixture/bin/sleep"
cp "$fixture/bin/sleep" "$fixture/bin/nginx"
chmod +x "$fixture/bin/"*
export PATH="$fixture/bin:$PATH"
export REPO_NODE_MODULES="$root/node_modules"
export PM2_FIXTURE="$fixture/processes.json"
export PM2_LOG="$fixture/pm2.log"
printf '[{"pm_id":7,"pm2_env":{"pm_exec_path":"%s/index.js","watch":false,"PORT":"8000"}}]\n' "$fixture/app" > "$PM2_FIXTURE"
id1=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-1-1
id2=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-2-1
mkdir -p "$fixture/package/deploy" "$fixture/package/client/build" "$fixture/base/incoming/$id1" "$fixture/base/incoming/$id2"
cp deploy/pm2-target.mjs "$fixture/package/deploy/"
printf 'new backend\n' > "$fixture/package/index.js"
printf 'new frontend\n' > "$fixture/package/client/build/index.html"
printf '{"name":"fixture"}\n' > "$fixture/package/package.json"
tar -czf "$fixture/base/incoming/$id1/release.tar.gz" -C "$fixture/package" .
printf 'bad backend\n' > "$fixture/package/index.js"
printf 'bad frontend\n' > "$fixture/package/client/build/index.html"
tar -czf "$fixture/base/incoming/$id2/release.tar.gz" -C "$fixture/package" .
bash "$fixture/deploy.sh" "$id1"
[[ $(cat "$fixture/app/index.js") == 'new backend' ]]
[[ $(cat "$fixture/frontend/index.html") == 'new frontend' ]]
[[ $(cat "$fixture/app/uploads/keep.pdf") == 'user data' ]]
[[ $(cat "$fixture/frontend/.well-known/keep") == 'challenge' ]]
grep -q 'JWT_SECRET=fixture-only' "$fixture/app/.env"
if HEALTH_FAIL=1 bash "$fixture/deploy.sh" "$id2" > "$fixture/rollback.log" 2>&1; then
  echo 'Expected failed health check'; exit 1
fi
grep -q 'previous app restored' "$fixture/rollback.log"
[[ $(readlink "$fixture/app/node_modules") == "$fixture/base/releases/$id1/node_modules" ]]
[[ $(cat "$fixture/app/index.js") == 'new backend' ]]
[[ $(cat "$fixture/frontend/index.html") == 'new frontend' ]]
[[ $(cat "$fixture/app/uploads/keep.pdf") == 'user data' ]]
echo 'Existing PM2 deployment tests passed: activation, protected data, frontend publication and rollback.'
