#!/usr/bin/env bash
set -euo pipefail
umask 0022
release_id=${1:?Release ID required}
[[ "$release_id" =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]] || exit 1
base=/opt/pdfbaba
app=/root/pdfbaba
frontend=/var/www/html
# Load an existing root nvm installation when PM2 is not on the SSH PATH.
if ! command -v pm2 >/dev/null && [[ -s /root/.nvm/nvm.sh ]]; then
  # shellcheck disable=SC1091
  source /root/.nvm/nvm.sh
fi
fail() { echo "::error::$*" >&2; exit 1; }
for command in node npm pm2 rsync curl flock nginx; do
  command -v "$command" >/dev/null || fail "Required server command missing: $command"
done
[[ -s "$app/.env" && -r "$app/.env" ]] || fail "Production environment file missing or unreadable: $app/.env"
[[ -w "$app" && -d "$frontend" && -w "$frontend" ]] || fail "SSH deployment user needs write access to the existing app and Nginx frontend directory."
nginx -t
exec 9>"$base/deploy.lock"
flock -n 9 || fail 'Another deployment is running.'
release="$base/releases/$release_id"
backup="$base/backups/$release_id"
[[ ! -e "$release" && ! -e "$backup" ]] || fail 'Release already exists; start a new workflow attempt.'
mkdir -p "$release" "$backup/app" "$backup/frontend"
chmod 700 "$base/backups" "$backup"
tar -xzf "$base/incoming/$release_id/release.tar.gz" -C "$release"
cd "$release"
echo "Installing production dependencies with $(node --version)."
npm ci --omit=dev --no-audit --no-fund
metadata=$(pm2 jlist | node deploy/pm2-target.mjs "$app/index.js" "$app/.env")
read -r pm2_id port <<< "$metadata"
[[ "$pm2_id" =~ ^[0-9]+$ && "$port" =~ ^[0-9]+$ ]] || fail 'Cannot identify the existing PM2 backend.'
# Never copy or overwrite credentials, uploaded data or repository metadata.
excludes=(--exclude=.env --exclude='.env.*' --exclude=.git --exclude=node_modules
  --exclude=uploads --exclude=filetopdf_uploads --exclude=sourcecodes
  --exclude=client/node_modules --exclude=.well-known --exclude='google*.html')
rsync -ac "${excludes[@]}" "$app/" "$backup/app/"
rsync -ac --exclude=.well-known --exclude='google*.html' "$frontend/" "$backup/frontend/"
[[ -e "$app/node_modules" || -L "$app/node_modules" ]] || fail 'Existing backend node_modules is missing.'
switched=false
modules_moved=false
# Called by EXIT trap, including failures during activation.
# shellcheck disable=SC2317
rollback() {
  code=$?
  if [[ "$switched" == true && $code -ne 0 ]]; then
    echo 'Restoring the previous backend and frontend.'
    if ! rsync -ac --delete "${excludes[@]}" "$backup/app/" "$app/"; then
      echo "::error::Backend rollback copy failed. Backup: $backup"; return 1
    fi
    if [[ "$modules_moved" == true ]]; then
      if [[ -L "$app/node_modules" ]]; then unlink "$app/node_modules"; fi
      mv "$backup/node_modules" "$app/node_modules"
    fi
    rsync -ac --delete --exclude=.well-known --exclude='google*.html' "$backup/frontend/" "$frontend/"
    if [[ -f "$backup/nginx/manifest.jsonl" ]]; then
      node "$release/deploy/restore-nginx.mjs" "$backup/nginx/manifest.jsonl"
      nginx -t && nginx -s reload
    fi
    NODE_ENV=production pm2 restart "$pm2_id" --update-env
    pm2 save
    echo "::error::Deployment failed; previous app restored. Backup: $backup"
  fi
}
trap rollback EXIT
switched=true
# Restart only the identified backend, keeping its name, script and cwd.
pm2 stop "$pm2_id"
mv "$app/node_modules" "$backup/node_modules"
modules_moved=true
ln -s "$release/node_modules" "$app/node_modules"
rsync -ac "${excludes[@]}" "$release/" "$app/"
if [[ -f "$release/deploy/removed-files.txt" ]]; then
  app_real=$(realpath "$app")
  while IFS= read -r relative; do
    [[ -n "$relative" ]] || continue
    [[ "$relative" == *.js && "$relative" != /* && "$relative" != *..* ]] || fail "Invalid removed-file entry"
    target=$(realpath -m "$app/$relative")
    [[ "$target" == "$app_real/"* ]] || fail "Removed file escapes app directory"
    rm -f -- "$target"
  done < "$release/deploy/removed-files.txt"
fi
NODE_ENV=production pm2 restart "$pm2_id" --update-env
ready=false
for attempt in {1..30}; do
  echo "Backend readiness check $attempt/30"
  if curl --fail --silent --max-time 3 "http://127.0.0.1:$port/healthz" >/dev/null; then
    ready=true; break
  fi
  sleep 2
done
[[ "$ready" == true ]] || fail 'New backend did not become healthy; restoring the previous deployment.'
if [[ -f "$release/scripts/prerender-seo.mjs" ]]; then
  node "$release/scripts/prerender-seo.mjs" "$release/client/build" "http://127.0.0.1:$port/api/v1/sourcecode"
fi
rsync -ac --delete --exclude=.well-known --exclude='google*.html' "$release/client/build/" "$frontend/"
cmp "$release/client/build/index.html" "$frontend/index.html" || fail 'Frontend publication verification failed.'
curl --fail --silent --max-time 5 "http://127.0.0.1:$port/" >/dev/null || fail 'Backend frontend response check failed.'
if [[ -f "$release/deploy/nginx-static-seo.mjs" ]]; then
  node "$release/deploy/nginx-static-seo.mjs" /etc/nginx/sites-enabled "$backup/nginx"
fi
pm2 save
echo "Deployed $release_id using the existing PM2 backend and Nginx frontend."
echo "Previous release backup: $backup"
