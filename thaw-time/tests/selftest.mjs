import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { toPounds, fridgeThawHours, fridgeThawDays, coldWaterThawMinutes } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('fridge 5 lb = 24 hr', near(fridgeThawHours(5), 24));
check('fridge 10 lb = 48 hr', near(fridgeThawHours(10), 48));
check('cold water 1 lb = 30 min', near(coldWaterThawMinutes(1), 30));
check('cold water 12 lb = 360 min', near(coldWaterThawMinutes(12), 360));
check('fridge days 5 lb = 1 day', near(fridgeThawDays(5), 1));
check('heavier takes longer in fridge', fridgeThawHours(10) > fridgeThawHours(5));
check('cold water beats fridge for same weight', coldWaterThawMinutes(5) < fridgeThawHours(5) * 60);
check('kg converts to pounds', near(toPounds(1, 'kg'), 2.2046226218));
check('lb passes through unchanged', near(toPounds(3, 'lb'), 3));
check('zero weight throws', (() => { try { fridgeThawHours(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
