import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { mphToMinPerMile, mphToMinPerKm, minPerMileToMph } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('6 MPH = 10:00 per mile', near(mphToMinPerMile(6), 10));
check('10 MPH = 6:00 per mile', near(mphToMinPerMile(10), 6));
check('12 MPH = 5:00 per mile', near(mphToMinPerMile(12), 5));
check('10 min/mile = 6 MPH', near(minPerMileToMph(10), 6));
check('faster MPH gives lower pace', mphToMinPerMile(8) < mphToMinPerMile(6));
check('6 MPH ≈ 6.21 min/km', near(mphToMinPerKm(6), 60 / (6 * 1.609344)));
check('per-km pace is lower than per-mile', mphToMinPerKm(6) < mphToMinPerMile(6));
check('mph/pace round trip', near(minPerMileToMph(mphToMinPerMile(7.5)), 7.5));
check('zero mph throws', (() => { try { mphToMinPerMile(0); return false; } catch(e){ return true; } })());
check('zero pace throws', (() => { try { minPerMileToMph(0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
