import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { energyFromWavelength, wavelengthFromEnergy, frequencyFromWavelength, energyFromFrequency, joulesToEv, evToJoules, H, EV } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const rel = (a, b) => Math.abs(a - b) / Math.abs(b) < 1e-9;

// 1. 500 nm photon energy in joules = 3.972891714e-19 J.
check('E(500nm) joules', rel(energyFromWavelength(500e-9), 3.972891714e-19));
// 2. Same photon in eV ~ 2.4797.
check('E(500nm) eV', Math.abs(joulesToEv(energyFromWavelength(500e-9)) - 2.4797) < 1e-3);
// 3. 500 nm frequency = 5.99584916e14 Hz.
check('f(500nm)', rel(frequencyFromWavelength(500e-9), 5.99584916e14));
// 4. E = hf equals E = hc/λ (consistency round trip).
check('hf == hc/lambda', rel(energyFromFrequency(frequencyFromWavelength(632.8e-9)), energyFromWavelength(632.8e-9)));
// 5. wavelengthFromEnergy inverts energyFromWavelength.
check('wavelength<->energy round trip', rel(wavelengthFromEnergy(energyFromWavelength(450e-9)), 450e-9));
// 6. 1 eV -> joules is exactly the SI defining constant.
check('evToJoules(1)', evToJoules(1) === EV);
// 7. joulesToEv inverts evToJoules.
check('eV round trip', rel(joulesToEv(evToJoules(3.3)), 3.3));
// 8. A 1 Hz photon carries exactly H joules.
check('E(1 Hz) = H', energyFromFrequency(1) === H);
// 9. Standard: a 1 eV photon has wavelength ~ 1239.84 nm.
check('1 eV -> 1239.84 nm', Math.abs(wavelengthFromEnergy(evToJoules(1)) * 1e9 - 1239.84) < 0.01);
// 10. Shorter wavelength carries more energy.
check('400nm > 700nm energy', energyFromWavelength(400e-9) > energyFromWavelength(700e-9));

console.log(passed + ' checks passed.');
