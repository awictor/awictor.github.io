import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { swolf, averageSwolf, swolfRating } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('18 strokes + 22 s is SWOLF 40', swolf(18, 22) === 40);
check('fewer strokes lowers SWOLF', swolf(15, 22) < swolf(18, 22));
check('less time lowers SWOLF', swolf(18, 20) < swolf(18, 22));
check('average over 4 lengths', near(averageSwolf(72, 88, 4), 40));
check('average of a fast set is lower', averageSwolf(60, 80, 4) < averageSwolf(72, 88, 4));
check('28 rates excellent', swolfRating(28) === 'excellent');
check('35 rates good', swolfRating(35) === 'good');
check('45 rates average', swolfRating(45) === 'average');
check('55 rates developing', swolfRating(55) === 'developing');
check('zero lengths throws', (() => { try { averageSwolf(72, 88, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
