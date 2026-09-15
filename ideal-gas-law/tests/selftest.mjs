import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { R, pressure, volume, moles, temperature } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('gas constant', () => {
  near(R, 8.314462618, 1e-9);
});

check('molar volume at STP is 22.414 L', () => {
  const V = volume(1, 273.15, 101325); // m^3
  near(V * 1000, 22.414, 1e-3); // litres
});

check('pressure inverts volume (recovers 1 atm)', () => {
  const V = volume(1, 273.15, 101325);
  near(pressure(1, 273.15, V), 101325);
});

check('moles recovers 1 from STP conditions', () => {
  const V = volume(1, 273.15, 101325);
  near(moles(101325, V, 273.15), 1);
});

check('temperature recovers 273.15', () => {
  const V = volume(1, 273.15, 101325);
  near(temperature(101325, V, 1), 273.15);
});

check('PV = nRT identity holds for arbitrary inputs', () => {
  const P = 200000, V = 0.05, T = 310;
  const nn = moles(P, V, T);
  near(P * V, nn * R * T);
});

check('doubling moles doubles pressure (fixed V, T)', () => {
  near(pressure(2, 300, 0.05), 2 * pressure(1, 300, 0.05));
});

check("Boyle's law: P·V is constant at fixed n, T", () => {
  const n1 = 1, T = 300;
  const P1 = pressure(n1, T, 0.02), P2 = pressure(n1, T, 0.04);
  near(P1 * 0.02, P2 * 0.04);
});

check("Charles's & Gay-Lussac's laws hold", () => {
  // V/T constant at fixed n,P
  const V1 = volume(1, 300, 101325), V2 = volume(1, 600, 101325);
  near(V1 / 300, V2 / 600);
  // P/T constant at fixed n,V
  const P1 = pressure(1, 300, 0.02), P2 = pressure(1, 600, 0.02);
  near(P1 / 300, P2 / 600);
});

check('validation: non-positive inputs throw', () => {
  assert.throws(() => pressure(0, 300, 0.02), /positive/);
  assert.throws(() => volume(1, -5, 101325), /positive/);
  assert.throws(() => moles(101325, 0, 300), /positive/);
  assert.throws(() => temperature(101325, 0.02, 0), /positive/);
});

console.log(`\n${n} checks passed.`);
