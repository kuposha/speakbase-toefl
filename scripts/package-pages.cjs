const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
fs.mkdirSync(output, {recursive:true});
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const assets = Array.from(html.matchAll(/(?:src|href)="([^"]+)"/g), match => match[1].split(/[?#]/, 1)[0])
  .filter(file => !file.startsWith('https://'));
for (const file of ['index.html', ...assets, 'audio', 'vendor/LICENSE-supabase']) {
  if (path.isAbsolute(file) || file.includes('..')) throw Error('Invalid asset: ' + file);
  const target = path.join(output, file);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.cpSync(path.join(root, file), target, {recursive:true});
}
