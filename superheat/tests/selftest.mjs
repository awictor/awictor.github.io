import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { superheat, subcooling, airSplit } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. Superheat is suction minus saturation.
check('superheat', superheat(55, 40) === 15);
// 2. Subcooling is saturation minus liquid.
check('subcooling', subcooling(100, 90) === 10);
// 3. Air split is return minus supply.
check('air split', airSplit(75, 55) === 20);
// 4. Superheat can be negative (flooding).
check('negative superheat', superheat(35, 40) === -5);
// 5. Higher suction temp raises superheat.
check('more superheat', superheat(60, 40) > superheat(55, 40));
// 6. A warmer liquid line reduces subcooling.
check('less subcooling', subcooling(100, 95) < subcooling(100, 90));
// 7. A colder supply widens the air split.
check('wider split', airSplit(75, 50) > airSplit(75, 55));
// 8. Zero difference gives zero.
check('zero', superheat(40, 40) === 0);
// 9. Non-numeric suction temp is rejected.
let s = false; try { superheat(NaN, 40); } catch (e) { s = true; }
check('suction guard', s);
// 10. Non-numeric liquid temp is rejected.
let l = false; try { subcooling(100, NaN); } catch (e) { l = true; }
check('liquid guard', l);

console.log(passed + ' checks passed.');
