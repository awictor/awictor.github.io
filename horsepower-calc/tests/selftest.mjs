import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { horsepower, torqueFromHp, hpToKw, kwToHp } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. At 5252 RPM, horsepower equals torque.
check('crossover', horsepower(300, 5252) === 300);
// 2. Another crossover value.
check('crossover 400', horsepower(400, 5252) === 400);
// 3. Torque from hp at 5252 RPM equals the hp.
check('torque crossover', torqueFromHp(300, 5252) === 300);
// 4. Round trip hp -> torque -> hp.
check('round trip', near(horsepower(torqueFromHp(250, 3000), 3000), 250));
// 5. One hp is about 0.7457 kW.
check('hp->kw', near(hpToKw(1), 0.745699872));
// 6. kW back to hp round trips.
check('kw->hp', near(kwToHp(hpToKw(200)), 200));
// 7. 100 hp is about 74.57 kW.
check('100hp', near(hpToKw(100), 74.5699872));
// 8. Horsepower scales linearly with RPM.
check('rpm linear', near(horsepower(200, 6000), 2 * horsepower(200, 3000)));
// 9. Zero kW converts to zero hp.
check('zero kw', kwToHp(0) === 0);
// 10. Torque solve rejects zero RPM.
let g = false; try { torqueFromHp(300, 0); } catch (e) { g = true; }
check('rpm guard', g);

console.log(passed + ' checks passed.');
