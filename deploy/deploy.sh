#!/usr/bin/env bash
set -euo pipefail
umask 0027
release_id=${1:?Release ID required}
[[ "$release_id" =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]] || { echo 'Invalid release ID'; exit 1; }
if [[ -s /root/pdfbaba/.env ]]; then
  exec bash "$(dirname "$0")/legacy-deploy.sh" "$release_id"
fi
base=/opt/pdfbaba
exec 9>"$base/deploy.lock"
flock -n 9 || { echo 'Another deployment is running'; exit 1; }
release="$base/releases/$release_id"
archive="$base/incoming/$release_id/release.tar.gz"
[[ -s "$base/shared/.env" ]] || { echo "::error::Missing or empty /opt/pdfbaba/shared/.env. Run deploy/setup.sh on the Droplet and fill the production environment file. See deploy/README.md."; exit 1; }
[[ -r "$base/shared/.env" ]] || { echo "::error::Deployment user cannot read shared/.env. Check its pdfbaba group membership and file permissions."; exit 1; }
[[ -d "$base/releases" && -w "$base/releases" ]] || { echo "::error::Release directory is missing or not writable. Complete deploy/setup.sh and reconnect SSH."; exit 1; }
for directory in uploads filetopdf_uploads sourcecodes; do
  [[ -d "$base/shared/$directory" ]] || { echo "::error::Missing shared/$directory. Complete setup and migrate existing uploads before deploying."; exit 1; }
done
[[ ! -e "$release" ]] || { echo "::error::Release directory already exists: $release. Start a new workflow attempt."; exit 1; }
mkdir "$release"
tar -xzf "$archive" -C "$release"
cd "$release"
ln -s "$base/shared/.env" .env
for directory in uploads filetopdf_uploads sourcecodes; do
  ln -s "$base/shared/$directory" "$directory"
done
npm ci --omit=dev --no-audit --no-fund
previous=
if [[ -L "$base/current" ]]; then
  previous=$(readlink -f "$base/current" || true)
elif [[ -e "$base/current" ]]; then
  echo "Current deployment path must be a symlink; migrate it before deploying."
  exit 1
fi
switched=false
# Invoked indirectly by the EXIT trap.
# shellcheck disable=SC2317
rollback() {
  code=$?
  if [[ "$switched" == true && $code -ne 0 ]]; then
    if [[ -n "$previous" && -d "$previous" ]]; then
      ln -s "$previous" "$base/current.rollback"
      mv -Tf "$base/current.rollback" "$base/current"
      sudo -n /usr/bin/systemctl restart pdfbaba.service
      echo "Deployment failed; restored $previous"
    else
      echo 'First deployment failed; inspect journalctl -u pdfbaba.service.'
    fi
  fi
}
trap rollback EXIT
ln -s "$release" "$base/current.next"
mv -Tf "$base/current.next" "$base/current"
switched=true
sudo -n /usr/bin/systemctl restart pdfbaba.service
for attempt in {1..30}; do
  echo "Health check attempt $attempt/30"
  if curl --fail --silent --max-time 3 http://127.0.0.1:8000/healthz >/dev/null &&
     curl --fail --silent --max-time 5 http://127.0.0.1:8000/ >/dev/null; then
    echo "Deployed $release_id; database and frontend checks passed."
    exit 0
  fi
  sleep 2
done
echo 'Deployment health check failed.'
exit 1
