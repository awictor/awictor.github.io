import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { normCdf, d1, callPrice, putPrice, greeks } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('normCdf: known values and symmetry', () => {
  near(normCdf(0), 0.5, 1e-9);
  near(normCdf(1.96), 0.975, 1e-3);
  near(normCdf(-1), 1 - normCdf(1), 1e-9);
});

check('d1 for the canonical case is 0.35', () => {
  near(d1(100, 100, 0.2, 0.05, 1), 0.35, 1e-12);
});

check('call price matches the textbook value ~10.4506', () => {
  near(callPrice(100, 100, 0.2, 0.05, 1), 10.4506, 1e-3);
});

check('put price matches the textbook value ~5.5735', () => {
  near(putPrice(100, 100, 0.2, 0.05, 1), 5.5735, 1e-3);
});

check('put-call parity holds exactly: C − P = S − K·e^(−rT)', () => {
  const S = 120, K = 100, v = 0.25, r = 0.03, T = 0.5;
  const lhs = callPrice(S, K, v, r, T) - putPrice(S, K, v, r, T);
  near(lhs, S - K * Math.exp(-r * T), 1e-9);
});

check('delta: call − put delta = 1', () => {
  const g = greeks(100, 100, 0.2, 0.05, 1);
  near(g.deltaCall - g.deltaPut, 1, 1e-12);
});

check('gamma is shared, positive, and equals pdf(d1)/(Sσ√T)', () => {
  const g = greeks(100, 100, 0.2, 0.05, 1);
  assert.ok(g.gamma > 0);
  const dd = d1(100, 100, 0.2, 0.05, 1);
  const pdf = Math.exp(-dd * dd / 2) / Math.sqrt(2 * Math.PI);
  near(g.gamma, pdf / (100 * 0.2 * 1), 1e-9);
});

check('vega is positive and equals S·pdf(d1)·√T', () => {
  const g = greeks(100, 100, 0.2, 0.05, 1);
  const dd = d1(100, 100, 0.2, 0.05, 1);
  const pdf = Math.exp(-dd * dd / 2) / Math.sqrt(2 * Math.PI);
  near(g.vega, 100 * pdf * 1, 1e-6);
  assert.ok(g.vega > 0);
});

check('moneyness: ITM call delta > 0.5, OTM < 0.5; higher vol raises call price', () => {
  assert.ok(greeks(120, 100, 0.2, 0.05, 1).deltaCall > 0.5);
  assert.ok(greeks(80, 100, 0.2, 0.05, 1).deltaCall < 0.5);
  assert.ok(callPrice(100, 100, 0.4, 0.05, 1) > callPrice(100, 100, 0.2, 0.05, 1));
});

check('validation: non-positive S/K/vol/T and bad rate throw', () => {
  assert.throws(() => callPrice(-1, 100, 0.2, 0.05, 1), /positive/);
  assert.throws(() => callPrice(100, 0, 0.2, 0.05, 1), /positive/);
  assert.throws(() => callPrice(100, 100, 0, 0.05, 1), /positive/);
  assert.throws(() => callPrice(100, 100, 0.2, 0.05, -1), /positive/);
  assert.throws(() => callPrice(100, 100, 0.2, NaN, 1), /finite number/);
});

console.log(`\n${n} checks passed.`);
