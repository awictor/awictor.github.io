import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseTerms, parseDice, roll } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('3d6+2 stats', () => {
  const r = parseDice('3d6+2');
  assert.deepEqual([r.min, r.max, r.average], [5, 20, 12.5]);
});

check('d20 implies a single die', () => {
  assert.deepEqual(parseDice('d20'), { min: 1, max: 20, average: 10.5 });
});

check('multiple dice terms sum', () => {
  assert.deepEqual(parseDice('2d6+1d4'), { min: 3, max: 16, average: 9.5 });
});

check('a negative modifier', () => {
  assert.deepEqual(parseDice('4d6-1'), { min: 3, max: 23, average: 13 });
});

check('a subtracted dice term inverts its range', () => {
  assert.deepEqual(parseDice('-1d6'), { min: -6, max: -1, average: -3.5 });
});

check('a flat number', () => {
  assert.deepEqual(parseDice('5'), { min: 5, max: 5, average: 5 });
});

check('roll with rng=0 yields the minimum', () => {
  const r = roll('3d6+2', () => 0);
  assert.equal(r.total, 5);
  assert.deepEqual(r.rolls, [1, 1, 1]);
});

check('roll with rng near 1 yields the maximum', () => {
  const r = roll('3d6+2', () => 0.999999);
  assert.equal(r.total, 20);
  assert.deepEqual(r.rolls, [6, 6, 6]);
});

check('random rolls stay within [min, max]', () => {
  const { min, max } = parseDice('2d8+1d6+3');
  for (let i = 0; i < 500; i++) {
    const t = roll('2d8+1d6+3').total;
    assert.ok(t >= min && t <= max);
  }
});

check('validation: bad notation and empty input throw', () => {
  assert.throws(() => parseDice(''), /enter dice notation/);
  assert.throws(() => parseDice('3x6'), /could not parse|bad term/);
  assert.throws(() => parseDice('0d6'), /positive count and sides/);
  assert.throws(() => parseDice(42), /must be a string/);
});

console.log(`\n${n} checks passed.`);
