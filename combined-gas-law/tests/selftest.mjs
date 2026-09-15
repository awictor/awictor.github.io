import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { finalPressure, finalVolume, finalTemp, boyleV2, charlesV2, gayLussacP2 } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-9); }

// Isothermal halving of volume doubles pressure (Boyle)
check('halving volume doubles pressure', near(finalPressure(1, 1, 300, 0.5, 300), 2));
// Constant pressure, doubling temp doubles volume (Charles)
check('doubling temp doubles volume', near(finalVolume(1, 1, 300, 1, 600), 2));
// Constant volume, doubling pressure requires double temp (Gay-Lussac)
check('final temperature from state change', near(finalTemp(1, 1, 300, 2, 1), 600));
// Sub-laws
check("Boyle's law V2", near(boyleV2(1, 2, 4), 0.5));
check("Charles's law V2", near(charlesV2(1, 300, 600), 2));
check("Gay-Lussac's law P2", near(gayLussacP2(1, 300, 600), 2));
// The invariant P1V1/T1 = P2V2/T2 holds for a solved P2
check('combined ratio is conserved', (function(){
  const p2 = finalPressure(2, 3, 350, 1.5, 400);
  return near(2 * 3 / 350, p2 * 1.5 / 400);
})());
// Full combined change: P doubles and T doubles -> V unchanged
check('P and T both double leaves volume equal', near(finalVolume(1, 5, 300, 2, 600), 5));
// Cooling at constant volume drops pressure
check('cooling drops pressure', finalPressure(2, 1, 400, 1, 200) < 2);
// finalTemp inverts finalPressure
check('temperature solve inverts pressure solve', (function(){
  const p2 = finalPressure(1, 2, 300, 1, 450);   // constant V=... actually v2=1
  return near(finalTemp(1, 2, 300, p2, 1), 450);
})());

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
