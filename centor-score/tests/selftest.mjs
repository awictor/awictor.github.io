import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { CRITERIA, centorScore, mcIsaacAgeMod, mcIsaacScore, interpret, recommendation } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('centorScore: none=0, each=+1, all four=4', () => {
  assert.equal(centorScore({}), 0);
  CRITERIA.forEach(c => assert.equal(centorScore({ [c.key]: true }), 1));
  const all = {}; CRITERIA.forEach(c => { all[c.key] = true; });
  assert.equal(centorScore(all), 4);
});

check('mcIsaacAgeMod age bands', () => {
  assert.equal(mcIsaacAgeMod(10), 1);
  assert.equal(mcIsaacAgeMod(14), 1);
  assert.equal(mcIsaacAgeMod(15), 0);
  assert.equal(mcIsaacAgeMod(44), 0);
  assert.equal(mcIsaacAgeMod(45), -1);
  assert.equal(mcIsaacAgeMod(80), -1);
});

check('mcIsaacScore combines Centor and age', () => {
  assert.equal(mcIsaacScore({ fever: true, exudate: true }, 10), 3); // 2 + 1
  assert.equal(mcIsaacScore({ fever: true, exudate: true }, 30), 2); // 2 + 0
  assert.equal(mcIsaacScore({ fever: true, exudate: true }, 60), 1); // 2 - 1
});

check('mcIsaacScore can be negative', () => {
  assert.equal(mcIsaacScore({}, 60), -1);
});

check('interpret bands', () => {
  assert.equal(interpret(-1), 'very low');
  assert.equal(interpret(0), 'very low');
  assert.equal(interpret(1), 'low');
  assert.equal(interpret(2), 'moderate');
  assert.equal(interpret(3), 'moderate');
  assert.equal(interpret(4), 'high');
  assert.equal(interpret(5), 'high');
});

check('recommendation text matches the band', () => {
  assert.match(recommendation('high'), /test/i);
  assert.match(recommendation('moderate'), /rapid strep|culture/i);
  assert.match(recommendation('low'), /unnecessary/i);
  assert.match(recommendation('very low'), /no testing/i);
});

check('a max case is high risk', () => {
  const all = {}; CRITERIA.forEach(c => { all[c.key] = true; });
  assert.equal(interpret(mcIsaacScore(all, 10)), 'high'); // 4 + 1 = 5
});

check('the criteria set is exactly the four Centor items', () => {
  assert.equal(CRITERIA.length, 4);
  assert.deepEqual(CRITERIA.map(c => c.key), ['fever', 'exudate', 'nodes', 'noCough']);
});

check('unknown keys are ignored', () => {
  assert.equal(centorScore({ cough: true, fever: true }), 1);
});

check('validation', () => {
  assert.throws(() => centorScore(null), /must be an object/);
  assert.throws(() => mcIsaacAgeMod(-1), /non-negative/);
  assert.throws(() => interpret('x'), /must be a number/);
});

console.log(`\n${n} checks passed.`);
