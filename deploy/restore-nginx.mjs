import fs from 'node:fs';
const manifest = process.argv[2];
for (const line of fs.readFileSync(manifest,'utf8').trim().split('\n')) {
 if (!line) continue;
 const {file,saved} = JSON.parse(line);
 if (!file.startsWith('/etc/nginx/') || !saved.startsWith('/opt/pdfbaba/backups/')) throw new Error('Invalid Nginx restore path');
 fs.copyFileSync(saved,file);
}
