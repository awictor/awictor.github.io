import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseRatio, modelSize, realSize, ratioFrom } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('1:24 diecast — 2400mm real becomes 100mm model', () => {
  assert.equal(modelSize(2400, 24), 100);
});

check('inverse — 100mm model at 1:24 is 2400mm real', () => {
  assert.equal(realSize(100, 24), 2400);
});

check('ratioFrom recovers the scale denominator', () => {
  assert.equal(ratioFrom(2400, 100), 24);
  assert.equal(ratioFrom(1000, 20), 50);
});

check('HO scale 1:87 — 20000mm real', () => {
  near(modelSize(20000, 87), 229.885057471, 1e-6);
});

check('architecture 1:100 — 3500mm real is 35mm model', () => {
  assert.equal(modelSize(3500, 100), 35);
  assert.equal(realSize(35, 100), 3500);
});

check('round trip is identity across scales', () => {
  for (const [v, r] of [[500, 18], [7.5, 72], [123.4, 160], [9000, 25000]]) {
    near(realSize(modelSize(v, r), r), v);
    near(modelSize(realSize(v, r), r), v);
  }
});

check('parseRatio reads "1:N" strings', () => {
  assert.equal(parseRatio('1:24'), 24);
  assert.equal(parseRatio('1:87'), 87);
  assert.equal(parseRatio('1 : 100'), 100);
});

check('parseRatio handles non-unit and plain-number forms', () => {
  assert.equal(parseRatio('2:1'), 0.5);
  assert.equal(parseRatio('1:2'), 2);
  assert.equal(parseRatio('48'), 48);
  assert.equal(parseRatio(72), 72);
});

check('parseRatio drives the converters consistently', () => {
  const r = parseRatio('1:50');
  assert.equal(modelSize(5000, r), 100);
  assert.equal(ratioFrom(5000, modelSize(5000, r)), 50);
});

check('validation: bad inputs throw', () => {
  assert.throws(() => modelSize(0, 24), /positive number/);
  assert.throws(() => realSize(100, -5), /positive number/);
  assert.throws(() => ratioFrom(100, 0), /positive number/);
  assert.throws(() => parseRatio('abc'), /invalid ratio/);
  assert.throws(() => parseRatio('1:0'), /invalid ratio/);
});

console.log(`\n${n} checks passed.`);
