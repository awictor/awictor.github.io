import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { linearScale, ratioScale, tokens } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('linear scale is multiples of the base', () => {
  assert.deepEqual(linearScale(8, 5), [8, 16, 24, 32, 40]);
  assert.deepEqual(linearScale(4, 6), [4, 8, 12, 16, 20, 24]);
});

check('ratio scale is geometric, rounded', () => {
  assert.deepEqual(ratioScale(8, 2, 4), [8, 16, 32, 64]);
  assert.deepEqual(ratioScale(4, 1.5, 3), [4, 6, 9]);
});

check('scales are strictly increasing', () => {
  const lin = linearScale(4, 8), geo = ratioScale(4, 1.5, 8);
  for(let i = 1; i < lin.length; i++) assert.ok(lin[i] > lin[i - 1]);
  for(let i = 1; i < geo.length; i++) assert.ok(geo[i] >= geo[i - 1]);
});

check('first step', () => {
  assert.equal(linearScale(8, 1)[0], 8);
  assert.equal(ratioScale(8, 2, 1)[0], 8);   // ratio^0 = 1
});

check('count controls length', () => {
  assert.equal(linearScale(4, 12).length, 12);
  assert.equal(ratioScale(4, 1.2, 10).length, 10);
});

check('tokens render CSS custom properties', () => {
  const t = tokens([8, 16], { root: 16 });
  assert.equal(t[0], '--space-1: 8px; /* 0.5rem */');
  assert.equal(t[1], '--space-2: 16px; /* 1rem */');
});

check('tokens use the root for rem', () => {
  assert.match(tokens([32], { root: 16 })[0], /2rem/);
  assert.match(tokens([20], { root: 10 })[0], /2rem/);
});

check('8-pt scale', () => {
  assert.deepEqual(linearScale(8, 8), [8, 16, 24, 32, 40, 48, 56, 64]);
});

check('validation', () => {
  assert.throws(() => linearScale(0, 5), /base/);
  assert.throws(() => linearScale(4, 0), /steps/);
  assert.throws(() => ratioScale(4, 1, 5), /ratio/);   // ratio must be > 1
  assert.throws(() => ratioScale(4, 1.5, 2.5), /steps/);
});

check('doubling ratio matches powers of two', () => {
  assert.deepEqual(ratioScale(1, 2, 6), [1, 2, 4, 8, 16, 32]);
});

console.log(`\n${n} checks passed.`);
