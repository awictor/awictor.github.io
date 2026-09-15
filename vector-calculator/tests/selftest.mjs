import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { add, subtract, scale, dot, magnitude, cross, angle, normalize } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('add and subtract component-wise', () => {
  assert.deepEqual(add([1, 2], [3, 4]), [4, 6]);
  assert.deepEqual(subtract([5, 5, 5], [1, 2, 3]), [4, 3, 2]);
});

check('dot product', () => {
  near(dot([1, 2, 3], [4, 5, 6]), 32);
  near(dot([1, 0], [0, 1]), 0); // perpendicular
});

check('magnitude (3-4-5)', () => {
  near(magnitude([3, 4]), 5);
  near(magnitude([1, 2, 2]), 3);
});

check('cross product of basis vectors', () => {
  assert.deepEqual(cross([1, 0, 0], [0, 1, 0]), [0, 0, 1]);
  assert.deepEqual(cross([0, 1, 0], [0, 0, 1]), [1, 0, 0]);
});

check('cross product is anti-commutative', () => {
  const a = [2, 3, 4], b = [5, 6, 7];
  assert.deepEqual(cross(a, b), scale(cross(b, a), -1));
});

check('cross product is perpendicular to both inputs', () => {
  const a = [2, 3, 4], b = [5, 6, 7], c = cross(a, b);
  near(dot(c, a), 0); near(dot(c, b), 0);
});

check('angle: perpendicular 90°, parallel 0°, opposite 180°', () => {
  near(angle([1, 0], [0, 1]), 90);
  near(angle([1, 1], [2, 2]), 0, 1e-3);
  near(angle([1, 0], [-1, 0]), 180);
});

check('normalize gives a unit vector in the same direction', () => {
  assert.deepEqual(normalize([3, 4]), [0.6, 0.8]);
  near(magnitude(normalize([2, 5, 9])), 1);
});

check('dot = |a||b|cos(θ) consistency', () => {
  const a = [3, 4], b = [4, 3];
  near(dot(a, b), magnitude(a) * magnitude(b) * Math.cos(angle(a, b) * Math.PI / 180));
});

check('validation: mismatched dims, non-3D cross, zero normalize throw', () => {
  assert.throws(() => add([1, 2], [1, 2, 3]), /same dimension/);
  assert.throws(() => cross([1, 2], [3, 4]), /two 3D vectors/);
  assert.throws(() => normalize([0, 0, 0]), /zero vector/);
  assert.throws(() => dot([1], [2]), /2 or 3 finite numbers/);
});

console.log(`\n${n} checks passed.`);
