#!/usr/bin/env bash
set -euo pipefail
[[ $EUID -eq 0 ]] || { echo 'Run with sudo.'; exit 1; }
deploy_user=${1:?Usage: sudo bash deploy/setup.sh SSH_USERNAME}
[[ "$deploy_user" =~ ^[a-zA-Z0-9_-]+$ ]] || exit 1
id "$deploy_user" >/dev/null
[[ $(/usr/bin/node -p 'process.versions.node.split(".")[0]') == 22 ]] || { echo 'Install Node.js 22 at /usr/bin/node first.'; exit 1; }
apt-get update
apt-get install -y nginx curl build-essential python3 certbot python3-certbot-nginx
id pdfbaba >/dev/null 2>&1 || useradd --system --home /opt/pdfbaba --shell /usr/sbin/nologin pdfbaba
install -d -m 2770 -o "$deploy_user" -g pdfbaba /opt/pdfbaba /opt/pdfbaba/releases /opt/pdfbaba/incoming /opt/pdfbaba/shared
usermod -aG pdfbaba "$deploy_user"
for directory in uploads filetopdf_uploads sourcecodes; do
  install -d -m 2770 -o pdfbaba -g pdfbaba "/opt/pdfbaba/shared/$directory"
done
if [[ ! -f /opt/pdfbaba/shared/.env ]]; then
  install -m 640 -o "$deploy_user" -g pdfbaba .env.example /opt/pdfbaba/shared/.env
fi
install -m 644 deploy/pdfbaba.service /etc/systemd/system/pdfbaba.service
printf '%s ALL=(root) NOPASSWD: /usr/bin/systemctl restart pdfbaba.service\n' "$deploy_user" > /etc/sudoers.d/pdfbaba-deploy
chmod 440 /etc/sudoers.d/pdfbaba-deploy
visudo -cf /etc/sudoers.d/pdfbaba-deploy
systemctl daemon-reload
systemctl enable pdfbaba.service
echo 'Fill shared/.env, migrate uploads, configure Nginx, then reconnect SSH. See deploy/README.md.'
