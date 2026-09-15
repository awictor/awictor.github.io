import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { remaining, fractionRemaining, decayConstant, meanLifetime, timeToFraction } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('no time elapsed leaves everything', () => {
  near(remaining(100, 0, 5730), 100);
  near(fractionRemaining(0, 5730), 1);
});

check('one half-life halves the amount', () => {
  near(remaining(100, 5730, 5730), 50);
  near(remaining(80, 10, 10), 40);
});

check('successive half-lives quarter, eighth, ...', () => {
  near(remaining(100, 2 * 12, 12), 25);
  near(remaining(100, 3 * 12, 12), 12.5);
  near(fractionRemaining(4 * 7, 7), 1 / 16);
});

check('fraction remaining matches (1/2)^(t/T)', () => {
  near(fractionRemaining(3, 5), Math.pow(0.5, 3 / 5));
});

check('decay constant λ = ln2 / T', () => {
  near(decayConstant(5730), Math.LN2 / 5730);
  near(decayConstant(1), Math.LN2);
});

check('the two decay forms agree: (1/2)^(t/T) = e^(−λt)', () => {
  const T = 8, t = 20, lam = decayConstant(T);
  near(fractionRemaining(t, T), Math.exp(-lam * t));
});

check('mean lifetime τ = T / ln2 = 1/λ', () => {
  near(meanLifetime(5730), 5730 / Math.LN2);
  near(meanLifetime(5730), 1 / decayConstant(5730));
});

check('timeToFraction: half → 1 T, quarter → 2 T', () => {
  near(timeToFraction(0.5, 100), 100);
  near(timeToFraction(0.25, 100), 200);
  near(timeToFraction(0.125, 100), 300);
});

check('timeToFraction inverts fractionRemaining', () => {
  const T = 13;
  for (const fr of [0.9, 0.5, 0.1, 0.01]) {
    near(fractionRemaining(timeToFraction(fr, T), T), fr, 1e-9);
  }
});

check('validation: bad amount, half-life, time, fraction throw', () => {
  assert.throws(() => remaining(0, 10, 5), /initial amount must be positive/);
  assert.throws(() => remaining(100, -1, 5), /time must be zero or positive/);
  assert.throws(() => remaining(100, 10, 0), /half-life must be positive/);
  assert.throws(() => timeToFraction(0, 5), /between 0 and 1/);
  assert.throws(() => timeToFraction(1.5, 5), /between 0 and 1/);
});

console.log(`\n${n} checks passed.`);
