import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { MEATS, DONENESS, fToC, cToF, safeTempF, donenessFor } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('safe temps match USDA guidance', () => {
  assert.equal(safeTempF('poultry'), 165);
  assert.equal(safeTempF('ground'), 160);
  assert.equal(safeTempF('steak'), 145);
  assert.equal(safeTempF('fish'), 145);
  assert.equal(safeTempF('eggs'), 160);
});

check('unknown food throws', () => {
  assert.throws(() => safeTempF('unicorn'), /unknown food/);
});

check('fToC and cToF are correct at reference points', () => {
  near(fToC(32), 0, 1e-9);
  near(fToC(212), 100, 1e-9);
  near(cToF(100), 212, 1e-9);
  near(cToF(0), 32, 1e-9);
});

check('fToC and cToF round-trip', () => {
  near(cToF(fToC(145)), 145, 1e-9);
  near(fToC(cToF(63)), 63, 1e-9);
});

check('doneness bands map temperatures to labels', () => {
  assert.equal(donenessFor(115), 'blue');
  assert.equal(donenessFor(125), 'rare');
  assert.equal(donenessFor(135), 'medium rare');
  assert.equal(donenessFor(145), 'medium');
  assert.equal(donenessFor(155), 'medium well');
  assert.equal(donenessFor(165), 'well done');
});

check('doneness band boundaries', () => {
  assert.equal(donenessFor(120), 'rare');   // 120 is not < 120
  assert.equal(donenessFor(130), 'medium rare');
  assert.equal(donenessFor(160), 'well done');
});

check('hotter meat is never a rarer doneness (monotonic ordering)', () => {
  const order = DONENESS.map(d => d.level);
  const a = order.indexOf(donenessFor(125));
  const b = order.indexOf(donenessFor(150));
  assert.ok(b > a);
});

check('the meat table covers the key categories', () => {
  const keys = MEATS.map(m => m.key);
  ['poultry', 'ground', 'steak', 'fish'].forEach(k => assert.ok(keys.includes(k)));
  assert.ok(MEATS.length >= 5);
});

check('all safe temps are sensible Fahrenheit values', () => {
  MEATS.forEach(m => assert.ok(m.f >= 140 && m.f <= 175));
});

check('validation', () => {
  assert.throws(() => fToC('x'), /must be a number/);
  assert.throws(() => donenessFor('hot'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
