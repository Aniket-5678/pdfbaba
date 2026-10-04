import test from 'node:test';
import assert from 'node:assert/strict';
import { enablePublicPageIndexes } from '../deploy/nginx-seo-config.mjs';
test('Nginx serves per-route indexes and preserves API/TLS configuration',()=>{
const before='server { root /var/www/html; ssl_certificate /etc/letsencrypt/live/codebricket.com/fullchain.pem; location / { try_files $uri /index.html; } location /api/ { proxy_pass http://127.0.0.1:8000; } }';
const after=enablePublicPageIndexes(before);
assert.equal(after,before.replace('try_files $uri /index.html;','try_files $uri $uri/ /index.html;'));
assert.equal(enablePublicPageIndexes(after),after);
assert.equal(enablePublicPageIndexes(before.replace('/var/www/html','/var/www/another-site')),before.replace('/var/www/html','/var/www/another-site'));
});
