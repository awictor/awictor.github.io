import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { momentOfInertiaRect, pointLoadDeflection, udlDeflection, cantileverPointDeflection } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Point-load formula reduces to 1 for unit numerator over 48.
check('point unit', pointLoadDeflection(48, 1, 1, 1) === 1);
// 2. UDL formula reduces to 5 with a 384 load.
check('udl unit', udlDeflection(384, 1, 1, 1) === 5);
// 3. Cantilever formula reduces to 1 for load 3.
check('cantilever unit', cantileverPointDeflection(3, 1, 1, 1) === 1);
// 4. Rectangular moment of inertia b*h^3/12.
check('inertia', momentOfInertiaRect(12, 1) === 1 && near(momentOfInertiaRect(1, 2), 8 / 12));
// 5. Point-load deflection scales with L^3.
check('L cubed', near(pointLoadDeflection(1, 2, 1, 1), 8 * pointLoadDeflection(1, 1, 1, 1)));
// 6. UDL deflection scales with L^4.
check('L fourth', near(udlDeflection(1, 2, 1, 1), 16 * udlDeflection(1, 1, 1, 1)));
// 7. Deflection is inversely proportional to E*I.
check('EI inverse', near(pointLoadDeflection(48, 1, 2, 1), 0.5));
// 8. A cantilever deflects 16x more than the same load simply supported.
check('cantilever 16x', near(cantileverPointDeflection(100, 5, 2, 3), 16 * pointLoadDeflection(100, 5, 2, 3)));
// 9. Non-positive E rejected.
let e = false; try { pointLoadDeflection(1, 1, 0, 1); } catch (err) { e = true; }
check('E guard', e);
// 10. Non-positive I rejected.
let i = false; try { udlDeflection(1, 1, 1, 0); } catch (err) { i = true; }
check('I guard', i);

console.log(passed + ' checks passed.');
