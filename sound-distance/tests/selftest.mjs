import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dbChange, levelAtDistance, distanceForLevel, combineLevels } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Doubling distance drops the level ~6 dB.
check('doubling', near(levelAtDistance(100, 1, 2), 100 - 20 * Math.log10(2)));
// 2. Same distance means no change.
check('same', levelAtDistance(100, 1, 1) === 100);
// 3. Ten times the distance drops 20 dB.
check('ten x', near(levelAtDistance(100, 1, 10), 80));
// 4. Distance for an 80 dB target from 100 dB at 1 m is 10 m.
check('distance', near(distanceForLevel(100, 1, 80), 10));
// 5. Target equal to reference gives the reference distance.
check('same distance', distanceForLevel(100, 1, 100) === 1);
// 6. Two equal sources add 3 dB.
check('two sources', near(combineLevels(80, 80), 80 + 10 * Math.log10(2)));
// 7. dB change matches the inverse-square drop.
check('change', near(dbChange(1, 2), -20 * Math.log10(2)));
// 8. Round trip level -> distance.
check('round trip', near(distanceForLevel(100, 1, levelAtDistance(100, 1, 5)), 5));
// 9. Zero new distance rejected.
let d = false; try { levelAtDistance(100, 1, 0); } catch (e) { d = true; }
check('distance guard', d);
// 10. Zero reference distance rejected.
let r = false; try { distanceForLevel(100, 0, 80); } catch (e) { r = true; }
check('ref guard', r);

console.log(passed + ' checks passed.');
