import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cooper, uth, hrMaxFromAge, ageBracket, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 0.05) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('cooper formula: 2400 m in 12 min ≈ 42.4', () => {
  near(cooper(2400), (2400 - 504.9) / 44.73);
  near(cooper(2400), 42.37);
});

check('cooper rejects non-positive distance', () => {
  assert.throws(() => cooper(0), /positive/);
  assert.throws(() => cooper(-100), /positive/);
});

check('uth estimate: 15.3 * hrMax/hrRest', () => {
  near(uth(190, 60), 15.3 * 190 / 60);
  near(uth(190, 60), 48.45);
});

check('uth rejects non-positive rates', () => {
  assert.throws(() => uth(190, 0), /positive/);
  assert.throws(() => uth(0, 60), /positive/);
});

check('hrMaxFromAge is 220 minus age', () => {
  assert.equal(hrMaxFromAge(30), 190);
  assert.equal(hrMaxFromAge(50), 170);
});

check('ageBracket maps to Cooper decades', () => {
  assert.equal(ageBracket(25), '20-29');
  assert.equal(ageBracket(30), '30-39');
  assert.equal(ageBracket(49), '40-49');
  assert.equal(ageBracket(59), '50-59');
  assert.equal(ageBracket(72), '60+');
  assert.equal(ageBracket(15), '20-29'); // clamps below 20
});

check('category ladders correctly for a young man', () => {
  assert.equal(category(60, 'male', 25), 'Superior');
  assert.equal(category(53, 'male', 25), 'Excellent');
  assert.equal(category(47, 'male', 25), 'Good');
  assert.equal(category(43, 'male', 25), 'Fair');
  assert.equal(category(39, 'male', 25), 'Poor');
  assert.equal(category(35, 'male', 25), 'Very poor');
});

check('category uses sex-specific norms', () => {
  // 47 is Good for a 25yo man but Excellent for a 25yo woman
  assert.equal(category(47, 'male', 25), 'Good');
  assert.equal(category(47, 'female', 25), 'Excellent');
});

check('category shifts down with age', () => {
  // vo2 40: Fair at 25, but Good by the 50-59 bracket
  assert.equal(category(40, 'male', 25), 'Poor');
  assert.equal(category(40, 'male', 55), 'Good');
});

check('category rejects unknown sex', () => {
  assert.throws(() => category(45, 'other', 30), /male.*female/);
});

console.log(`\n${n} checks passed.`);
