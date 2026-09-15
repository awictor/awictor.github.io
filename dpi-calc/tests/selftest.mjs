import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { printSizeInches, pixelsNeeded, effectiveDpi, megapixels } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 3000 px at 300 DPI prints 10 inches.
check('print size', printSizeInches(3000, 300) === 10);
// 2. A 10 inch print at 300 DPI needs 3000 px.
check('pixels needed', pixelsNeeded(10, 300) === 3000);
// 3. 3000 px over 10 inches is 300 effective DPI.
check('effective', effectiveDpi(3000, 10) === 300);
// 4. 6000 x 4000 is 24 megapixels.
check('megapixels', megapixels(6000, 4000) === 24);
// 5. Round trip inches -> pixels -> inches.
check('round trip', near(pixelsNeeded(printSizeInches(3000, 300), 300), 3000));
// 6. Print size scales with pixels.
check('scaling', printSizeInches(6000, 300) === 2 * printSizeInches(3000, 300));
// 7. A bigger print has lower effective DPI.
check('bigger softer', effectiveDpi(3000, 20) < effectiveDpi(3000, 10));
// 8. A 1000x1000 image is 1 megapixel.
check('one mp', megapixels(1000, 1000) === 1);
// 9. Zero DPI rejected.
let d = false; try { printSizeInches(3000, 0); } catch (e) { d = true; }
check('dpi guard', d);
// 10. Zero inches rejected for effective DPI.
let i = false; try { effectiveDpi(3000, 0); } catch (e) { i = true; }
check('inches guard', i);

console.log(passed + ' checks passed.');
