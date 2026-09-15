import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { baseDistance, ladderLength, ladderAngleDeg } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 4:1 rule: 16 ft contact -> base 4 ft out.
check('base', baseDistance(16) === 4);
// 2. Ladder length to a 16 ft contact is sqrt(256+16) ≈ 16.492 ft.
check('length', near(ladderLength(16), 16.492422502470642, 1e-6));
// 3. The 4:1 angle is ~75.96 degrees.
check('angle', near(ladderAngleDeg(16, 4), 75.96375653207353, 1e-6));
// 4. A taller contact needs the base further out.
check('taller more base', baseDistance(20) > baseDistance(16));
// 5. A taller contact needs a longer ladder.
check('taller longer', ladderLength(20) > ladderLength(16));
// 6. The 4:1 angle is the same regardless of height.
check('angle constant', near(ladderAngleDeg(20, 5), ladderAngleDeg(16, 4), 1e-9));
// 7. The ladder (hypotenuse) is longer than the contact height.
check('hypotenuse', ladderLength(16) > 16);
// 8. A closer base (steeper) gives a bigger angle.
check('steeper bigger angle', ladderAngleDeg(16, 3) > ladderAngleDeg(16, 4));
// 9. A negative height is rejected.
let a = false; try { baseDistance(-1); } catch (e) { a = true; }
check('height guard', a);
// 10. A non-positive base is rejected by the angle.
let b = false; try { ladderAngleDeg(16, 0); } catch (e) { b = true; }
check('base guard', b);

console.log(passed + ' checks passed.');
