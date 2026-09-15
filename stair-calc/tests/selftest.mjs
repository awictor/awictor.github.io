import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { numRisers, riserHeight, treadCount, totalRun, comfort } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('numRisers rounds rise / target', () => {
  assert.equal(numRisers(108, 7), 15);   // 108/7 = 15.43 -> 15
  assert.equal(numRisers(108, 7.5), 14); // 14.4 -> 14
});

check('riserHeight back-solves from the fixed count', () => {
  near(riserHeight(108, 15), 7.2, 1e-9); // 108/15
});

check('the rounded riser height is close to the target', () => {
  const r = numRisers(108, 7);
  const h = riserHeight(108, r);
  assert.ok(Math.abs(h - 7) < 1); // within an inch of target
});

check('treadCount is one fewer than risers', () => {
  assert.equal(treadCount(15), 14);
  assert.equal(treadCount(1), 0);
});

check('totalRun = treads * tread depth', () => {
  near(totalRun(14, 11), 154, 1e-9);
  near(totalRun(0, 11), 0, 1e-9);
});

check('comfort formula is 2*riser + tread', () => {
  near(comfort(7.2, 11), 25.4, 1e-9);
  near(comfort(7, 11), 25, 1e-9);
});

check('a typical staircase lands in the comfort range', () => {
  const r = numRisers(108, 7);        // 15
  const h = riserHeight(108, r);      // 7.2
  const c = comfort(h, 11);           // 25.4 -> a touch high but near
  assert.ok(c > 23 && c < 26);
});

check('more total rise needs at least as many risers', () => {
  assert.ok(numRisers(130, 7) >= numRisers(108, 7));
});

check('numRisers is always at least 1', () => {
  assert.equal(numRisers(3, 7), 1); // 3/7 rounds to 0 -> clamped to 1
});

check('validation', () => {
  assert.throws(() => numRisers(0, 7), /total rise must be positive/);
  assert.throws(() => numRisers(108, 0), /target riser must be positive/);
  assert.throws(() => riserHeight(108, 0), /at least one riser/);
  assert.throws(() => totalRun(5, 0), /tread depth must be positive/);
});

console.log(`\n${n} checks passed.`);
