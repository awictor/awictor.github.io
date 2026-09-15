import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseTire, tireSpec, compare } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('parseTire reads width/aspect/rim', () => {
  assert.deepEqual(parseTire('225/45R17'), { width: 225, aspect: 45, rim: 17 });
  assert.deepEqual(parseTire('285/30ZR20'), { width: 285, aspect: 30, rim: 20 }); // ZR
  assert.deepEqual(parseTire(' 205 / 55 r 16 '), { width: 205, aspect: 55, rim: 16 }); // spaces, lowercase
});

check('parseTire validation', () => {
  assert.throws(() => parseTire('nope'), /format/);
  assert.throws(() => parseTire('999/45R17'), /width/);
  assert.throws(() => parseTire('225/10R17'), /aspect/);
});

check('sidewall = width × aspect%', () => {
  const s = tireSpec('225/45R17');
  near(s.sidewall, 101.25, 1e-6);   // 225 * 0.45
});

check('overall diameter = rim + 2·sidewall', () => {
  const s = tireSpec('225/45R17');
  // 17*25.4 = 431.8 ; + 2*101.25 = 634.3 mm
  near(s.diameter, 634.3, 1e-6);
  near(s.diameterIn, 634.3 / 25.4, 1e-6);
});

check('circumference = π·diameter', () => {
  const s = tireSpec('225/45R17');
  near(s.circumference, Math.PI * 634.3, 1e-6);
});

check('revolutions per mile and km', () => {
  const s = tireSpec('225/45R17');
  near(s.revsPerMile, 1609344 / (Math.PI * 634.3), 1e-6);
  near(s.revsPerKm, 1000000 / (Math.PI * 634.3), 1e-6);
});

check('identical tires: no error', () => {
  const c = compare('225/45R17', '225/45R17');
  near(c.diffPct, 0, 1e-9);
  near(c.indicatedAt60, 60, 1e-9);
});

check('wider-profile new tire is larger and speedo under-reads', () => {
  // 235/45R17 diameter = 431.8 + 2*(235*.45=105.75) = 431.8+211.5 = 643.3
  const c = compare('225/45R17', '235/45R17');
  near(c.newDia, 643.3, 1e-6);
  assert.ok(c.diffPct > 0);                       // bigger
  assert.ok(c.indicatedAt60 < 60);                // under-reads
  near(c.indicatedAt60, 60 * (634.3 / 643.3), 1e-6);
});

check('smaller new tire makes speedo over-read', () => {
  const c = compare('225/45R17', '205/45R17');
  assert.ok(c.diffPct < 0);
  assert.ok(c.indicatedAt60 > 60);
});

check('plus-sizing to keep diameter ~equal (225/45R17 → 245/40R17)', () => {
  // 245/40R17: 431.8 + 2*(98) = 627.8 ; ~1% smaller
  const c = compare('225/45R17', '245/40R17');
  assert.ok(Math.abs(c.diffPct) < 1.5);
});

console.log(`\n${n} checks passed.`);
