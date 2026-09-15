import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { openingArea, requiredFlueArea, roundFlueDiameter, recommendRoundLiner } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('36x29 opening is 1044 sq in', openingArea(36, 29) === 1044);
check('round flue is 1/12 of opening', near(requiredFlueArea(1200, 'round'), 100));
check('square flue is 1/10 of opening', near(requiredFlueArea(1200, 'square'), 120));
check('round drafts better, needs less area', requiredFlueArea(1200, 'round') < requiredFlueArea(1200, 'square'));
check('100 sq in flue ~ 11.28 in diameter', near(Math.round(roundFlueDiameter(100) * 100) / 100, 11.28));
check('bigger flue area, bigger diameter', roundFlueDiameter(200) > roundFlueDiameter(100));
check('11.3 in need rounds up to 12 in liner', recommendRoundLiner(11.3) === 12);
check('exactly 8 in need picks 8 in liner', recommendRoundLiner(8) === 8);
check('over 24 in returns null', recommendRoundLiner(30) === null);
check('unknown shape throws', (() => { try { requiredFlueArea(1200, 'oval'); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
