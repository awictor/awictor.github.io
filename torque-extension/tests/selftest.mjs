import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wrenchSetting, actualTorque, correctionFactor } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. No extension means no change to the setting.
check('no ext', wrenchSetting(100, 12, 0) === 100);
// 2. A 2" extension on a 12" wrench: set to 100*12/14.
check('with ext', near(wrenchSetting(100, 12, 2), 100 * 12 / 14));
// 3. actualTorque inverts wrenchSetting.
check('roundtrip', near(actualTorque(wrenchSetting(100, 12, 2), 12, 2), 100));
// 4. A longer extension needs a lower setting.
check('longer lower', wrenchSetting(100, 12, 4) < wrenchSetting(100, 12, 2));
// 5. With an extension the fastener sees more than the setting.
check('more actual', actualTorque(80, 12, 3) > 80);
// 6. Correction factor with no extension is 1.
check('factor 1', correctionFactor(12, 0) === 1);
// 7. Correction factor is between 0 and 1 with an extension.
check('factor range', correctionFactor(12, 2) > 0 && correctionFactor(12, 2) < 1);
// 8. A non-positive wrench length is rejected.
let a = false; try { wrenchSetting(100, 0, 2); } catch (e) { a = true; }
check('wrench guard', a);
// 9. A negative extension is rejected.
let b = false; try { wrenchSetting(100, 12, -1); } catch (e) { b = true; }
check('ext guard', b);
// 10. A negative target torque is rejected.
let c = false; try { wrenchSetting(-1, 12, 2); } catch (e) { c = true; }
check('torque guard', c);

console.log(passed + ' checks passed.');
