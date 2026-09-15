import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { PREFIXES, convertPrefix, toBase, allPrefixes } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('kilo to base multiplies by 1000', () => {
  assert.equal(convertPrefix(5, 3, 0), 5000);
});

check('mega to kilo', () => {
  assert.equal(convertPrefix(1, 6, 3), 1000);
});

check('base to kilo divides', () => {
  assert.equal(convertPrefix(2500, 0, 3), 2.5);
});

check('milli to micro and back', () => {
  assert.equal(convertPrefix(1, -3, -6), 1000);
  near(convertPrefix(1, -6, -3), 0.001);
});

check('same prefix is identity', () => {
  assert.equal(convertPrefix(42, 6, 6), 42);
});

check('toBase applies the exponent', () => {
  assert.equal(toBase(2500, 3), 2500000);
  assert.equal(toBase(1, -3), 0.001);
  assert.equal(toBase(7, 0), 7);
});

check('allPrefixes returns one entry per prefix', () => {
  const all = allPrefixes(1, 3);
  assert.equal(all.length, PREFIXES.length);
});

check('allPrefixes values are correct at key points', () => {
  const all = allPrefixes(1, 3); // 1 kilo
  const base = all.find(p => p.exp === 0);
  const kilo = all.find(p => p.exp === 3);
  const mega = all.find(p => p.exp === 6);
  assert.equal(base.value, 1000);
  assert.equal(kilo.value, 1);
  near(mega.value, 0.001);
});

check('the prefix table has the expected span', () => {
  assert.equal(PREFIXES[0].exp, 15);
  assert.equal(PREFIXES[PREFIXES.length - 1].exp, -15);
  assert.ok(PREFIXES.some(p => p.symbol === 'µ' && p.exp === -6));
});

check('round-trips through base', () => {
  // 2500 milli-something → base → back to milli
  const b = toBase(2500, -3);
  near(convertPrefix(b, 0, -3), 2500);
});

console.log(`\n${n} checks passed.`);
