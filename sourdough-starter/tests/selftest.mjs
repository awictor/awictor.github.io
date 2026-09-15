import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { flourToAdd, waterToAdd, totalAfterFeed, starterForTarget } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('20 g fed 1:5 takes 100 g flour', near(flourToAdd(20, 5), 100));
check('20 g fed 1:5 takes 100 g water', near(waterToAdd(20, 5), 100));
check('20 g at 1:5:5 totals 220 g', near(totalAfterFeed(20, 5, 5), 220));
check('220 g target at 1:5:5 keeps 20 g', near(starterForTarget(220, 5, 5), 20));
check('higher ratio adds more flour', flourToAdd(20, 8) > flourToAdd(20, 5));
check('round trip keep to total to keep', near(starterForTarget(totalAfterFeed(20, 5, 5), 5, 5), 20));
check('50 g at 1:1:1 totals 150 g', near(totalAfterFeed(50, 1, 1), 150));
check('zero starter adds no flour', flourToAdd(0, 5) === 0);
check('negative ratio throws', (() => { try { flourToAdd(20, -1); return false; } catch(e){ return true; } })());
check('negative starter throws', (() => { try { totalAfterFeed(-5, 5, 5); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
