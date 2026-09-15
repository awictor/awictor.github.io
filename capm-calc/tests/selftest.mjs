import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { expectedReturn, riskPremium, alpha, impliedBeta } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('expected return = Rf + β(Rm − Rf)', () => {
  near(expectedReturn(0.03, 1.2, 0.10), 0.03 + 1.2 * 0.07); // 0.114
  near(expectedReturn(0.03, 1.2, 0.10), 0.114);
});

check('β = 1 gives the market return', () => {
  near(expectedReturn(0.03, 1, 0.10), 0.10);
});

check('β = 0 gives the risk-free rate', () => {
  near(expectedReturn(0.03, 0, 0.10), 0.03);
});

check('market risk premium = Rm − Rf', () => {
  near(riskPremium(0.03, 0.10), 0.07);
  near(riskPremium(0.02, 0.02), 0);
});

check('higher beta means higher expected return (positive premium)', () => {
  assert.ok(expectedReturn(0.03, 1.5, 0.10) > expectedReturn(0.03, 0.8, 0.10));
});

check('a negative beta earns below the risk-free rate', () => {
  assert.ok(expectedReturn(0.03, -0.5, 0.10) < 0.03);
  near(expectedReturn(0.03, -0.5, 0.10), 0.03 - 0.5 * 0.07);
});

check("Jensen's alpha = actual − expected", () => {
  near(alpha(0.13, 0.03, 1.2, 0.10), 0.13 - 0.114); // +0.016
  near(alpha(0.114, 0.03, 1.2, 0.10), 0); // exactly on the line
});

check('impliedBeta inverts expectedReturn', () => {
  for (const b of [0.5, 1, 1.8, -0.3]) {
    const er = expectedReturn(0.03, b, 0.10);
    near(impliedBeta(er, 0.03, 0.10), b);
  }
});

check('impliedBeta of the market return is 1; of Rf is 0', () => {
  near(impliedBeta(0.10, 0.03, 0.10), 1);
  near(impliedBeta(0.03, 0.03, 0.10), 0);
});

check('validation: non-finite inputs and degenerate market throw', () => {
  assert.throws(() => expectedReturn(NaN, 1, 0.1), /finite number/);
  assert.throws(() => alpha(0.1, 0.03, Infinity, 0.1), /finite number/);
  assert.throws(() => impliedBeta(0.1, 0.05, 0.05), /undefined/);
});

console.log(`\n${n} checks passed.`);
