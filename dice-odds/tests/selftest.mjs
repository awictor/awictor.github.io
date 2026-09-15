import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { distribution, totalOutcomes, stats, probability } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('single die is uniform 1..sides', () => {
  const d = distribution(1, 6);
  assert.equal(totalOutcomes(d), 6);
  for(let f = 1; f <= 6; f++) assert.equal(d.get(f), 1);
});

check('2d6 has 36 outcomes with the classic triangular shape', () => {
  const d = distribution(2, 6);
  assert.equal(totalOutcomes(d), 36);
  assert.equal(d.get(2), 1);   // only 1+1
  assert.equal(d.get(7), 6);   // most ways
  assert.equal(d.get(12), 1);  // only 6+6
  assert.equal(d.get(3), 2);
});

check('total outcomes equals sides^n', () => {
  assert.equal(totalOutcomes(distribution(3, 6)), 216);
  assert.equal(totalOutcomes(distribution(4, 4)), 256);
});

check('mean of NdM equals n*(sides+1)/2', () => {
  assert.equal(stats(2, 6).mean, 7);
  assert.equal(stats(3, 6).mean, 10.5);
  assert.equal(stats(1, 20).mean, 10.5);
});

check('stats reports min/max/mode', () => {
  const s = stats(2, 6);
  assert.equal(s.min, 2);
  assert.equal(s.max, 12);
  assert.equal(s.mode, 7);
});

check('probability: 1d6 >= 4 is exactly half', () => {
  const r = probability(1, 6, 'atleast', 4);
  assert.equal(r.ways, 3);
  assert.equal(r.total, 6);
  near(r.p, 0.5);
});

check('probability: 2d6 exactly 7 is 6/36', () => {
  const r = probability(2, 6, 'exactly', 7);
  assert.equal(r.ways, 6);
  near(r.p, 6 / 36);
});

check('probability: at-most is the complement partner of at-least', () => {
  const atMost6 = probability(2, 6, 'atmost', 6);
  const atLeast7 = probability(2, 6, 'atleast', 7);
  near(atMost6.p + atLeast7.p, 1);
});

check('impossible / certain targets clamp to 0 and 1', () => {
  near(probability(2, 6, 'atleast', 13).p, 0);   // max is 12
  near(probability(2, 6, 'atleast', 2).p, 1);    // min is 2
  near(probability(2, 6, 'exactly', 1).p, 0);    // below min
});

check('rejects invalid dice specs', () => {
  assert.throws(() => distribution(0, 6), /n >= 1/);
  assert.throws(() => distribution(2, 0), /sides >= 1/);
  assert.throws(() => distribution(2.5, 6), /n >= 1/);
});

console.log(`\n${n} checks passed.`);
