import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { btuPerCord, totalBtu, cordsForHeat } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const near = (a, b, t = 1e-9) => Math.abs(a - b) < t;

// 1. Hickory is 27 million BTU/cord.
check('hickory', btuPerCord('hickory') === 27);
// 2. Pine is 15.
check('pine', btuPerCord('pine') === 15);
// 3. 2 cords of oak (24) is 48 million BTU.
check('total oak', totalBtu('oak', 2) === 48);
// 4. Hickory beats pine for heat.
check('hardwood more', btuPerCord('hickory') > btuPerCord('pine'));
// 5. 48 M BTU from oak needs 2 cords.
check('cords for heat', near(cordsForHeat(48, 'oak'), 2));
// 6. totalBtu and cordsForHeat invert.
check('roundtrip', near(cordsForHeat(totalBtu('oak', 3), 'oak'), 3));
// 7. An unknown species is rejected.
let a = false; try { btuPerCord('driftwood'); } catch (e) { a = true; }
check('species guard', a);
// 8. Negative cords are rejected.
let b = false; try { totalBtu('oak', -1); } catch (e) { b = true; }
check('cords guard', b);
// 9. A negative heat target is rejected.
let c = false; try { cordsForHeat(-1, 'oak'); } catch (e) { c = true; }
check('target guard', c);
// 10. cordsForHeat rejects an unknown species.
let d = false; try { cordsForHeat(48, 'foo'); } catch (e) { d = true; }
check('species guard 2', d);

console.log(passed + ' checks passed.');
