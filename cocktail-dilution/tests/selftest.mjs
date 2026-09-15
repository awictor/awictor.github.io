import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { dilutionFactor, blendedABV, totalVolume, finalVolume, finalABV } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Volume-weighted blend: 60ml@40% + 30ml@0% -> 2400/90 = 26.667%
check('blended ABV is volume-weighted', near(blendedABV([{ volume: 60, abv: 40 }, { volume: 30, abv: 0 }]), 2400 / 90));
check('single ingredient keeps its ABV', near(blendedABV([{ volume: 45, abv: 47 }]), 47));
check('total volume sums the pours', near(totalVolume([{ volume: 60, abv: 40 }, { volume: 30, abv: 16 }]), 90));
// Dilution factors ordered by technique
check('neat adds no water', dilutionFactor('neat') === 0);
check('shaking dilutes more than stirring', dilutionFactor('shake') > dilutionFactor('stir'));
// Neat leaves volume and ABV unchanged
check('neat keeps volume and ABV', near(finalVolume(90, 'neat'), 90) && near(finalABV(30, 'neat'), 30));
// Stirred: +24% volume, ABV / 1.24
check('stirred final volume grows 24%', near(finalVolume(100, 'stir'), 124));
check('stirred final ABV drops by the factor', near(finalABV(31, 'stir'), 31 / 1.24));
// Alcohol is conserved: startVol*startABV == finalVol*finalABV
check('alcohol content is conserved through dilution', near(90 * 26 / 100, finalVolume(90, 'shake') * finalABV(26, 'shake') / 100));
// Shaking yields a weaker drink than stirring for the same base
check('shaken is weaker than stirred', finalABV(30, 'shake') < finalABV(30, 'stir'));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
