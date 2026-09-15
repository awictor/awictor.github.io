import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { PLATES, perSideWeight, platesForSide, loadedWeight } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

const kg = PLATES.kg;
// 100kg on a 20kg bar -> 40 per side
check('per side is half of added weight', near(perSideWeight(100, 20), 40));
const r40 = platesForSide(40, kg);
check('40kg per side = one 25 + one 15', r40.used.length === 2 && r40.used[0].weight === 25 && r40.used[1].weight === 15);
check('40kg per side loads exactly', near(r40.remaining, 0));
check('loaded weight reconstructs total', near(loadedWeight(20, r40.used), 100));
// 102.5kg -> 41.25 per side -> 25 + 15 + 1.25
const r = platesForSide(perSideWeight(102.5, 20), kg);
check('102.5kg uses a 1.25 plate exactly', near(r.remaining, 0) && r.used.some(u => u.weight === 1.25));
// greedy picks heaviest first: 60 per side -> two 25 + one 10
const r60 = platesForSide(60, kg);
check('60kg per side = 25,25,10', r60.used[0].count === 2 && r60.used[0].weight === 25);
// non-exact target leaves a remainder
const rOdd = platesForSide(1, kg); // 1kg per side, smallest plate is 1.25
check('sub-minimum weight leaves remainder', rOdd.used.length === 0 && near(rOdd.remaining, 1));
// target below bar -> negative per side, no plates
check('below-bar target yields no plates', platesForSide(perSideWeight(10, 20), kg).used.length === 0);
// empty bar target equals bar weight
check('target equal to bar loads nothing', platesForSide(0, kg).used.length === 0 && near(loadedWeight(20, []), 20));
// lb set: 135 on a 45 bar -> 45 per side -> one 45
const rlb = platesForSide(perSideWeight(135, 45), PLATES.lb);
check('135lb on 45 bar = one 45 per side', rlb.used.length === 1 && rlb.used[0].weight === 45 && near(rlb.remaining, 0));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
