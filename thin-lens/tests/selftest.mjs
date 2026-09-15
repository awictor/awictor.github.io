import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { imageDistance, objectDistance, focalLength, magnification } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. f=10, do=30 -> di=15.
check('di 10,30', near(imageDistance(10, 30), 15));
// 2. Object at 2f -> di=2f (do=20 -> di=20).
check('di 10,20', near(imageDistance(10, 20), 20));
// 3. Object inside focal length -> virtual (negative) image.
check('virtual', near(imageDistance(10, 5), -10));
// 4. Magnification at do=30, di=15 -> -0.5.
check('mag -0.5', near(magnification(30, 15), -0.5));
// 5. Object at 2f -> magnification -1.
check('mag -1', near(magnification(20, 20), -1));
// 6. Focal length from do, di.
check('focal', near(focalLength(30, 15), 10));
// 7. Object distance from f, di.
check('object', near(objectDistance(10, 15), 30));
// 8. Round trip di -> do -> di.
check('round trip', near(imageDistance(10, objectDistance(10, 15)), 15));
// 9. Magnifying glass: do=5,di=-10 -> m=2 (upright, enlarged).
check('magnifier', near(magnification(5, -10), 2));
// 10. Distant object images near the focal point.
check('far object', Math.abs(imageDistance(10, 1e7) - 10) < 1e-2);

console.log(passed + ' checks passed.');
