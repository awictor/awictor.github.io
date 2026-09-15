import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { add, mul, conjugate, norm, normalize, inverse } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const eq = (a, b) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 1e-12);

const i = [0, 1, 0, 0], j = [0, 0, 1, 0], k = [0, 0, 0, 1], one = [1, 0, 0, 0];

// 1. Fundamental relation i·j = k.
check('i*j = k', eq(mul(i, j), k));
// 2. Non-commutative: j·i = -k.
check('j*i = -k', eq(mul(j, i), [0, 0, 0, -1]));
// 3. i² = -1.
check('i*i = -1', eq(mul(i, i), [-1, 0, 0, 0]));
// 4. k·i = j.
check('k*i = j', eq(mul(k, i), j));
// 5. Norm of [1,2,3,4] = sqrt(30).
check('norm [1,2,3,4]', Math.abs(norm([1, 2, 3, 4]) - Math.sqrt(30)) < 1e-12);
// 6. Conjugate negates the vector part.
check('conjugate', eq(conjugate([1, 2, 3, 4]), [1, -2, -3, -4]));
// 7. Multiplying by the identity returns the same quaternion.
check('identity', eq(mul([1, 2, 3, 4], one), [1, 2, 3, 4]));
// 8. Normalizing [0,3,0,4] (norm 5) -> [0,0.6,0,0.8].
check('normalize', eq(normalize([0, 3, 0, 4]), [0, 0.6, 0, 0.8]));
// 9. q · q⁻¹ = identity.
check('q * inverse(q) = 1', eq(mul([1, 2, 3, 4], inverse([1, 2, 3, 4])), one));
// 10. Addition is component-wise.
check('add', eq(add([1, 2, 3, 4], [5, 6, 7, 8]), [6, 8, 10, 12]));

console.log(passed + ' checks passed.');
