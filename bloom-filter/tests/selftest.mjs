import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { optimalBits, optimalHashes, bitsPerElement, falsePositiveRate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);
const LN2 = Math.LN2;

check('optimalBits matches −n·ln(p)/(ln2)²', () => {
  near(optimalBits(1000, 0.01), -1000 * Math.log(0.01) / (LN2 * LN2));
  assert.ok(Math.abs(optimalBits(1000, 0.01) - 9585.06) < 1); // ~9585
});

check('bits per element is ~9.585 for p=0.01, independent of n', () => {
  near(bitsPerElement(0.01), 9.585058, 1e-4);
  near(optimalBits(500, 0.01) / 500, bitsPerElement(0.01));
  near(optimalBits(9999, 0.01) / 9999, bitsPerElement(0.01));
});

check('optimalHashes = (m/n)·ln2', () => {
  near(optimalHashes(9586, 1000), (9586 / 1000) * LN2);
});

check('at optimal m, hash count equals −log2(p)', () => {
  for (const p of [0.5, 0.25, 0.125]) {
    const m = optimalBits(1000, p);
    near(optimalHashes(m, 1000), -Math.log2(p)); // 1, 2, 3
  }
});

check('falsePositiveRate matches (1 − e^(−kn/m))^k', () => {
  near(falsePositiveRate(9586, 1000, 7), Math.pow(1 - Math.exp(-7 * 1000 / 9586), 7));
});

check('actual FP rate is close to the target at optimal m, k', () => {
  const m = Math.ceil(optimalBits(1000, 0.01));
  const k = Math.round(optimalHashes(m, 1000));
  assert.ok(Math.abs(falsePositiveRate(m, 1000, k) - 0.01) < 0.002);
});

check('k=1 gives the single-hash form 1 − e^(−n/m)', () => {
  near(falsePositiveRate(5000, 1000, 1), 1 - Math.exp(-1000 / 5000));
});

check('tighter target needs more bits (monotonic)', () => {
  assert.ok(optimalBits(1000, 0.001) > optimalBits(1000, 0.01));
  assert.ok(optimalBits(1000, 0.01) > optimalBits(1000, 0.1));
});

check('more bits (same n, k) lowers the false-positive rate', () => {
  assert.ok(falsePositiveRate(20000, 1000, 7) < falsePositiveRate(10000, 1000, 7));
});

check('validation: bad n, p, m, k throw', () => {
  assert.throws(() => optimalBits(0, 0.01), /positive integer/);
  assert.throws(() => optimalBits(2.5, 0.01), /positive integer/);
  assert.throws(() => optimalBits(1000, 0), /between 0 and 1/);
  assert.throws(() => optimalBits(1000, 1), /between 0 and 1/);
  assert.throws(() => optimalHashes(0, 1000), /must be positive/);
  assert.throws(() => falsePositiveRate(5000, 1000, 0), /must be positive/);
});

console.log(`\n${n} checks passed.`);
