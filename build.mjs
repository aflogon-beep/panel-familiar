// Build del panel familiar: src/ -> dist/index.html (un único HTML autocontenido)
//   node build.mjs          -> dist/index.html (minificado) + dist/dev.html (legible)
//   node build.mjs --dev    -> solo dist/dev.html
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { transformSync } from 'esbuild';

const root = path.dirname(new URL(import.meta.url).pathname);
const src = p => path.join(root, 'src', p);
const list = dir => fs.readdirSync(src(dir)).filter(f => /^\d\d-.*\.(css|js)$/.test(f)).sort();
const read = p => fs.readFileSync(src(p), 'utf8');

const css = list('css').map(f => read('css/' + f)).join('');
// Todos los módulos JS comparten un único ámbito (una IIFE en modo estricto), en orden numérico.
const js = "(function(){\n'use strict';\n" + list('js').map(f => read('js/' + f)).join('') + '})();\n';

function page(c, j) {
  const shell = read('shell.html');
  const body = shell.replace('<!--CSS-->', () => c).replace('<!--JS-->', () => j);
  const h = crypto.createHash('sha256').update(body).digest('hex').slice(0, 12);
  return body.replace('<!--BUILD-->', `<meta name="build" content="${h}">`);
}

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
const dev = page(css, js);
fs.writeFileSync(path.join(root, 'dist/dev.html'), dev);
if (!process.argv.includes('--dev')) {
  const o = { charset: 'utf8', legalComments: 'none' };
  const mc = transformSync(css, { ...o, loader: 'css', minify: true }).code;
  const mj = transformSync(js, { ...o, loader: 'js', minifyWhitespace: true, minifySyntax: true, target: 'es2017' }).code;
  const out = page(mc, mj);
  fs.writeFileSync(path.join(root, 'dist/index.html'), out);
  const kb = n => (Buffer.byteLength(n) / 1024).toFixed(0) + ' KB';
  console.log('dev', kb(dev), '-> index', kb(out));
} else console.log('dev', (dev.length / 1024).toFixed(0), 'KB');
