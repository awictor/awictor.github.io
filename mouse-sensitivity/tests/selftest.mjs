import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { edpi, cmPer360, convertSensitivity } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 0.01) => Math.abs(a - b) < t;

// 1. eDPI = DPI x sensitivity.
check('edpi', edpi(800, 0.5) === 400);
// 2. Converting to double DPI halves sensitivity.
check('convert', convertSensitivity(800, 0.5, 1600) === 0.25);
// 3. eDPI is preserved by the conversion.
check('edpi preserved', edpi(800, 0.5) === edpi(1600, convertSensitivity(800, 0.5, 1600)));
// 4. CS2 cm/360 reference (yaw 0.022, 800 dpi, 2.0 sens) ~ 25.98 cm.
check('cm360 ref', near(cmPer360(0.022, 800, 2), 360 * 2.54 / (0.022 * 800 * 2)));
// 5. Higher sensitivity means shorter cm/360.
check('higher sens shorter', cmPer360(0.022, 800, 4) < cmPer360(0.022, 800, 2));
// 6. Higher DPI means shorter cm/360.
check('higher dpi shorter', cmPer360(0.022, 1600, 2) < cmPer360(0.022, 800, 2));
// 7. Conversion round trip.
check('round trip', near(convertSensitivity(1600, convertSensitivity(800, 0.5, 1600), 800), 0.5));
// 8. eDPI is monotonic in sensitivity.
check('monotonic', edpi(800, 1) > edpi(800, 0.5));
// 9. Zero DPI is rejected for cm/360.
let d = false; try { cmPer360(0.022, 0, 2); } catch (e) { d = true; }
check('dpi guard', d);
// 10. Zero new DPI is rejected for conversion.
let n = false; try { convertSensitivity(800, 0.5, 0); } catch (e) { n = true; }
check('newdpi guard', n);

console.log(passed + ' checks passed.');
