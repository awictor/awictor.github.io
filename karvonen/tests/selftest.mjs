import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hrMax, targetHr, zones, ZONES } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('hrMax is 220 − age', () => {
  assert.equal(hrMax(30), 190);
  assert.equal(hrMax(50), 170);
});

check('Karvonen target at 70% (rest 60, max 190) = 151', () => {
  // (190-60)*0.7 + 60 = 91 + 60 = 151
  assert.equal(targetHr(60, 190, 0.7), 151);
});

check('intensity 0 → resting, 1 → max', () => {
  assert.equal(targetHr(60, 190, 0), 60);
  assert.equal(targetHr(60, 190, 1), 190);
});

check('higher resting HR raises the whole zone', () => {
  assert.ok(targetHr(70, 190, 0.7) > targetHr(50, 190, 0.7));
});

check('zones returns five ranges', () => {
  const z = zones(60, 190);
  assert.equal(z.length, 5);
  assert.equal(z[0].name.startsWith('Zone 1'), true);
  assert.equal(z[4].name.startsWith('Zone 5'), true);
});

check('zone 1 range for rest 60 / max 190', () => {
  const z = zones(60, 190);
  assert.equal(z[0].low, 125);   // 130*0.5+60
  assert.equal(z[0].high, 138);  // 130*0.6+60 = 138
});

check('zones are contiguous (each high = next low)', () => {
  const z = zones(60, 190);
  for(let i = 0; i < z.length - 1; i++) assert.equal(z[i].high, z[i + 1].low);
});

check('top of zone 5 equals max HR', () => {
  const z = zones(55, 185);
  assert.equal(z[4].high, 185);
});

check('targetHr rejects max <= rest', () => {
  assert.throws(() => targetHr(190, 190, 0.7), /max HR must exceed/);
  assert.throws(() => targetHr(200, 190, 0.7), /max HR must exceed/);
});

check('hrMax rejects non-positive age', () => {
  assert.throws(() => hrMax(0), /age must be positive/);
  assert.equal(ZONES.length, 5);
});

console.log(`\n${n} checks passed.`);
