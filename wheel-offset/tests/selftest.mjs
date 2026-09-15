import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { offsetInches, backspacing, frontspacing } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 25.4 mm is exactly 1 inch.
check('offset in', offsetInches(25.4) === 1);
// 2. Negative offset is allowed and negates.
check('offset neg', offsetInches(-25.4) === -1);
// 3. Zero offset centers the wheel: backspacing = half width.
check('back zero', backspacing(8, 0) === 4);
// 4. +25.4 mm offset adds 1 inch of backspacing.
check('back pos', backspacing(8, 25.4) === 5);
// 5. The same offset removes 1 inch of front spacing.
check('front pos', frontspacing(8, 25.4) === 3);
// 6. Backspacing plus front spacing equals the width.
check('sum width', near(backspacing(8, 25.4) + frontspacing(8, 25.4), 8));
// 7. More positive offset means more backspacing.
check('more offset more back', backspacing(8, 50.8) > backspacing(8, 25.4));
// 8. Negative offset reduces backspacing.
check('neg offset less back', backspacing(8, -25.4) === 3);
// 9. A non-positive width is rejected by backspacing.
let a = false; try { backspacing(0, 25.4); } catch (e) { a = true; }
check('width guard', a);
// 10. A non-positive width is rejected by front spacing.
let b = false; try { frontspacing(0, 25.4); } catch (e) { b = true; }
check('front width guard', b);

console.log(passed + ' checks passed.');
