# DigitalOcean Droplet deployment

## Pipeline

Pull requests run backend syntax checks, Bash/ShellCheck validation and the React production build. Main pushes and manual runs on main deploy that exact build via SSH. Frontend builds happen on GitHub, not the small Droplet. Node.js 22 is required on both runner and server.

The release includes code and frontend assets only. Database data, environment secrets and uploaded files are never packaged. Upload directories and .env live in /opt/pdfbaba/shared. Each deployment installs locked production dependencies, switches the current symlink, restarts systemd and checks MongoDB readiness plus the frontend. Failed health checks restore the previous release. A short restart interruption is expected. Releases are retained for manual rollback; monitor disk usage and remove only unused old releases/incoming archives.

Existing CRA warnings are printed, but do not fail the build. Production source maps are disabled to reduce build memory and avoid publishing source code. The repository's default frontend test still expects the starter “learn react” link; it is not a valid application test and is not used by this workflow.

## GitHub secrets

Under Settings > Secrets and variables > Actions set:

| Secret | Value |
| --- | --- |
| DO_HOST | 159.65.157.186 |
| DO_PORT | SSH port, normally 22 |
| DO_USERNAME | Existing deployment SSH user |
| DO_SSH_KEY | Complete unencrypted private key whose public key is authorized on the Droplet |
| DO_KNOWN_HOSTS | Verified SSH host key line(s) for the host and port |

The screenshot already shows the first four names. Secret values cannot be read back from GitHub. Add DO_KNOWN_HOSTS: obtain the host fingerprint from the trusted DigitalOcean console (ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub), then compare it with ssh-keyscan output before saving that output as the secret. For nonstandard ports the line must use [159.65.157.186]:PORT. Do not disable host verification.

The deploy job uses the production GitHub environment. Create it if needed; configure reviewers only if you want a manual deployment gate.

## One-time server setup (Ubuntu 22.04/24.04)

Use the DigitalOcean console or trusted SSH connection. Back up your existing app, uploads and Nginx config first. Install Node.js 22 system-wide from a trusted package source such as the NodeSource Debian packages (https://github.com/nodesource/distributions); verify /usr/bin/node and npm are available. Do not rely on an interactive nvm profile for systemd.

Copy/clone this repository to a setup directory, then run from its root:

    sudo bash deploy/setup.sh YOUR_SSH_USERNAME

This installs Nginx/build tools/Certbot, creates an unprivileged pdfbaba service user, shared folders and a narrowly scoped sudo restart permission. Reconnect SSH after setup so the deployment user's group membership takes effect.

Fill /opt/pdfbaba/shared/.env using .env.example; keep PORT=8000 and HOST=127.0.0.1 to match Nginx and deployment checks. Use your real MongoDB URI, JWT and payment/mail credentials. Allow the Droplet IP in MongoDB Atlas networking when applicable. Never commit credentials.

Migrate the contents of your existing uploads, filetopdf_uploads and sourcecodes into their matching shared directories BEFORE the first deployment. Keep ownership/group pdfbaba and directory group-write access, so both service and deployment user can use the files. This deployment deliberately does not copy repository user uploads.

Review deploy/nginx.conf and choose the actual domain. The screenshots show codebricket.com while current app SEO/CORS uses pdf-baba.com. For codebricket.com, update app canonical URLs/CORS and client sitemap/robots as a separate domain migration before launch. DNS alone does not update app SEO.

Install the reviewed config:

    sudo cp deploy/nginx.conf /etc/nginx/sites-available/pdfbaba
    sudo ln -s /etc/nginx/sites-available/pdfbaba /etc/nginx/sites-enabled/pdfbaba
    sudo nginx -t
    sudo systemctl reload nginx

Resolve any existing conflicting server block/default site before reloading. Permit inbound SSH, HTTP and HTTPS in the Droplet/cloud firewall; do not expose port 8000 publicly. When replacing an existing app on port 8000, stop its old process manager before activating this service.

Push main or run the workflow manually after setup. After the first healthy deployment and DNS propagation, enable HTTPS:

    sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN
    sudo certbot renew --dry-run

## Verify and troubleshoot

    curl --fail http://127.0.0.1:8000/healthz
    sudo systemctl status pdfbaba.service
    sudo journalctl -u pdfbaba.service -n 100 --no-pager

Also check the public HTTPS homepage, login, PDF upload/download and payment flow. /healthz returns 503 until MongoDB connects; a bad MongoDB URI or Atlas allowlist prevents successful deployment.

To roll back manually, select a retained release directory, repoint /opt/pdfbaba/current using a temporary symlink and mv -Tf, then restart pdfbaba.service and rerun health checks. The first ever deployment has no previous release to restore.

References: [GitHub artifacts](https://docs.github.com/actions/configuring-and-managing-workflows/persisting-workflow-data-using-artifacts) and [DigitalOcean systemd/Nginx deployment](https://www.digitalocean.com/community/tutorials/how-to-deploy-node-js-applications-using-systemd-and-nginx).
