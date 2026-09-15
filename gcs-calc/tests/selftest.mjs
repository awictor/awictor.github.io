import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { EYE, VERBAL, MOTOR, gcsTotal, gcsSeverity } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('gcsTotal sums the three components', () => {
  assert.equal(gcsTotal(3, 4, 5), 12);
  assert.equal(gcsTotal(4, 5, 6), 15);
});

check('maximum is 15 and minimum is 3', () => {
  assert.equal(gcsTotal(4, 5, 6), 15);
  assert.equal(gcsTotal(1, 1, 1), 3);
});

check('component ranges are validated', () => {
  assert.throws(() => gcsTotal(5, 5, 6), /eye must be 1-4/);
  assert.throws(() => gcsTotal(4, 6, 6), /verbal must be 1-5/);
  assert.throws(() => gcsTotal(4, 5, 7), /motor must be 1-6/);
  assert.throws(() => gcsTotal(0, 5, 6), /eye must be 1-4/);
});

check('severity bands', () => {
  assert.equal(gcsSeverity(15), 'mild');
  assert.equal(gcsSeverity(13), 'mild');
  assert.equal(gcsSeverity(12), 'moderate');
  assert.equal(gcsSeverity(9), 'moderate');
  assert.equal(gcsSeverity(8), 'severe');
  assert.equal(gcsSeverity(3), 'severe');
});

check('severity boundary at 13 and 9', () => {
  assert.equal(gcsSeverity(13), 'mild');
  assert.equal(gcsSeverity(12), 'moderate');
  assert.equal(gcsSeverity(9), 'moderate');
  assert.equal(gcsSeverity(8), 'severe');
});

check('the option lists have the standard lengths', () => {
  assert.equal(EYE.length, 4);
  assert.equal(VERBAL.length, 5);
  assert.equal(MOTOR.length, 6);
});

check('option values cover the full range for each component', () => {
  assert.deepEqual(EYE.map(o => o.v).sort((a, b) => a - b), [1, 2, 3, 4]);
  assert.deepEqual(VERBAL.map(o => o.v).sort((a, b) => a - b), [1, 2, 3, 4, 5]);
  assert.deepEqual(MOTOR.map(o => o.v).sort((a, b) => a - b), [1, 2, 3, 4, 5, 6]);
});

check('a mid-range case', () => {
  assert.equal(gcsTotal(3, 3, 4), 10);
  assert.equal(gcsSeverity(10), 'moderate');
});

check('gcsSeverity rejects out-of-range totals', () => {
  assert.throws(() => gcsSeverity(2), /total must be 3-15/);
  assert.throws(() => gcsSeverity(16), /total must be 3-15/);
});

check('every valid combination totals within 3-15', () => {
  for (const e of [1, 2, 3, 4]) for (const v of [1, 2, 3, 4, 5]) for (const m of [1, 2, 3, 4, 5, 6]) {
    const t = gcsTotal(e, v, m);
    assert.ok(t >= 3 && t <= 15);
    assert.ok(['mild', 'moderate', 'severe'].includes(gcsSeverity(t)));
  }
});

console.log(`\n${n} checks passed.`);
