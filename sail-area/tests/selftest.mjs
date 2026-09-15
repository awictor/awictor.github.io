import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { saDisplacementRatio, displacementLengthRatio, ballastRatio } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. SA/D for 550 ft^2 and 12000 lb ≈ 16.79.
check('sad', near(saDisplacementRatio(550, 12000), 16.789142224115537, 1e-6));
// 2. More sail area raises SA/D.
check('more sail higher sad', saDisplacementRatio(650, 12000) > saDisplacementRatio(550, 12000));
// 3. More displacement lowers SA/D.
check('heavier lower sad', saDisplacementRatio(550, 16000) < saDisplacementRatio(550, 12000));
// 4. D/L for 12000 lb over 28 ft LWL ≈ 244.04.
check('dlr', near(displacementLengthRatio(12000, 28), 244.03894210745514, 1e-6));
// 5. A shorter waterline raises D/L (heavier for its length).
check('shorter higher dlr', displacementLengthRatio(12000, 24) > displacementLengthRatio(12000, 28));
// 6. Ballast ratio: 4500 / 12000 = 37.5%.
check('ballast', near(ballastRatio(4500, 12000), 37.5));
// 7. More ballast raises the ratio.
check('more ballast', ballastRatio(5000, 12000) > ballastRatio(4500, 12000));
// 8. A non-positive displacement is rejected by SA/D.
let a = false; try { saDisplacementRatio(550, 0); } catch (e) { a = true; }
check('disp guard', a);
// 9. A non-positive waterline is rejected by D/L.
let b = false; try { displacementLengthRatio(12000, 0); } catch (e) { b = true; }
check('lwl guard', b);
// 10. A negative ballast is rejected.
let c = false; try { ballastRatio(-1, 12000); } catch (e) { c = true; }
check('ballast guard', c);

console.log(passed + ' checks passed.');
