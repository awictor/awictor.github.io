import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ata, problemGasCuft, ascentGasCuft, stopGasCuft, rockBottomCuft, cuftToPsi } = globalThis.__t;

let passed = 0;
function check(name, cond) { if (cond) { passed++; console.log('ok - ' + name); } else { console.log('FAIL - ' + name); } }
function near(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-6); }

// ATA: 33 ft of seawater doubles pressure; surface is 1 ATA
check('ata at 33 ft is 2', near(ata(33), 2));
check('ata at surface is 1', near(ata(0), 1));
// Problem-solving gas at 99 ft (4 ATA), SAC 1, 2 divers, 1 min = 8 cu ft
check('problem gas = SAC x ATA x min x divers', near(problemGasCuft(1, 99, { divers: 2 }), 8));
// Safety stop: 15 ft = 1.4545 ATA, 3 min, 2 divers
check('stop gas at 15 ft for 3 min x 2', near(stopGasCuft(1, { divers: 2 }), (15/33 + 1) * 3 * 2));
// Ascent from 99 -> 15 ft at 30 ft/min = 2.8 min at avg 2.7273 ATA, 2 divers
check('ascent gas over the climb', near(ascentGasCuft(1, 99, { divers: 2, ascentRate: 30 }), 15.2727272, 1e-5));
// Total rock bottom is the sum of the three phases
check('rock bottom sums the phases', near(rockBottomCuft(1, 99, { divers: 2, ascentRate: 30 }), 32, 1e-4));
// No ascent gas needed when already at/above the stop depth
check('no ascent gas at or above stop depth', ascentGasCuft(1, 10, { divers: 2 }) === 0);
// Pressure conversion from a full 80 cu ft / 3000 psi tank
check('cuft-to-psi scales with the tank', cuftToPsi(80, 80, 3000) === 3000 && cuftToPsi(40, 80, 3000) === 1500);
// Deeper dives always need more reserve
check('deeper needs more gas', rockBottomCuft(0.75, 120, {}) > rockBottomCuft(0.75, 60, {}));
// Every phase scales linearly with diver count
check('reserve scales linearly with divers', near(rockBottomCuft(0.8, 90, { divers: 4 }), 2 * rockBottomCuft(0.8, 90, { divers: 2 })));

console.log(passed + ' checks passed.');
if (passed !== 10) process.exit(1);
