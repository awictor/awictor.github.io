import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { grossWpm, netWpm, accuracy, cpm } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. 250 chars in 1 minute is 50 WPM (250/5).
check('gross', grossWpm(250, 1) === 50);
// 2. Same speed over 2 minutes with 500 chars.
check('gross 2min', grossWpm(500, 2) === 50);
// 3. Five errors drop net WPM to 45.
check('net', netWpm(250, 5, 1) === 45);
// 4. Accuracy as a percentage.
check('accuracy', accuracy(95, 100) === 95);
// 5. Characters per minute.
check('cpm', cpm(250, 1) === 250);
// 6. Zero errors makes net equal gross.
check('no errors', netWpm(250, 0, 1) === grossWpm(250, 1));
// 7. Speed is inversely proportional to time.
check('inverse time', grossWpm(250, 2) === grossWpm(250, 1) / 2);
// 8. Perfect accuracy is 100%.
check('perfect', accuracy(100, 100) === 100);
// 9. Zero time rejected.
let m = false; try { grossWpm(250, 0); } catch (e) { m = true; }
check('time guard', m);
// 10. Zero total characters rejected.
let t = false; try { accuracy(0, 0); } catch (e) { t = true; }
check('total guard', t);

console.log(passed + ' checks passed.');
