import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { screenWidth, screenHeight, recommendedDistance } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. Width and height satisfy Pythagoras (equal the diagonal).
check('pythagoras', near(Math.hypot(screenWidth(100, 16, 9), screenHeight(100, 16, 9)), 100));
// 2. The width/height ratio matches the aspect ratio.
check('aspect ratio', near(screenWidth(100, 16, 9) / screenHeight(100, 16, 9), 16 / 9));
// 3. A 65" 16:9 screen is about 56.7" wide.
check('65 inch width', Math.abs(screenWidth(65, 16, 9) - 56.65) < 0.1);
// 4. A square screen has equal width and height.
check('square', near(screenWidth(50, 1, 1), screenHeight(50, 1, 1)));
// 5. Dimensions scale linearly with the diagonal.
check('scales', near(screenWidth(200, 16, 9), 2 * screenWidth(100, 16, 9)));
// 6. Recommended distance is diagonal times the multiplier.
check('distance', recommendedDistance(55, 1.5) === 82.5);
// 7. A bigger TV wants more distance.
check('bigger farther', recommendedDistance(65, 1.5) > recommendedDistance(55, 1.5));
// 8. Casual (2.5x) is farther than immersive (1.5x).
check('casual farther', recommendedDistance(65, 2.5) > recommendedDistance(65, 1.5));
// 9. A non-positive aspect value is rejected.
let a = false; try { screenWidth(65, 0, 9); } catch (e) { a = true; }
check('aspect guard', a);
// 10. A negative diagonal is rejected.
let d = false; try { screenWidth(-65, 16, 9); } catch (e) { d = true; }
check('diagonal guard', d);

console.log(passed + ' checks passed.');
