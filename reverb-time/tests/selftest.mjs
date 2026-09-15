import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { roomVolume, surfaceArea, totalAbsorption, sabineRT60, absorptionNeeded } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. A 5x4x3 room is 60 m^3.
check('volume', roomVolume(5, 4, 3) === 60);
// 2. Its surface area is 94 m^2.
check('surface', surfaceArea(5, 4, 3) === 94);
// 3. Total absorption is area times coefficient.
check('absorption', near(totalAbsorption(94, 0.2), 18.8));
// 4. Sabine: 100 m^3 with 16.1 sabins is 1 second.
check('rt 1s', near(sabineRT60(100, 16.1), 1.0));
// 5. Double the volume, double the RT60.
check('rt 2s', near(sabineRT60(200, 16.1), 2.0));
// 6. Absorption needed for a 1 s target at 100 m^3.
check('needed', near(absorptionNeeded(100, 1.0), 16.1));
// 7. Round trip: applying the needed absorption hits the target.
check('round trip', near(sabineRT60(100, absorptionNeeded(100, 1.5)), 1.5));
// 8. RT60 is inversely proportional to absorption.
check('inverse', near(sabineRT60(100, 32.2), sabineRT60(100, 16.1) / 2));
// 9. Zero absorption rejected.
let a = false; try { sabineRT60(100, 0); } catch (e) { a = true; }
check('absorption guard', a);
// 10. Zero target rejected.
let t = false; try { absorptionNeeded(100, 0); } catch (e) { t = true; }
check('target guard', t);

console.log(passed + ' checks passed.');
