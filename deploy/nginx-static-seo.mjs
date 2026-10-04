import { enablePublicPageIndexes } from './nginx-seo-config.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const [enabled = '/etc/nginx/sites-enabled', backup] = process.argv.slice(2);
if (!backup) throw new Error('Nginx backup directory is required');
fs.mkdirSync(backup, { recursive: true });
let changed = 0;
for (const name of fs.readdirSync(enabled)) {
  const file = fs.realpathSync(path.join(enabled, name));
  const text = fs.readFileSync(file, 'utf8');
  if (!/root\s+\/var\/www\/html\s*;/.test(text)) continue;
  const updated = enablePublicPageIndexes(text);
  if (updated === text) continue;
  const saved = path.join(backup, String(changed));
  fs.writeFileSync(saved, text);
  fs.appendFileSync(path.join(backup, 'manifest.jsonl'), JSON.stringify({ file, saved }) + '\n');
  fs.writeFileSync(file, updated);
  changed++;
}
try {
  execFileSync('nginx', ['-t'], { stdio: 'inherit' });
  if (changed) execFileSync('nginx', ['-s', 'reload'], { stdio: 'inherit' });
} catch (error) {
  restore();
  throw error;
}
console.log('Nginx public-page routing checked; updated configurations: ' + changed);
function restore() {
  const manifest = path.join(backup, 'manifest.jsonl');
  if (!fs.existsSync(manifest)) return;
  for (const line of fs.readFileSync(manifest, 'utf8').trim().split('\n')) {
    if (!line) continue;
    const {file,saved} = JSON.parse(line);
    fs.copyFileSync(saved,file);
  }
}
