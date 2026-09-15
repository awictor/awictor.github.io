import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dartValue, checkoutRoute, isCheckoutPossible } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
const sum = r => r.reduce((s, l) => s + dartValue(l), 0);
const isDouble = l => l === 'Bull' || l[0] === 'D';

check('T20 is worth 60', dartValue('T20') === 60);
check('D20 is worth 40', dartValue('D20') === 40);
check('Bull is worth 50', dartValue('Bull') === 50);
check('40 checks out in one dart (D20)', JSON.stringify(checkoutRoute(40)) === JSON.stringify(['D20']));
check('50 checks out on the bull', JSON.stringify(checkoutRoute(50)) === JSON.stringify(['Bull']));
check('170 is a valid 3-dart finish', (() => { const r = checkoutRoute(170); return r && r.length === 3 && sum(r) === 170; })());
check('every checkout ends on a double', (() => { for(const s of [2, 60, 100, 170]){ const r = checkoutRoute(s); if(!r || !isDouble(r[r.length - 1])) return false; } return true; })());
check('169 is a bogey number', isCheckoutPossible(169) === false);
check('score of 1 cannot check out', isCheckoutPossible(1) === false);
check('180 cannot finish on a double', checkoutRoute(180) === null);

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
