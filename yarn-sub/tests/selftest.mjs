import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { totalYardage, withMargin, substituteSkeins } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-9; }

check('10 skeins of 220 yd is 2200 yd', near(totalYardage(10, 220), 2200));
check('10% margin on 2200 is 2420', near(withMargin(2200, 10), 2420));
check('2420 yd of 380 yd skeins is 7', substituteSkeins(2420, 380) === 7);
check('same yardage same skeins needs 10', substituteSkeins(2200, 220) === 10);
check('bigger substitute skein needs fewer', substituteSkeins(2200, 440) < substituteSkeins(2200, 220));
check('zero waste leaves total unchanged', near(withMargin(2000, 0), 2000));
check('skeins always round up', substituteSkeins(2201, 220) === 11);
check('bigger pattern is more total yardage', totalYardage(12, 220) > totalYardage(10, 220));
check('zero substitute yards throws', (() => { try { substituteSkeins(2200, 0); return false; } catch(e){ return true; } })());
check('zero pattern skeins throws', (() => { try { totalYardage(0, 220); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
