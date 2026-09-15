import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { kelly, fractionalKelly, edge, growthRate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('even-money bet with 60% edge stakes 20%', () => {
  near(kelly(0.6, 1), 0.2);
});

check('no edge (p=0.5, even money) stakes 0', () => {
  near(kelly(0.5, 1), 0);
});

check('higher payout odds — p=0.6, b=2', () => {
  near(kelly(0.6, 2), (2 * 0.6 - 0.4) / 2); // 0.4
  near(kelly(0.6, 2), 0.4);
});

check('a losing edge returns a negative fraction (do not bet)', () => {
  assert.ok(kelly(0.4, 1) < 0);
  near(kelly(0.4, 1), -0.2);
});

check('a sure win stakes the whole bankroll for any odds', () => {
  for (const b of [0.5, 1, 3, 10]) near(kelly(1, b), 1);
});

check('fractional Kelly scales the stake', () => {
  near(fractionalKelly(0.6, 1, 0.5), 0.1);   // half Kelly
  near(fractionalKelly(0.6, 1, 0.25), 0.05); // quarter Kelly
  near(fractionalKelly(0.6, 1, 1), kelly(0.6, 1));
});

check('edge = p*b - (1-p)', () => {
  near(edge(0.6, 1), 0.2);
  near(edge(0.6, 2), 0.8);
  near(edge(0.5, 1), 0);
});

check('growthRate matches the closed form', () => {
  const g = growthRate(0.6, 1, 0.2);
  near(g, 0.6 * Math.log(1.2) + 0.4 * Math.log(0.8));
  near(g, 0.0201361, 1e-6);
});

check('full Kelly maximizes growth vs nearby fractions', () => {
  const f = kelly(0.6, 1); // 0.2
  const g = growthRate(0.6, 1, f);
  assert.ok(g > growthRate(0.6, 1, f - 0.05));
  assert.ok(g > growthRate(0.6, 1, f + 0.05));
});

check('validation: bad probability, odds, or fraction throws', () => {
  assert.throws(() => kelly(-0.1, 1), /between 0 and 1/);
  assert.throws(() => kelly(1.2, 1), /between 0 and 1/);
  assert.throws(() => kelly(0.6, 0), /positive number/);
  assert.throws(() => fractionalKelly(0.6, 1, 1.5), /between 0 and 1/);
  assert.throws(() => growthRate(0.6, 1, 1), /\[0, 1\)/);
});

console.log(`\n${n} checks passed.`);
