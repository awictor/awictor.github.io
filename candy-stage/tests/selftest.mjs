import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stageTemp, altitudeAdjust, stageForTemp } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Soft ball is 238 F.
check('soft ball', stageTemp('soft-ball') === 238);
// 2. Hard crack is 305 F.
check('hard crack', stageTemp('hard-crack') === 305);
// 3. Caramel is 340 F.
check('caramel', stageTemp('caramel') === 340);
// 4. 1000 ft lowers a 240 F target by 2 F.
check('altitude', near(altitudeAdjust(240, 1000), 238));
// 5. Higher altitude means a lower target.
check('higher lower', altitudeAdjust(240, 2000) < altitudeAdjust(240, 1000));
// 6. 240 F reads as soft ball.
check('id soft', stageForTemp(240) === 'soft-ball');
// 7. 305 F reads as hard crack.
check('id hard', stageForTemp(305) === 'hard-crack');
// 8. An unknown stage is rejected.
let a = false; try { stageTemp('molten'); } catch (e) { a = true; }
check('stage guard', a);
// 9. A negative altitude is rejected.
let b = false; try { altitudeAdjust(240, -1); } catch (e) { b = true; }
check('altitude guard', b);
// 10. A negative temperature is rejected.
let c = false; try { stageForTemp(-1); } catch (e) { c = true; }
check('temp guard', c);

console.log(passed + ' checks passed.');
