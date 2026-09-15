import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { decode, formatOhms, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('4-band brown-black-red-gold = 1 kΩ ±5%', () => {
  const r = analyze(['brown', 'black', 'red', 'gold']);
  assert.equal(r.ohms, 1000);
  assert.equal(r.ohmsFormatted, '1 kΩ');
  assert.equal(r.tolerance, 5);
  near(r.min, 950); near(r.max, 1050);
});

check('4-band yellow-violet-red-gold = 4.7 kΩ', () => {
  const r = analyze(['yellow', 'violet', 'red', 'gold']);
  assert.equal(r.ohms, 4700);
  assert.equal(r.ohmsFormatted, '4.7 kΩ');
  assert.equal(r.tolerance, 5);
});

check('4-band green-blue-red-silver = 5.6 kΩ ±10%', () => {
  const r = analyze(['green', 'blue', 'red', 'silver']);
  assert.equal(r.ohms, 5600);
  assert.equal(r.ohmsFormatted, '5.6 kΩ');
  assert.equal(r.tolerance, 10);
});

check('gold multiplier divides: brown-black-gold-gold = 1 Ω', () => {
  const r = analyze(['brown', 'black', 'gold', 'gold']);
  near(r.ohms, 1);
  assert.equal(r.ohmsFormatted, '1 Ω');
});

check('5-band brown-black-black-brown-brown = 1 kΩ ±1%', () => {
  const r = analyze(['brown', 'black', 'black', 'brown', 'brown']);
  assert.equal(r.ohms, 1000);
  assert.equal(r.ohmsFormatted, '1 kΩ');
  assert.equal(r.tolerance, 1);
});

check('6-band adds temperature coefficient', () => {
  const r = analyze(['brown', 'black', 'black', 'red', 'brown', 'red']);
  assert.equal(r.ohms, 10000);
  assert.equal(r.ohmsFormatted, '10 kΩ');
  assert.equal(r.tolerance, 1);
  assert.equal(r.tempco, 50);
});

check('formatOhms scales Ω/kΩ/MΩ/GΩ', () => {
  assert.equal(formatOhms(470), '470 Ω');
  assert.equal(formatOhms(22000), '22 kΩ');
  assert.equal(formatOhms(1e6), '1 MΩ');
  assert.equal(formatOhms(2.2e6), '2.2 MΩ');
  assert.equal(formatOhms(1e9), '1 GΩ');
});

check('decode rejects bad band count', () => {
  assert.throws(() => decode(['brown', 'black', 'red']), /length 4, 5, or 6/);
});

check('decode rejects invalid color names', () => {
  assert.throws(() => decode(['pink', 'black', 'red', 'gold']), /invalid digit band/);
  assert.throws(() => decode(['brown', 'black', 'pink', 'gold']), /invalid multiplier band/);
});

check('unknown tolerance/tempco band yields null (not crash)', () => {
  const r = decode(['brown', 'black', 'red', 'black']); // black is not a tolerance color
  assert.equal(r.tolerance, null);
});

console.log(`\n${n} checks passed.`);
