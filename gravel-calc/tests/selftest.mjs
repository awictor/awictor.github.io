import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { volumeCubicFeet, volumeCubicYards, cubicYardsToFeet, tons } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 10x10 ft at 6 in is 50 cubic feet.
check('cubic feet', volumeCubicFeet(10, 10, 6) === 50);
// 2. That is 50/27 cubic yards.
check('cubic yards', near(volumeCubicYards(10, 10, 6), 50 / 27));
// 3. 9x9 ft at 12 in is exactly 3 cubic yards.
check('clean yards', volumeCubicYards(9, 9, 12) === 3);
// 4. 3 yd3 of gravel at 1.4 t/yd3 is 4.2 tons.
check('tons', near(tons(3, 1.4), 4.2));
// 5. One cubic yard is 27 cubic feet.
check('yard to feet', cubicYardsToFeet(1) === 27);
// 6. Volume scales with length.
check('scaling', volumeCubicYards(18, 9, 12) === 2 * volumeCubicYards(9, 9, 12));
// 7. 10x10 ft at 12 in is 100 cubic feet.
check('depth', volumeCubicFeet(10, 10, 12) === 100);
// 8. Cubic yards is cubic feet over 27.
check('relationship', volumeCubicYards(10, 10, 6) === volumeCubicFeet(10, 10, 6) / 27);
// 9. Negative dimension rejected.
let d = false; try { volumeCubicFeet(-1, 10, 6); } catch (e) { d = true; }
check('dimension guard', d);
// 10. Negative density rejected.
let n = false; try { tons(3, -1); } catch (e) { n = true; }
check('density guard', n);

console.log(passed + ' checks passed.');
