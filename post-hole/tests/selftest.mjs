import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { holeVolumeCuFt, postVolumeCuFt, bagsForPost } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. A 10" x 24" hole is ~1.0908 cu ft.
check('hole', near(holeVolumeCuFt(10, 24), 1.0908307824964558, 1e-6));
// 2. A 4" square post 24" deep is ~0.2222 cu ft.
check('post', near(postVolumeCuFt(4, 24), 0.2222222222222222, 1e-6));
// 3. A wider hole holds more.
check('wider more', holeVolumeCuFt(12, 24) > holeVolumeCuFt(10, 24));
// 4. A deeper hole holds more.
check('deeper more', holeVolumeCuFt(10, 30) > holeVolumeCuFt(10, 24));
// 5. Known bag count: 10x24 hole, 4" post, 0.45 cu ft bag = 2 bags.
check('bags', bagsForPost(10, 24, 4, 0.45) === 2);
// 6. A bigger post displaces more, leaving less concrete.
check('bigger post less concrete',
  (holeVolumeCuFt(12, 24) - postVolumeCuFt(6, 24)) < (holeVolumeCuFt(12, 24) - postVolumeCuFt(4, 24)));
// 7. A non-positive diameter is rejected.
let a = false; try { holeVolumeCuFt(0, 24); } catch (e) { a = true; }
check('dia guard', a);
// 8. A non-positive depth is rejected.
let b = false; try { holeVolumeCuFt(10, 0); } catch (e) { b = true; }
check('depth guard', b);
// 9. A post that fills the hole is rejected.
let c = false; try { bagsForPost(4, 24, 4, 0.45); } catch (e) { c = true; }
check('fills guard', c);
// 10. A non-positive bag yield is rejected.
let d = false; try { bagsForPost(10, 24, 4, 0); } catch (e) { d = true; }
check('bag guard', d);

console.log(passed + ' checks passed.');
