import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { reynolds, reynoldsKinematic, flowRegime } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('Re = ρvL/μ', () => {
  near(reynolds(1000, 1, 0.1, 0.001), 100000);
  near(reynolds(1000, 2, 0.05, 0.001), 100000);
});

check('Re = vL/ν (kinematic)', () => {
  near(reynoldsKinematic(2, 0.05, 1e-6), 100000);
});

check('dynamic and kinematic agree when ν = μ/ρ', () => {
  const rho = 1000, mu = 0.001, nu = mu / rho;
  near(reynolds(rho, 2, 0.05, mu), reynoldsKinematic(2, 0.05, nu));
});

check('flow regime classification', () => {
  assert.equal(flowRegime(1000), 'laminar');
  assert.equal(flowRegime(3000), 'transitional');
  assert.equal(flowRegime(5000), 'turbulent');
});

check('regime boundaries', () => {
  assert.equal(flowRegime(2299), 'laminar');
  assert.equal(flowRegime(2300), 'transitional');
  assert.equal(flowRegime(4000), 'transitional');
  assert.equal(flowRegime(4001), 'turbulent');
});

check('a fast water pipe is turbulent', () => {
  assert.equal(flowRegime(reynolds(1000, 2, 0.05, 0.001)), 'turbulent');
});

check('a slow viscous flow is laminar', () => {
  assert.equal(flowRegime(reynolds(900, 0.01, 0.01, 0.1)), 'laminar'); // Re = 0.9
});

check('Re scales linearly with velocity and length', () => {
  near(reynolds(1000, 4, 0.05, 0.001), 2 * reynolds(1000, 2, 0.05, 0.001));
  near(reynolds(1000, 2, 0.1, 0.001), 2 * reynolds(1000, 2, 0.05, 0.001));
});

check('higher viscosity lowers Re', () => {
  assert.ok(reynolds(1000, 2, 0.05, 0.01) < reynolds(1000, 2, 0.05, 0.001));
});

check('validation: non-positive inputs and bad Re throw', () => {
  assert.throws(() => reynolds(0, 2, 0.05, 0.001), /density must be positive/);
  assert.throws(() => reynolds(1000, 2, 0.05, 0), /viscosity must be positive/);
  assert.throws(() => reynoldsKinematic(2, 0.05, 0), /kinematic viscosity must be positive/);
  assert.throws(() => flowRegime(-1), /zero or positive/);
});

console.log(`\n${n} checks passed.`);
