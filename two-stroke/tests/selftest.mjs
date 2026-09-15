import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { oilVolume, oilMlFromGallons, totalMixVolume, ratioFromVolumes } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 5000 mL of fuel at 50:1 needs 100 mL oil.
check('oil 50:1', oilVolume(5000, 50) === 100);
// 2. 1000 mL at 40:1 needs 25 mL.
check('oil 40:1', oilVolume(1000, 40) === 25);
// 3. One US gallon at 50:1.
check('gallon', near(oilMlFromGallons(1, 50), 3785.411784 / 50));
// 4. Total mix is fuel plus oil.
check('total', totalMixVolume(5000, 50) === 5100);
// 5. Ratio from volumes.
check('ratio', ratioFromVolumes(5000, 100) === 50);
// 6. Round trip fuel -> oil -> ratio.
check('round trip', near(ratioFromVolumes(5000, oilVolume(5000, 50)), 50));
// 7. A richer (lower) ratio needs more oil.
check('richer', oilVolume(5000, 25) > oilVolume(5000, 50));
// 8. Oil scales with fuel.
check('scaling', oilVolume(10000, 50) === 2 * oilVolume(5000, 50));
// 9. Zero ratio rejected.
let r = false; try { oilVolume(5000, 0); } catch (e) { r = true; }
check('ratio guard', r);
// 10. Zero oil volume rejected.
let o = false; try { ratioFromVolumes(5000, 0); } catch (e) { o = true; }
check('oil guard', o);

console.log(passed + ' checks passed.');
