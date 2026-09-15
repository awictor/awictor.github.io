import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CRITERIA, wellsScore, riskThreeTier, riskTwoTier } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('no criteria selected scores 0', () => {
  assert.equal(wellsScore({}), 0);
});

check('a single positive criterion scores +1', () => {
  assert.equal(wellsScore({ activeCancer: true }), 1);
  assert.equal(wellsScore({ previousDvt: true }), 1);
});

check('alternative diagnosis subtracts 2', () => {
  assert.equal(wellsScore({ altDiagnosis: true }), -2);
});

check('a mixed case sums correctly', () => {
  // 3 positives (+3) and alt diagnosis (-2) = 1
  assert.equal(wellsScore({ activeCancer: true, legSwollen: true, tenderness: true, altDiagnosis: true }), 1);
});

check('all nine positive criteria (no alt) = 9', () => {
  const all = {};
  CRITERIA.forEach(c => { if (c.points > 0) all[c.key] = true; });
  assert.equal(wellsScore(all), 9);
});

check('three-tier thresholds', () => {
  assert.equal(riskThreeTier(-2), 'low');
  assert.equal(riskThreeTier(0), 'low');
  assert.equal(riskThreeTier(1), 'moderate');
  assert.equal(riskThreeTier(2), 'moderate');
  assert.equal(riskThreeTier(3), 'high');
  assert.equal(riskThreeTier(9), 'high');
});

check('two-tier thresholds', () => {
  assert.equal(riskTwoTier(1), 'DVT unlikely');
  assert.equal(riskTwoTier(2), 'DVT likely');
  assert.equal(riskTwoTier(0), 'DVT unlikely');
});

check('the criteria set is exactly one -2 item and nine +1 items', () => {
  assert.equal(CRITERIA.length, 10);
  assert.equal(CRITERIA.filter(c => c.points === 1).length, 9);
  assert.equal(CRITERIA.filter(c => c.points === -2).length, 1);
});

check('unknown keys are ignored', () => {
  assert.equal(wellsScore({ notARealCriterion: true, activeCancer: true }), 1);
});

check('validation', () => {
  assert.throws(() => wellsScore(null), /must be an object/);
  assert.throws(() => wellsScore('nope'), /must be an object/);
  assert.throws(() => riskThreeTier('x'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
