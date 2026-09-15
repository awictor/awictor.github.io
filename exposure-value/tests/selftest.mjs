import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { ev, evWithISO, shutterForEV, apertureForEV } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-6) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('EV = log2(N²/t)', () => {
  near(ev(1, 1), 0);
  near(ev(2, 0.25), 4); // 4/0.25 = 16 → log2 = 4
  near(ev(1.4, 0.5), Math.log2(1.96 / 0.5));
});

check('Sunny 16: f/16 at 1/125 ≈ EV 15', () => {
  assert.ok(Math.abs(ev(16, 1 / 125) - 15) < 0.05);
});

check('one stop of aperture (×√2) adds 1 EV', () => {
  near(ev(2, 0.5) + 1, ev(2 * Math.SQRT2, 0.5), 1e-9);
});

check('halving shutter time adds 1 EV', () => {
  near(ev(4, 0.01) + 1, ev(4, 0.005));
});

check('ISO adjustment subtracts log2(ISO/100)', () => {
  near(evWithISO(16, 1 / 125, 100), ev(16, 1 / 125));
  near(evWithISO(16, 1 / 125, 200), ev(16, 1 / 125) - 1);
  near(evWithISO(16, 1 / 125, 400), ev(16, 1 / 125) - 2);
});

check('shutterForEV inverts ev', () => {
  for (const [N, t] of [[16, 1 / 125], [2.8, 1 / 60], [5.6, 0.5]]) {
    near(shutterForEV(ev(N, t), N), t);
  }
});

check('apertureForEV inverts ev', () => {
  for (const [N, t] of [[8, 1 / 250], [4, 1 / 30]]) {
    near(apertureForEV(ev(N, t), t), N);
  }
});

check('equivalent exposures share the same EV', () => {
  // f/2.8 @ 1/500 and f/5.6 @ 1/125 are two stops each way → same EV
  near(ev(2.8, 1 / 500), ev(5.6, 1 / 125));
});

check('brighter scene → higher EV', () => {
  assert.ok(ev(16, 1 / 500) > ev(2, 1 / 30));
});

check('validation: non-positive inputs and bad EV throw', () => {
  assert.throws(() => ev(0, 1), /aperture must be positive/);
  assert.throws(() => ev(2, 0), /shutter time must be positive/);
  assert.throws(() => evWithISO(16, 0.01, 0), /ISO must be positive/);
  assert.throws(() => shutterForEV(NaN, 4), /EV must be/);
});

console.log(`\n${n} checks passed.`);
