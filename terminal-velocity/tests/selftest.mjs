import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { terminalVelocity, dragForce } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const rel = (a, b, t = 1e-9) => Math.abs(a - b) / Math.abs(b) < t;

// 1. Matches the closed-form formula.
check('formula', rel(terminalVelocity(75, 9.81, 1.225, 0.7, 1.0), Math.sqrt(2 * 75 * 9.81 / (1.225 * 0.7 * 1.0))));
// 2. At terminal velocity, drag equals weight.
const vt = terminalVelocity(75, 9.81, 1.225, 0.7, 1.0);
check('drag = weight', rel(dragForce(1.225, vt, 0.7, 1.0), 75 * 9.81));
// 3. Doubling mass scales v by √2.
check('double mass', rel(terminalVelocity(150, 9.81, 1.225, 0.7, 1.0), Math.SQRT2 * terminalVelocity(75, 9.81, 1.225, 0.7, 1.0)));
// 4. Quadrupling area halves v.
check('4x area halves v', rel(terminalVelocity(75, 9.81, 1.225, 2.8, 1.0), terminalVelocity(75, 9.81, 1.225, 0.7, 1.0) / 2));
// 5. Higher Cd lowers v.
check('higher Cd slower', terminalVelocity(75, 9.81, 1.225, 0.7, 2.0) < terminalVelocity(75, 9.81, 1.225, 0.7, 1.0));
// 6. Drag is quadratic in speed.
check('drag quadratic', rel(dragForce(1.225, 20, 0.7, 1), 4 * dragForce(1.225, 10, 0.7, 1)));
// 7. Known drag value.
check('drag value', rel(dragForce(1.225, 10, 0.7, 1), 0.5 * 1.225 * 100 * 1 * 0.7));
// 8. Positivity guard.
let z = false; try { terminalVelocity(0, 9.81, 1.225, 0.7, 1); } catch (e) { z = true; }
check('zero guard', z);
// 9. Denser air lowers terminal velocity.
check('denser air slower', terminalVelocity(75, 9.81, 2.5, 0.7, 1) < terminalVelocity(75, 9.81, 1.225, 0.7, 1));
// 10. Reasonable ballpark for a belly-down skydiver (30-60 m/s).
check('ballpark', vt > 30 && vt < 60);

console.log(passed + ' checks passed.');
