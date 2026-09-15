import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { costPerUse, costPerUseOverTime, cheaperPerUse } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('cost per use = price / uses', () => {
  assert.equal(costPerUse(200, 100), 2);
  assert.equal(costPerUse(40, 20), 2);
});

check('resale reduces the cost per use', () => {
  assert.equal(costPerUse(1000, 400, 200), 2);   // (1000-200)/400
  assert.equal(costPerUse(200, 400, 40), 0.4);
});

check('over time = price / (usesPerYear × years)', () => {
  assert.equal(costPerUseOverTime(500, 50, 5), 2);   // 500/250
  assert.equal(costPerUseOverTime(1000, 100, 2, 200), (1000 - 200) / 200);
});

check('more uses → lower cost per use', () => {
  assert.ok(costPerUse(100, 200) < costPerUse(100, 50));
});

check('cheaperPerUse picks the lower cost', () => {
  const c = cheaperPerUse({ price: 40, uses: 20 }, { price: 200, uses: 400 });
  assert.equal(c.a, 2);
  assert.equal(c.b, 0.5);
  assert.equal(c.winner, 'b');   // durable item wins per use
});

check('cheaperPerUse with resale', () => {
  const c = cheaperPerUse({ price: 40, uses: 20, resale: 0 }, { price: 200, uses: 400, resale: 40 });
  assert.equal(c.b, (200 - 40) / 400);          // 0.4
  assert.equal(c.winner, 'b');
});

check('tie is detected', () => {
  assert.equal(cheaperPerUse({ price: 100, uses: 50 }, { price: 200, uses: 100 }).winner, 'tie');
});

check('cheap-but-disposable can lose to pricey-but-durable', () => {
  const c = cheaperPerUse({ price: 10, uses: 3 }, { price: 120, uses: 500 });
  assert.ok(c.b < c.a);
});

check('validation', () => {
  assert.throws(() => costPerUse(100, 0), /uses/);
  assert.throws(() => costPerUse(-1, 10), /≥ 0/);
  assert.throws(() => costPerUse(100, 10, -5), /≥ 0/);
  assert.throws(() => costPerUse('x', 10), /numbers/);
});

check('resale above price gives a negative (net gain) per use', () => {
  assert.ok(costPerUse(100, 10, 150) < 0);
});

console.log(`\n${n} checks passed.`);
