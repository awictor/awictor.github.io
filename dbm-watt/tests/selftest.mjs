import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dbmToMilliwatts, dbmToWatts, wattsToDbm, milliwattsToDbm, applyGain } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// 0 dBm = 1 mW = 0.001 W
check('0 dBm is 1 mW', near(dbmToMilliwatts(0), 1));
check('0 dBm is 0.001 W', near(dbmToWatts(0), 0.001));
// 30 dBm = 1 W
check('30 dBm is 1 W', near(dbmToWatts(30), 1));
check('30 dBm is 1000 mW', near(dbmToMilliwatts(30), 1000));
// +3 dB roughly doubles power
check('+3 dB doubles power', near(dbmToMilliwatts(3), 1.99526231, 1e-6));
// watts -> dBm round trip
check('1 W is 30 dBm', near(wattsToDbm(1), 30, 1e-9));
check('watts round-trips through dBm', near(wattsToDbm(dbmToWatts(17.5)), 17.5, 1e-9));
// milliwattsToDbm
check('1 mW is 0 dBm', near(milliwattsToDbm(1), 0));
check('100 mW is 20 dBm', near(milliwattsToDbm(100), 20));
// gain adds in dB domain
check('gain adds in dB', near(applyGain(10, 12), 22) && near(applyGain(5, -8), -3));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
