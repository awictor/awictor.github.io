import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { concentrateVolume, waterVolume, totalFromConcentrate, ratioFromParts } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 1100 total at 1:10 needs 100 concentrate.
check('concentrate', concentrateVolume(1100, 10) === 100);
// 2. ...and 1000 water.
check('water', waterVolume(1100, 10) === 1000);
// 3. 100 concentrate at 1:10 makes 1100 total.
check('total', totalFromConcentrate(100, 10) === 1100);
// 4. Ratio from 100 concentrate and 1000 water is 10.
check('ratio', ratioFromParts(100, 1000) === 10);
// 5. Concentrate plus water equals the total.
check('sum', near(concentrateVolume(1100, 10) + waterVolume(1100, 10), 1100));
// 6. Round trip concentrate -> total -> concentrate.
check('round trip', near(concentrateVolume(totalFromConcentrate(50, 10), 10), 50));
// 7. A higher ratio uses less concentrate.
check('higher ratio less', concentrateVolume(1100, 20) < concentrateVolume(1100, 10));
// 8. A 1:1 mix is half and half.
check('one to one', concentrateVolume(100, 1) === 50);
// 9. Negative ratio rejected.
let r = false; try { concentrateVolume(1100, -1); } catch (e) { r = true; }
check('ratio guard', r);
// 10. Zero concentrate rejected in ratio-from-parts.
let c = false; try { ratioFromParts(0, 1000); } catch (e) { c = true; }
check('concentrate guard', c);

console.log(passed + ' checks passed.');
