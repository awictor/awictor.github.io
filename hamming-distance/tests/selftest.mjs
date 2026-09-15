import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { hammingDistance, hammingDistanceInt, diffPositions } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('classic Wikipedia string vectors', () => {
  assert.equal(hammingDistance('karolin', 'kathrin'), 3);
  assert.equal(hammingDistance('karolin', 'kerstin'), 3);
  assert.equal(hammingDistance('kathrin', 'kerstin'), 4);
});

check('binary string vectors', () => {
  assert.equal(hammingDistance('1011101', '1001001'), 2);
  assert.equal(hammingDistance('2173896', '2233796'), 3);
});

check('identical strings have distance 0', () => {
  assert.equal(hammingDistance('GGACTG', 'GGACTG'), 0);
  assert.equal(hammingDistance('', ''), 0);
});

check('every position differing gives distance = length', () => {
  assert.equal(hammingDistance('aaaa', 'bbbb'), 4);
});

check('integer Hamming distance is popcount of XOR', () => {
  assert.equal(hammingDistanceInt(1, 4), 2);   // 001 vs 100
  assert.equal(hammingDistanceInt(0xFF, 0x0F), 4);
  assert.equal(hammingDistanceInt(42, 42), 0);
});

check('integer distance matches the binary-string distance', () => {
  const bits = x => x.toString(2).padStart(8, '0');
  for (const [x, y] of [[5, 9], [255, 0], [170, 85], [12, 3]]) {
    assert.equal(hammingDistanceInt(x, y), hammingDistance(bits(x), bits(y)));
  }
});

check('distance is symmetric', () => {
  assert.equal(hammingDistance('kitten', 'sitten'), hammingDistance('sitten', 'kitten'));
  assert.equal(hammingDistanceInt(19, 88), hammingDistanceInt(88, 19));
});

check('diffPositions lists the differing indices', () => {
  assert.deepEqual(diffPositions('karolin', 'kathrin'), [2, 3, 4]);
  assert.deepEqual(diffPositions('abc', 'abc'), []);
});

check('diffPositions count equals the distance', () => {
  assert.equal(diffPositions('karolin', 'kerstin').length, hammingDistance('karolin', 'kerstin'));
});

check('validation: length mismatch and bad integers throw', () => {
  assert.throws(() => hammingDistance('abc', 'ab'), /same length/);
  assert.throws(() => hammingDistance(1, 2), /must be strings/);
  assert.throws(() => hammingDistanceInt(-1, 2), /non-negative integers/);
  assert.throws(() => hammingDistanceInt(2.5, 2), /non-negative integers/);
});

console.log(`\n${n} checks passed.`);
