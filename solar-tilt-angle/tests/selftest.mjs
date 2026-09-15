import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { yearRoundTilt, summerTilt, winterTilt } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }

check('40 deg year-round tilt = 40', yearRoundTilt(40) === 40);
check('southern latitude uses absolute value', yearRoundTilt(-33) === 33);
check('40 deg summer tilt = 25', summerTilt(40) === 25);
check('40 deg winter tilt = 55', winterTilt(40) === 55);
check('winter steeper than summer', winterTilt(40) > summerTilt(40));
check('summer tilt clamps at 0', summerTilt(10) === 0);
check('winter tilt clamps at 90', winterTilt(80) === 90);
check('higher latitude steeper tilt', yearRoundTilt(50) > yearRoundTilt(40));
check('latitude over 90 throws', (() => { try { yearRoundTilt(95); return false; } catch(e){ return true; } })());
check('latitude below -90 throws', (() => { try { yearRoundTilt(-100); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
