import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { meld, meldNa, severity } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('all-normal labs give the minimum MELD (~6)', () => {
  assert.equal(meld(1, 1, 1), 6); // 6.43 rounds to 6
});

check('lab values below 1 are floored to 1', () => {
  assert.equal(meld(0.5, 0.5, 0.5), meld(1, 1, 1));
});

check('worked MELD vector', () => {
  // 3.78*ln2 + 11.2*ln1.5 + 9.57*ln1.5 + 6.43 = 17.47 -> 17
  assert.equal(meld(2, 1.5, 1.5), 17);
});

check('creatinine is capped at 4', () => {
  assert.equal(meld(2, 1.5, 10), meld(2, 1.5, 4));
});

check('dialysis forces creatinine to 4', () => {
  assert.equal(meld(2, 1.5, 1.0, true), meld(2, 1.5, 4, false));
});

check('MELD-Na equals MELD when MELD <= 11', () => {
  // all-normal -> 6, not > 11, so no sodium correction
  assert.equal(meldNa(1, 1, 1, 125), 6);
});

check('worked MELD-Na vector', () => {
  // MELD 17, Na 130: 17 + 1.32*7 - 0.033*17*7 = 22.31 -> 22
  assert.equal(meldNa(2, 1.5, 1.5, 130), 22);
});

check('sodium is bounded to 125-137', () => {
  assert.equal(meldNa(2, 1.5, 1.5, 120), meldNa(2, 1.5, 1.5, 125)); // 120 clamps to 125
  assert.equal(meldNa(2, 1.5, 1.5, 140), meld(2, 1.5, 1.5));         // 137 -> no correction
});

check('lower sodium raises MELD-Na (when MELD > 11); score bounded 6-40', () => {
  assert.ok(meldNa(2, 1.5, 1.5, 125) > meldNa(2, 1.5, 1.5, 135));
  assert.ok(meldNa(50, 10, 10, 125) <= 40);
  assert.ok(meldNa(1, 1, 1, 137) >= 6);
  assert.equal(severity(35), 'very high');
  assert.equal(severity(9), 'low');
});

check('validation', () => {
  assert.throws(() => meld(0, 1, 1), /must be positive/);
  assert.throws(() => meld(1, 0, 1), /must be positive/);
  assert.throws(() => severity('x'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
