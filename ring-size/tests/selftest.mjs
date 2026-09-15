import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { circumferenceFromUS, usFromCircumference, circumferenceToDiameter, diameterToCircumference } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Base circumference at size 0.
check('base', near(circumferenceFromUS(0), 36.537));
// 2. US 7 uses the linear formula.
check('us 7', near(circumferenceFromUS(7), 36.537 + 2.5535 * 7));
// 3. Round trip US -> circumference -> US.
check('round trip', near(usFromCircumference(circumferenceFromUS(7)), 7));
// 4. Circumference to diameter divides by pi.
check('to diameter', near(circumferenceToDiameter(Math.PI * 10), 10));
// 5. Round trip diameter -> circumference -> diameter.
check('dia round trip', near(diameterToCircumference(circumferenceToDiameter(50)), 50));
// 6. US 7 diameter is about 17.3 mm.
check('us7 diameter', circumferenceToDiameter(circumferenceFromUS(7)) > 17 && circumferenceToDiameter(circumferenceFromUS(7)) < 17.6);
// 7. Bigger US size means bigger circumference.
check('monotonic', circumferenceFromUS(8) > circumferenceFromUS(7));
// 8. Diameter to circumference is pi times.
check('dia to circ', near(diameterToCircumference(10), 10 * Math.PI));
// 9. Non-positive circumference rejected.
let c = false; try { circumferenceToDiameter(0); } catch (e) { c = true; }
check('circ guard', c);
// 10. Non-positive diameter rejected.
let d = false; try { diameterToCircumference(-1); } catch (e) { d = true; }
check('dia guard', d);

console.log(passed + ' checks passed.');
