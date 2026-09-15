import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { vout, current, power, r2ForVout } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('equal resistors halve the input', () => {
  near(vout(10, 1000, 1000), 5);
  near(vout(3.3, 4700, 4700), 1.65);
});

check('Vout = Vin·R2/(R1+R2)', () => {
  near(vout(9, 1000, 2000), 6);
  near(vout(12, 3000, 1000), 3);
});

check('larger R2 pushes Vout toward Vin; smaller toward 0', () => {
  assert.ok(vout(10, 100, 100000) > 9.9);
  assert.ok(vout(10, 100000, 100) < 0.1);
});

check('current = Vin/(R1+R2)', () => {
  near(current(10, 1000, 1000), 0.005); // 5 mA
  near(current(5, 2000, 3000), 0.001);
});

check('power = Vin × current', () => {
  near(power(10, 1000, 1000), 10 * 0.005); // 0.05 W
  near(power(10, 1000, 1000), vout(10, 1000, 1000) * current(10, 1000, 1000) + (10 - vout(10, 1000, 1000)) * current(10, 1000, 1000));
});

check('r2ForVout picks the right resistor', () => {
  near(r2ForVout(10, 5, 1000), 1000);        // half → equal
  near(r2ForVout(5, 3.3, 1000), 1000 * 3.3 / 1.7);
});

check('r2ForVout inverts vout', () => {
  for (const [vin, r1, r2] of [[9, 1000, 2200], [12, 4700, 10000], [5, 330, 470]]) {
    const vo = vout(vin, r1, r2);
    near(r2ForVout(vin, vo, r1), r2, 1e-6);
  }
});

check('a 5V→3.3V level shift with R1=1k needs R2≈1.94k', () => {
  const r2 = r2ForVout(5, 3.3, 1000);
  assert.ok(Math.abs(r2 - 1941.18) < 1);
});

check('halving both resistors keeps Vout but doubles current', () => {
  near(vout(10, 1000, 1000), vout(10, 500, 500));
  near(current(10, 500, 500), 2 * current(10, 1000, 1000));
});

check('validation: non-positive R/Vin and out-of-range target throw', () => {
  assert.throws(() => vout(10, 0, 1000), /R1 must be positive/);
  assert.throws(() => vout(0, 1000, 1000), /Vin must be positive/);
  assert.throws(() => r2ForVout(5, 5, 1000), /between 0 and Vin/);
  assert.throws(() => r2ForVout(5, 6, 1000), /between 0 and Vin/);
});

console.log(`\n${n} checks passed.`);
