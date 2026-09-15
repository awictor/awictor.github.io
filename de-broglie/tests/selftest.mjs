import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { wavelengthFromMomentum, wavelengthFromMassVelocity, wavelengthFromKineticEnergy, momentumFromWavelength, H } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}
const rel = (a, b, t = 1e-9) => Math.abs(a - b) / Math.abs(b) < t;

const me = 9.1093837015e-31; // electron mass
const mp = 1.67262192369e-27; // proton mass

// 1. Electron at 1e6 m/s -> ~7.27388e-10 m.
check('electron mv wavelength', rel(wavelengthFromMassVelocity(me, 1e6), 7.273895e-10, 1e-5));
// 2. Momentum equal to h gives wavelength exactly 1 m.
check('lambda from p=h is 1', wavelengthFromMomentum(H) === 1);
// 3. momentumFromWavelength inverts wavelengthFromMomentum.
check('momentum round trip', rel(momentumFromWavelength(wavelengthFromMomentum(3e-24)), 3e-24));
// 4. KE path equals mv path when E = 1/2 m v^2 (since sqrt(2mE)=mv).
check('KE path == mv path', rel(wavelengthFromKineticEnergy(me, 0.5 * me * 1e12), wavelengthFromMassVelocity(me, 1e6)));
// 5. Heavier particle at same speed -> shorter wavelength.
check('proton shorter than electron', wavelengthFromMassVelocity(mp, 1e6) < wavelengthFromMassVelocity(me, 1e6));
// 6. Faster velocity -> shorter wavelength.
check('faster is shorter', wavelengthFromMassVelocity(me, 2e6) < wavelengthFromMassVelocity(me, 1e6));
// 7. momentumFromWavelength(1) == H.
check('p from lambda=1 is H', momentumFromWavelength(1) === H);
// 8. wavelengthFromMomentum matches h/p directly.
check('lambda = h/p', rel(wavelengthFromMomentum(1e-23), H / 1e-23));
// 9. Doubling momentum halves the wavelength.
check('double p halves lambda', rel(wavelengthFromMomentum(2e-24), wavelengthFromMomentum(1e-24) / 2));
// 10. wavelengthFromKineticEnergy equals h/sqrt(2mE).
check('KE explicit formula', rel(wavelengthFromKineticEnergy(mp, 1e-18), H / Math.sqrt(2 * mp * 1e-18)));

console.log(passed + ' checks passed.');
