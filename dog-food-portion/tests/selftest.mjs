import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lbToKg, rer, dailyCalories, cupsPerDay } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 0.1; }

check('RER of 10 kg ≈ 393.6 kcal', near(rer(10), 70 * Math.pow(10, 0.75)));
check('2.2046 lb = 1 kg', near(lbToKg(2.2046226218), 1));
check('10 kg neutered adult ≈ 629.8 kcal', near(dailyCalories(10, 1.6), rer(10) * 1.6));
check('700 kcal / 350 per cup = 2 cups', near(cupsPerDay(700, 350), 2));
check('350 kcal / 350 per cup = 1 cup', near(cupsPerDay(350, 350), 1));
check('heavier dog needs more calories', dailyCalories(20, 1.6) > dailyCalories(10, 1.6));
check('higher activity needs more calories', dailyCalories(10, 2.0) > dailyCalories(10, 1.6));
check('RER grows with weight', rer(30) > rer(10));
check('zero weight throws', (() => { try { rer(0); return false; } catch(e){ return true; } })());
check('zero kcal per cup throws', (() => { try { cupsPerDay(700, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
