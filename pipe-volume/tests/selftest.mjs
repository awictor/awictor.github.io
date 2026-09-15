import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { pipeVolumeCuIn, pipeVolumeGallons, pipeVolumeLiters } = globalThis.__t;

let passed = 0;
function check(name, cond){ if(cond){ passed++; } else { console.error('FAIL: ' + name); } }
function near(a, b){ return Math.abs(a - b) < 1e-6; }

check('2 in dia, 1 ft ≈ 37.70 cu in', near(pipeVolumeCuIn(2, 1), Math.PI * 1 * 12));
check('bigger diameter holds more', pipeVolumeCuIn(4, 1) > pipeVolumeCuIn(2, 1));
check('longer pipe holds more', pipeVolumeCuIn(2, 10) > pipeVolumeCuIn(2, 1));
check('2 in, 1 ft ≈ 0.1632 gallons', near(pipeVolumeGallons(2, 1), Math.PI * 12 / 231));
check('doubling diameter quadruples volume', near(pipeVolumeCuIn(4, 1), 4 * pipeVolumeCuIn(2, 1)));
check('liters = gallons x 3.785', near(pipeVolumeLiters(2, 1), pipeVolumeGallons(2, 1) * 3.785411784));
check('1 in, 10 ft ≈ 94.25 cu in', near(pipeVolumeCuIn(1, 10), Math.PI * 0.25 * 120));
check('gallons scale with length', near(pipeVolumeGallons(2, 20), 20 * pipeVolumeGallons(2, 1)));
check('zero diameter throws', (() => { try { pipeVolumeCuIn(0, 10); return false; } catch(e){ return true; } })());
check('zero length throws', (() => { try { pipeVolumeCuIn(2, 0); return false; } catch(e){ return true; } })());

console.log(passed + ' checks passed.');
if(passed !== 10) process.exit(1);
