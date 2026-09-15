import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { anionGap, correctedAnionGap, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b}`);

check('anion gap = Na − (Cl + HCO3)', () => {
  assert.equal(anionGap(140, 104, 24), 12);
  assert.equal(anionGap(140, 100, 20), 20);
  assert.equal(anionGap(135, 100, 25), 10);
});

check('albumin correction adds 2.5 per g/dL below 4.0', () => {
  near(correctedAnionGap(12, 4.0), 12);      // no correction at normal albumin
  near(correctedAnionGap(12, 2.0), 17);      // +2.5*2
  near(correctedAnionGap(10, 3.0), 12.5);    // +2.5*1
});

check('high albumin slightly lowers the corrected gap', () => {
  near(correctedAnionGap(12, 5.0), 9.5);     // 12 + 2.5*(4-5)
});

check('category bands', () => {
  assert.equal(category(6).name, 'Low');
  assert.equal(category(10).name, 'Normal');
  assert.equal(category(20).name.startsWith('High') ? 'High' : category(20).name, 'High');
});

check('category boundaries (8–12 normal)', () => {
  assert.equal(category(7.9).name, 'Low');
  assert.equal(category(8).name, 'Normal');
  assert.equal(category(12).name, 'Normal');
  assert.ok(category(12.5).name.startsWith('High'));
});

check('a masked gap surfaces after albumin correction', () => {
  const ag = anionGap(140, 112, 16);          // = 12, "normal"
  assert.equal(category(ag).name, 'Normal');
  const cag = correctedAnionGap(ag, 2.0);      // low albumin -> +5 = 17
  assert.ok(category(cag).name.startsWith('High'));
});

check('negative-ish inputs still compute arithmetically', () => {
  assert.equal(anionGap(100, 100, 24), -24);
});

check('validation: non-numbers', () => {
  assert.throws(() => anionGap('x', 104, 24), /numbers/);
  assert.throws(() => correctedAnionGap(12, 'y'), /numbers/);
});

check('validation: albumin must be > 0', () => {
  assert.throws(() => correctedAnionGap(12, 0), /albumin/);
  assert.throws(() => correctedAnionGap(12, -1), /albumin/);
});

check('classic DKA-style high gap', () => {
  const ag = anionGap(135, 95, 10);   // 30
  assert.equal(ag, 30);
  assert.ok(category(ag).name.startsWith('High'));
});

console.log(`\n${n} checks passed.`);
