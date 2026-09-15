import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { baseBtu, adjustedBtu } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('base load is 20 BTU per square foot', () => {
  assert.equal(baseBtu(150), 3000);
  assert.equal(baseBtu(300), 6000);
});

check('no adjustments returns the base (rounded to 50)', () => {
  assert.equal(adjustedBtu(150, {}), 3000);
});

check('shaded reduces by 10%', () => {
  assert.equal(adjustedBtu(150, { shaded: true }), 2700); // 3000 * 0.9
});

check('sunny increases by 10%', () => {
  assert.equal(adjustedBtu(150, { sunny: true }), 3300); // 3000 * 1.1
});

check('each occupant beyond two adds 600 BTU', () => {
  assert.equal(adjustedBtu(150, { people: 2 }), 3000);
  assert.equal(adjustedBtu(150, { people: 4 }), 3000 + 2 * 600);
});

check('a kitchen adds 4000 BTU', () => {
  assert.equal(adjustedBtu(150, { kitchen: true }), 3000 + 4000);
});

check('adjustments combine', () => {
  // 200 sqft base 4000; sunny *1.1 = 4400; +2 people over 2 = +1200 -> 5600; kitchen +4000 -> 9600
  assert.equal(adjustedBtu(200, { sunny: true, people: 4, kitchen: true }), 9600);
});

check('result is rounded to the nearest 50', () => {
  // 155 sqft base 3100; *1.1 sunny = 3410 -> nearest 50 = 3400
  assert.equal(adjustedBtu(155, { sunny: true }) % 50, 0);
  assert.equal(adjustedBtu(155, { sunny: true }), 3400);
});

check('a bigger room needs more cooling', () => {
  assert.ok(adjustedBtu(400, {}) > adjustedBtu(150, {}));
});

check('validation', () => {
  assert.throws(() => baseBtu(-1), /non-negative/);
  assert.throws(() => baseBtu('x'), /must be numbers/);
});

console.log(`\n${n} checks passed.`);
