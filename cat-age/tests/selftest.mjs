import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { catToHuman, humanToCat, lifeStage } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. First year is 15 human years.
check('year one', catToHuman(1) === 15);
// 2. Second year reaches 24.
check('year two', catToHuman(2) === 24);
// 3. Each year after adds four.
check('year three', catToHuman(3) === 28);
// 4. Ten cat years is about 56.
check('year ten', catToHuman(10) === 56);
// 5. Newborn maps to zero.
check('zero', catToHuman(0) === 0);
// 6. Human-to-cat inverts at the 24-year anchor.
check('inverse anchor', humanToCat(24) === 2);
// 7. Full round trip.
check('round trip', near(humanToCat(catToHuman(7)), 7));
// 8. Aging is monotonic.
check('monotonic', catToHuman(10) > catToHuman(5));
// 9. Life stages classify correctly.
check('stages', lifeStage(0.5) === 'Kitten' && lifeStage(8) === 'Mature' && lifeStage(16) === 'Geriatric');
// 10. Negative age is rejected.
let n = false; try { catToHuman(-1); } catch (e) { n = true; }
check('negative guard', n);

console.log(passed + ' checks passed.');
