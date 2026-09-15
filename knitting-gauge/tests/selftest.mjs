import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stitchesPerInch, stitchesForWidth, widthForStitches } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A gauge of 20 sts/4in is 5 sts per inch.
check('spi', stitchesPerInch(20) === 5);
// 2. 10 inches at 20 sts/4in casts on 50 stitches.
check('cast on', stitchesForWidth(10, 20) === 50);
// 3. 50 stitches at that gauge is 10 inches wide.
check('width', widthForStitches(50, 20) === 10);
// 4. The two conversions invert each other.
check('roundtrip', near(widthForStitches(stitchesForWidth(10, 20), 20), 10));
// 5. A finer gauge packs more stitches into the same width.
check('finer more', stitchesForWidth(10, 24) > stitchesForWidth(10, 20));
// 6. A wider piece needs more stitches.
check('wider more', stitchesForWidth(12, 20) > stitchesForWidth(10, 20));
// 7. A non-positive gauge is rejected.
let a = false; try { stitchesPerInch(0); } catch (e) { a = true; }
check('gauge guard', a);
// 8. A negative width is rejected.
let b = false; try { stitchesForWidth(-1, 20); } catch (e) { b = true; }
check('width guard', b);
// 9. widthForStitches rejects a non-positive gauge.
let c = false; try { widthForStitches(50, 0); } catch (e) { c = true; }
check('gauge guard 2', c);
// 10. A negative stitch count is rejected.
let d = false; try { widthForStitches(-1, 20); } catch (e) { d = true; }
check('stitches guard', d);

console.log(passed + ' checks passed.');
