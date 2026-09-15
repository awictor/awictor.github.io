import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { modelWeightsGB, vramWithOverhead, requiredVram } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. 7B at FP16 (2 bytes) is 14 GB.
check('7b fp16', modelWeightsGB(7, 2) === 14);
// 2. 7B at INT4 (0.5 bytes) is 3.5 GB.
check('7b int4', modelWeightsGB(7, 0.5) === 3.5);
// 3. 70B at FP16 is 140 GB.
check('70b fp16', modelWeightsGB(70, 2) === 140);
// 4. Quantizing shrinks the model.
check('quant smaller', modelWeightsGB(70, 0.5) < modelWeightsGB(70, 2));
// 5. Overhead adds headroom.
check('overhead', near(vramWithOverhead(14, 20), 16.8));
// 6. Required VRAM chains both.
check('required', near(requiredVram(7, 2, 20), 16.8));
// 7. More parameters need more VRAM.
check('more params', modelWeightsGB(13, 2) > modelWeightsGB(7, 2));
// 8. INT8 of 13B is 13 GB.
check('13b int8', modelWeightsGB(13, 1) === 13);
// 9. Negative parameters rejected.
let p = false; try { modelWeightsGB(-7, 2); } catch (e) { p = true; }
check('params guard', p);
// 10. Negative overhead rejected.
let o = false; try { vramWithOverhead(14, -20); } catch (e) { o = true; }
check('overhead guard', o);

console.log(passed + ' checks passed.');
