import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { lbToKg, proteinGrams, perMeal } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b, tol){ return Math.abs(a - b) < (tol || 1e-6); }

check('80 kg at 1.6 needs 128 g', near(proteinGrams(80, 1.6), 128));
check('80 kg at 0.8 (RDA) needs 64 g', near(proteinGrams(80, 0.8), 64));
check('higher factor means more protein', proteinGrams(80, 2.2) > proteinGrams(80, 1.6));
check('heavier person needs more protein', proteinGrams(100, 1.6) > proteinGrams(80, 1.6));
check('176 lb is about 79.83 kg', near(lbToKg(176), 79.83, 0.01));
check('128 g over 4 meals is 32 g', near(perMeal(128, 4), 32));
check('more meals means less per meal', perMeal(128, 5) < perMeal(128, 4));
check('zero weight throws', (() => { try { proteinGrams(0, 1.6); return false; } catch(e){ return true; } })());
check('zero factor throws', (() => { try { proteinGrams(80, 0); return false; } catch(e){ return true; } })());
check('zero meals throws', (() => { try { perMeal(128, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
