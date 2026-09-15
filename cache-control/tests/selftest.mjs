import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cacheControl, humanizeSeconds } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('public + max-age', () => {
  assert.equal(cacheControl({ public: true, maxAge: 3600 }), 'public, max-age=3600');
});

check('no-store dominates and drops everything else', () => {
  assert.equal(cacheControl({ noStore: true, maxAge: 3600, public: true }), 'no-store');
});

check('private + no-cache', () => {
  assert.equal(cacheControl({ private: true, noCache: true }), 'private, no-cache');
});

check('immutable long cache', () => {
  assert.equal(cacheControl({ public: true, maxAge: 31536000, immutable: true }), 'public, max-age=31536000, immutable');
});

check('s-maxage after max-age', () => {
  assert.equal(cacheControl({ public: true, maxAge: 30, sMaxAge: 60 }), 'public, max-age=30, s-maxage=60');
});

check('must-revalidate', () => {
  assert.equal(cacheControl({ maxAge: 0, mustRevalidate: true }), 'max-age=0, must-revalidate');
});

check('empty options → empty string', () => {
  assert.equal(cacheControl({}), '');
});

check('rejects non-integer / negative ages', () => {
  assert.throws(() => cacheControl({ maxAge: 1.5 }), /max-age/);
  assert.throws(() => cacheControl({ maxAge: -1 }), /max-age/);
  assert.throws(() => cacheControl({ sMaxAge: 2.2 }), /s-maxage/);
});

check('humanizeSeconds', () => {
  assert.equal(humanizeSeconds(3600), '1 hour');
  assert.equal(humanizeSeconds(86400), '1 day');
  assert.equal(humanizeSeconds(31536000), '1 year');
  assert.equal(humanizeSeconds(90), '1 minute+');
  assert.equal(humanizeSeconds(0), '0 seconds');
});

check('directive order is stable', () => {
  assert.equal(cacheControl({ immutable: true, public: true, maxAge: 60, mustRevalidate: true }),
    'public, max-age=60, must-revalidate, immutable');
});

console.log(`\n${n} checks passed.`);
