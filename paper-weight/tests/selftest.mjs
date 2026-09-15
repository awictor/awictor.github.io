import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lbToGsm, gsmToLb } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-6) => Math.abs(a - b) < t;

// 1. 20 lb bond ≈ 75.21 gsm.
check('bond', near(lbToGsm(20, 'bond'), 75.21390374331551));
// 2. 70 lb text ≈ 103.64 gsm.
check('text', near(lbToGsm(70, 'text'), 103.63684210526316));
// 3. 80 lb cover ≈ 216.38 gsm.
check('cover', near(lbToGsm(80, 'cover'), 216.3846153846154));
// 4. gsmToLb inverts lbToGsm.
check('roundtrip', near(gsmToLb(lbToGsm(70, 'text'), 'text'), 70));
// 5. For the same lb, bond is heavier in GSM than text (smaller sheet).
check('bond heavier', lbToGsm(50, 'bond') > lbToGsm(50, 'text'));
// 6. More pounds means more GSM.
check('more lb more gsm', lbToGsm(100, 'text') > lbToGsm(70, 'text'));
// 7. A negative weight is rejected.
let a = false; try { lbToGsm(-1, 'text'); } catch (e) { a = true; }
check('weight guard', a);
// 8. An unknown grade is rejected.
let b = false; try { lbToGsm(70, 'newsprint'); } catch (e) { b = true; }
check('grade guard', b);
// 9. gsmToLb rejects negative GSM.
let c = false; try { gsmToLb(-1, 'text'); } catch (e) { c = true; }
check('gsm guard', c);
// 10. gsmToLb rejects an unknown grade.
let d = false; try { gsmToLb(100, 'foo'); } catch (e) { d = true; }
check('grade guard 2', d);

console.log(passed + ' checks passed.');
