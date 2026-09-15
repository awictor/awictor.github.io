import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { recommendedSpan, sizeClass, downrodFeet } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. A 100 sq ft room wants a 42" fan.
check('span 100', recommendedSpan(100) === 42);
// 2. A tiny 60 sq ft room wants a 36" fan.
check('span 60', recommendedSpan(60) === 36);
// 3. A 200 sq ft room wants a 52" fan.
check('span 200', recommendedSpan(200) === 52);
// 4. A 300 sq ft room wants a 56" fan.
check('span 300', recommendedSpan(300) === 56);
// 5. A 500 sq ft great room wants a 60" fan.
check('span 500', recommendedSpan(500) === 60);
// 6. A small room classifies as small.
check('class small', sizeClass(60) === 'small');
// 7. A 300 sq ft room classifies as large.
check('class large', sizeClass(300) === 'large');
// 8. A 10 ft ceiling needs a 1 ft downrod.
check('rod 10', downrodFeet(10) === 1);
// 9. An 8 ft ceiling uses a flush mount (0 downrod).
check('rod 8', downrodFeet(8) === 0);
// 10. A non-positive area is rejected.
let a = false; try { recommendedSpan(0); } catch (e) { a = true; }
check('area guard', a);

console.log(passed + ' checks passed.');
