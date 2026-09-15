import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roas, acos, breakEvenAcos, breakEvenRoas, netProfit } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('roas = revenue / ad spend', () => {
  assert.equal(roas(1000, 250), 4);
  assert.equal(roas(500, 250), 2);
});

check('acos = ad spend / revenue', () => {
  assert.equal(acos(250, 1000), 0.25);
  assert.equal(acos(500, 1000), 0.5);
});

check('acos and roas are reciprocals', () => {
  near(acos(250, 1000), 1 / roas(1000, 250));
});

check('break-even ACOS equals the margin', () => {
  assert.equal(breakEvenAcos(0.30), 0.30);
});

check('break-even ROAS = 1 / margin', () => {
  near(breakEvenRoas(0.25), 4);
  near(breakEvenRoas(0.5), 2);
});

check('netProfit = revenue*margin − adSpend', () => {
  assert.equal(netProfit(1000, 250, 0.3), 50);   // 300 − 250
  assert.equal(netProfit(1000, 400, 0.3), -100);  // 300 − 400
});

check('at break-even ACOS, net profit is zero', () => {
  const margin = 0.3, revenue = 1000;
  const spend = revenue * breakEvenAcos(margin); // 300
  near(netProfit(revenue, spend, margin), 0);
});

check('roas rejects non-positive ad spend', () => {
  assert.throws(() => roas(1000, 0), /ad spend/);
  assert.throws(() => roas(1000, -5), /ad spend/);
});

check('acos rejects non-positive revenue', () => {
  assert.throws(() => acos(250, 0), /revenue/);
});

check('break-even functions reject non-positive margin', () => {
  assert.throws(() => breakEvenAcos(0), /margin/);
  assert.throws(() => breakEvenRoas(-0.1), /margin/);
});

console.log(`\n${n} checks passed.`);
