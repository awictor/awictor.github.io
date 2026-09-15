import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { recommendedPrecharge, drawdownPercent, drawdown } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-2; }

check('drawdown is positive', drawdown(20, 38, 40, 60) > 0);
check('20 gal tank 40/60 ~ 5.16 gal', near(drawdown(20, 38, 40, 60), 5.159));
check('bigger tank gives more drawdown', drawdown(40, 38, 40, 60) > drawdown(20, 38, 40, 60));
check('wider pressure band gives more drawdown', drawdown(20, 38, 40, 60) > drawdown(20, 38, 40, 50));
check('recommended precharge 40 = 38', recommendedPrecharge(40) === 38);
check('recommended precharge 50 = 48', recommendedPrecharge(50) === 48);
check('drawdown percent between 0 and 1', drawdownPercent(38, 40, 60) > 0 && drawdownPercent(38, 40, 60) < 1);
check('drawdown scales linearly with tank', near(drawdown(40, 38, 40, 60), 2 * drawdown(20, 38, 40, 60)));
check('cut-out below cut-in throws', (() => { try { drawdown(20, 38, 60, 40); return false; } catch(e){ return true; } })());
check('zero tank throws', (() => { try { drawdown(0, 38, 40, 60); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
