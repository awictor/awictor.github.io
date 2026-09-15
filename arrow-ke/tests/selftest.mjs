import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { kineticEnergy, momentum, huntClass } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 400 gr at 300 fps ≈ 79.96 ft-lb.
check('ke 300', near(kineticEnergy(400, 300), 79.95735607675905, 1e-6));
// 2. 400 gr at 280 fps ≈ 69.65 ft-lb.
check('ke 280', near(kineticEnergy(400, 280), 69.65174129353234, 1e-6));
// 3. Momentum of 400 gr at 300 fps ≈ 0.5328.
check('momentum', near(momentum(400, 300), 0.5328170927723361, 1e-6));
// 4. KE rises with the square of speed (2x speed = 4x KE).
check('speed squared', near(kineticEnergy(400, 600), kineticEnergy(400, 300) * 4, 1e-6));
// 5. A heavier arrow at the same speed has more KE.
check('heavier more ke', kineticEnergy(500, 280) > kineticEnergy(400, 280));
// 6. High KE suits the toughest game.
check('toughest', huntClass(70) === 'toughest game');
// 7. Deer-range KE is medium game.
check('medium', huntClass(30) === 'medium game');
// 8. Low KE is only small game.
check('small', huntClass(20) === 'small game');
// 9. Mid-range KE is large game.
check('large', huntClass(50) === 'large game');
// 10. A non-positive arrow weight is rejected.
let a = false; try { kineticEnergy(0, 280); } catch (e) { a = true; }
check('weight guard', a);

console.log(passed + ' checks passed.');
