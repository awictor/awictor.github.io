import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { handrailInRange, balustersNeeded, actualGap } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('36 in handrail is in range', handrailInRange(36) === true);
check('30 in handrail too low', handrailInRange(30) === false);
check('40 in handrail too high', handrailInRange(40) === false);
check('48 in run, 1.5 baluster, 4 gap = 8', balustersNeeded(48, 1.5, 4) === 8);
check('longer run more balusters', balustersNeeded(96, 1.5, 4) > balustersNeeded(48, 1.5, 4));
check('48 run, 1.5 width, 8 balusters gap = 4', near(actualGap(48, 1.5, 8), 4));
check('actual gap within limit for computed count', actualGap(48, 1.5, balustersNeeded(48, 1.5, 4)) <= 4 + 1e-9);
check('wider gap allowance fewer balusters', balustersNeeded(48, 1.5, 6) < balustersNeeded(48, 1.5, 4));
check('zero run throws', (() => { try { balustersNeeded(0, 1.5, 4); return false; } catch(e){ return true; } })());
check('negative width throws', (() => { try { balustersNeeded(48, -1, 4); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
