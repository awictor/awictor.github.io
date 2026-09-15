import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { UNITS, toMs, beaufort } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-4) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('toMs converts units', () => {
  near(toMs(10, 'mps'), 10);
  near(toMs(36, 'kmh'), 10);
  near(toMs(1, 'knots'), 0.514444);
  near(toMs(1, 'mph'), 0.44704);
});

check('toMs validates', () => {
  assert.throws(() => toMs(10, 'fps'), /unknown unit/);
  assert.throws(() => toMs(-1, 'mph'), /non-negative/);
});

check('calm and force boundaries', () => {
  assert.equal(beaufort(0).force, 0);
  assert.equal(beaufort(0.4).force, 0);
  assert.equal(beaufort(0.5).force, 1);
  assert.equal(beaufort(1.6).force, 2);
});

check('mid-scale forces', () => {
  assert.equal(beaufort(5.0).force, 3);   // 3.4–5.4
  assert.equal(beaufort(9).force, 5);     // 8.0–10.7
  assert.equal(beaufort(20).force, 8);    // 17.2–20.7
});

check('hurricane force at the top', () => {
  assert.equal(beaufort(33).force, 12);
  assert.equal(beaufort(100).force, 12);
});

check('names line up with forces', () => {
  assert.equal(beaufort(0).name, 'Calm');
  assert.equal(beaufort(9).name, 'Fresh breeze');
  assert.equal(beaufort(33).name, 'Hurricane force');
});

check('descriptions are present', () => {
  assert.ok(beaufort(0).description.length > 0);
  assert.ok(beaufort(12 * 3).description.length > 0);
});

check('40 mph is a gale (force 8)', () => {
  assert.equal(beaufort(toMs(40, 'mph')).force, 8); // 17.88 m/s
});

check('force increases monotonically with speed', () => {
  let prev = -1;
  for(let ms = 0; ms <= 40; ms += 0.5){ const f = beaufort(ms).force; assert.ok(f >= prev); prev = f; }
});

check('rejects negative speed', () => {
  assert.throws(() => beaufort(-1), /non-negative/);
  assert.equal(UNITS.knots, 0.514444);
});

console.log(`\n${n} checks passed.`);
