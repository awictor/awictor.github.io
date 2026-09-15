import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { capitalGain, gainPercent, isLongTerm, capitalGainsTax, netAfterTax } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('gain = (sell − buy) × shares', () => {
  near(capitalGain(40, 60, 100), 2000, 1e-9);
  near(capitalGain(10, 15, 100), 500, 1e-9);
});

check('loss is negative', () => {
  near(capitalGain(15, 10, 100), -500, 1e-9);
});

check('gain percent', () => {
  near(gainPercent(40, 60), 50, 1e-9);
  near(gainPercent(100, 50), -50, 1e-9);
});

check('long-term threshold is > 365 days', () => {
  assert.equal(isLongTerm(365), false);
  assert.equal(isLongTerm(366), true);
  assert.equal(isLongTerm(500), true);
  assert.equal(isLongTerm(100), false);
});

check('tax on a positive gain', () => {
  near(capitalGainsTax(2000, 15), 300, 1e-9);
  near(capitalGainsTax(500, 24), 120, 1e-9);
});

check('no tax on a loss or zero gain', () => {
  assert.equal(capitalGainsTax(-500, 15), 0);
  assert.equal(capitalGainsTax(0, 15), 0);
});

check('net after tax = gain − tax', () => {
  const gain = 2000, tax = capitalGainsTax(gain, 15);
  near(netAfterTax(gain, tax), 1700, 1e-9);
});

check('gain scales linearly with shares', () => {
  near(capitalGain(40, 60, 200), 2 * capitalGain(40, 60, 100), 1e-9);
});

check('long-term rate typically less than short-term for same gain', () => {
  assert.ok(capitalGainsTax(2000, 15) < capitalGainsTax(2000, 24));
});

check('validation', () => {
  assert.throws(() => capitalGain('x', 60, 100), /numbers/);
  assert.throws(() => gainPercent(0, 60), /non-zero/);
});

console.log(`\n${n} checks passed.`);
