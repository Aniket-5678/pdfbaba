import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
function check(path) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const file = join(path, entry.name);
    if (entry.isDirectory()) check(file);
    else if (/\.(js|mjs)$/.test(file)) execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  }
}
execFileSync(process.execPath, ['--check', 'index.js'], { stdio: 'inherit' });
for (const dir of ['controllers','db','helper','middlewear','models','routes','scripts']) check(dir);
console.log('Backend syntax checks passed.');
