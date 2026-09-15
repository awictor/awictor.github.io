import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MIME, extractExt, byExtension, byMime, search } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('extractExt pulls the last segment', () => {
  assert.equal(extractExt('photo.JPG'), 'jpg');
  assert.equal(extractExt('archive.tar.gz'), 'gz');
  assert.equal(extractExt('json'), 'json');   // bare extension
  assert.equal(extractExt('.PNG'), 'png');
});

check('byExtension resolves common types', () => {
  assert.equal(byExtension('json'), 'application/json');
  assert.equal(byExtension('.png'), 'image/png');
  assert.equal(byExtension('photo.JPG'), 'image/jpeg');
  assert.equal(byExtension('report.pdf'), 'application/pdf');
  assert.equal(byExtension('backup.tar.gz'), 'application/gzip');
});

check('byExtension returns null for unknown', () => {
  assert.equal(byExtension('xyz'), null);
  assert.equal(byExtension('file.unknownext'), null);
});

check('office xlsx/docx map to the long OOXML types', () => {
  assert.equal(byExtension('a.xlsx'), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  assert.equal(byExtension('a.docx'), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
});

check('byMime returns every extension for a type', () => {
  assert.deepEqual(byMime('image/jpeg'), ['jpeg', 'jpg']);
  assert.deepEqual(byMime('image/png'), ['png']);
  assert.deepEqual(byMime('text/html'), ['htm', 'html']);
  assert.deepEqual(byMime('application/json'), ['json']);
});

check('byMime is case-insensitive and returns [] for unknown', () => {
  assert.deepEqual(byMime('IMAGE/PNG'), ['png']);
  assert.deepEqual(byMime('application/nope'), []);
});

check('search matches on extension or MIME substring', () => {
  assert.deepEqual(search('pdf').map(r => r.ext), ['pdf']);
  assert.ok(search('image/').every(r => r.type.startsWith('image/')));
  assert.ok(search('font').length >= 4); // woff, woff2, ttf, otf...
});

check('empty search returns the full sorted table', () => {
  const all = search('');
  assert.equal(all.length, Object.keys(MIME).length);
  const exts = all.map(r => r.ext);
  assert.deepEqual(exts, [...exts].sort());
});

check('results carry both ext and type', () => {
  const r = search('json')[0];
  assert.equal(r.ext, 'json');
  assert.equal(r.type, 'application/json');
});

check('the table has a healthy number of entries', () => {
  assert.ok(Object.keys(MIME).length >= 60);
});

console.log(`\n${n} checks passed.`);
