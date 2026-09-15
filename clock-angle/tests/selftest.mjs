import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { minuteHandDegrees, hourHandDegrees, handAngle } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. At 3:00 the hands are 90 degrees apart.
check('3:00', handAngle(3, 0) === 90);
// 2. At 6:00 the hands are opposite, 180 degrees.
check('6:00', handAngle(6, 0) === 180);
// 3. At 12:00 the hands overlap, 0 degrees.
check('12:00', handAngle(12, 0) === 0);
// 4. At 3:15 the angle is 7.5 degrees (hour hand has crept forward).
check('3:15', near(handAngle(3, 15), 7.5));
// 5. The minute hand at :15 points to 90 degrees.
check('minute 15', minuteHandDegrees(15) === 90);
// 6. The hour hand at 3:00 points to 90 degrees.
check('hour 3:00', hourHandDegrees(3, 0) === 90);
// 7. The hour hand at 3:30 has moved to 105 degrees.
check('hour 3:30', hourHandDegrees(3, 30) === 105);
// 8. The result is always the shorter angle (<= 180): 9:00 is 90, not 270.
check('reflex', handAngle(9, 0) === 90);
// 9. A minute of 60 is out of range.
let a = false; try { minuteHandDegrees(60); } catch (e) { a = true; }
check('minute guard', a);
// 10. A negative hour is rejected.
let b = false; try { hourHandDegrees(-1, 0); } catch (e) { b = true; }
check('hour guard', b);

console.log(passed + ' checks passed.');
