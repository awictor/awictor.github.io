import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { cToF, fToC, GAS_MARKS, gasMarkToF, fToGasMark, describe } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('C ⇄ F', () => {
  assert.equal(cToF(180), 356);
  assert.equal(cToF(0), 32);
  assert.equal(cToF(100), 212);
  near(fToC(356), 180);
  near(fToC(cToF(200)), 200);
});

check('gas mark → °F (whole marks 250 + 25N)', () => {
  assert.equal(gasMarkToF('1'), 275);
  assert.equal(gasMarkToF('4'), 350);
  assert.equal(gasMarkToF('9'), 475);
});

check('fractional gas marks', () => {
  assert.equal(gasMarkToF('1/4'), 225);
  assert.equal(gasMarkToF('1/2'), 250);
});

check('whole marks follow the 250 + 25N rule', () => {
  for(let m = 1; m <= 9; m++) assert.equal(gasMarkToF(String(m)), 250 + 25 * m);
});

check('nearest gas mark for a temperature', () => {
  assert.equal(fToGasMark(350).mark, '4');
  assert.equal(fToGasMark(275).mark, '1');
  assert.equal(fToGasMark(475).mark, '9');
  assert.equal(fToGasMark(225).mark, '1/4');
});

check('rounds to the closest mark', () => {
  assert.equal(fToGasMark(360).mark, '4');   // 350 vs 375 → closer to 350
  assert.equal(fToGasMark(365).mark, '5');   // closer to 375
});

check('gas marks increase with temperature', () => {
  for(let i = 1; i < GAS_MARKS.length; i++) assert.ok(GAS_MARKS[i].f > GAS_MARKS[i - 1].f);
});

check('heat description bands', () => {
  assert.equal(describe(120), 'Very cool');
  assert.equal(describe(180), 'Moderate');
  assert.equal(describe(200), 'Moderately hot');
  assert.equal(describe(250), 'Very hot');
});

check('GM4 ≈ the classic 180°C / 350°F', () => {
  assert.equal(gasMarkToF('4'), 350);
  near(fToC(350), 176.67, 0.01);   // rounds to ~180 in practice
});

check('validation', () => {
  assert.throws(() => gasMarkToF('12'), /unknown gas mark/);
  assert.throws(() => fToGasMark('x'), /temperature/);
});

console.log(`\n${n} checks passed.`);
