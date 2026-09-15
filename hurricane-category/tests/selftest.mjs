import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { categoryNumber, classify, isMajor } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 80 mph is Category 1.
check('cat1', categoryNumber(80) === 1);
// 2. 100 mph is Category 2.
check('cat2', categoryNumber(100) === 2);
// 3. 120 mph is Category 3.
check('cat3', categoryNumber(120) === 3);
// 4. 140 mph is Category 4.
check('cat4', categoryNumber(140) === 4);
// 5. 160 mph is Category 5.
check('cat5', categoryNumber(160) === 5);
// 6. Below 74 mph is not a hurricane (category 0).
check('below', categoryNumber(50) === 0);
// 7. classify names the category.
check('classify cat5', classify(160) === 'Category 5');
// 8. A 30 mph system is a Tropical Depression.
check('classify td', classify(30) === 'Tropical Depression');
// 9. Cat 3+ is major; Cat 1 is not.
check('major', isMajor(120) === true && isMajor(80) === false);
// 10. A negative wind speed is rejected.
let a = false; try { categoryNumber(-1); } catch (e) { a = true; }
check('guard', a);

console.log(passed + ' checks passed.');
