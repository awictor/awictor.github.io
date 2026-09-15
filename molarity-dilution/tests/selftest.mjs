import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { molarity, moles, dilutionVolume, solventToAdd, massToMoles, molesToMass } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('molarity = moles / litres', () => {
  near(molarity(0.5, 2), 0.25);
  near(molarity(1, 1), 1);
});

check('moles = molarity × litres (inverse)', () => {
  near(moles(0.25, 2), 0.5);
  near(moles(molarity(0.5, 2), 2), 0.5);
});

check('dilution: 10 M × 5 mL to 1 M gives 50 mL', () => {
  near(dilutionVolume(10, 5, 1), 50);
});

check('C1V1 = C2V2 holds for the result', () => {
  const c1 = 6, v1 = 20, c2 = 1.5;
  const v2 = dilutionVolume(c1, v1, c2);
  near(c1 * v1, c2 * v2);
});

check('solvent to add = V2 − V1', () => {
  near(solventToAdd(10, 5, 1), 45);
  near(solventToAdd(2, 10, 2), 0); // no dilution needed
});

check('you cannot concentrate by dilution', () => {
  assert.throws(() => dilutionVolume(1, 5, 2), /can only dilute/);
});

check('mass → moles with molar mass (1 mole of NaCl)', () => {
  near(massToMoles(58.44, 58.44), 1);
  near(massToMoles(29.22, 58.44), 0.5);
});

check('moles → mass is the inverse', () => {
  near(molesToMass(2, 58.44), 116.88);
  near(molesToMass(massToMoles(100, 40), 40), 100);
});

check('a full workflow: weigh, dissolve, read molarity', () => {
  const m = massToMoles(40, 40);       // 1 mole NaOH (40 g/mol)
  near(molarity(m, 0.5), 2);           // in 0.5 L → 2 M
});

check('validation: non-positive volumes / molar mass, negative amounts throw', () => {
  assert.throws(() => molarity(0.5, 0), /volume must be positive/);
  assert.throws(() => molarity(-1, 2), /moles must be zero or positive/);
  assert.throws(() => massToMoles(10, 0), /molar mass must be positive/);
  assert.throws(() => dilutionVolume(10, 0, 1), /stock volume must be positive/);
});

console.log(`\n${n} checks passed.`);
