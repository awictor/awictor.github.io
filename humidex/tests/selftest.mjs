import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { vapourPressure, humidex, category } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('Environment Canada example: 30°C / dew 15°C ≈ 34', () => {
  assert.ok(Math.abs(humidex(30, 15) - 34) < 0.5);
});

check('vapour pressure rises with dew point', () => {
  assert.ok(vapourPressure(20) > vapourPressure(10));
  assert.ok(vapourPressure(10) > vapourPressure(0));
});

check('vapour pressure ~6.11 hPa at 0°C dew point', () => {
  assert.ok(Math.abs(vapourPressure(0) - 6.11) < 0.02);
});

check('humidex increases with dew point at fixed temperature', () => {
  assert.ok(humidex(30, 20) > humidex(30, 10));
});

check('humidex increases with temperature at fixed dew point', () => {
  assert.ok(humidex(35, 15) > humidex(30, 15));
});

check('a hot humid day feels dangerous', () => {
  const h = humidex(38, 28);
  assert.ok(h > 46);
  assert.equal(category(h), 'Dangerous — heat stroke likely');
});

check('category boundaries', () => {
  assert.equal(category(29), 'Comfortable');
  assert.equal(category(30), 'Some discomfort');
  assert.equal(category(39), 'Some discomfort');
  assert.equal(category(40), 'Great discomfort — avoid exertion');
  assert.equal(category(45), 'Great discomfort — avoid exertion');
  assert.equal(category(46), 'Dangerous — heat stroke likely');
});

check('humidex adds the humidity term to the base temperature', () => {
  // when e = 10 (dew point where vapourPressure = 10), humidex == temperature
  // vapourPressure ~10 hPa around dew point ~7°C; just check the formula shape
  const t = 25, e = vapourPressure(12);
  assert.ok(Math.abs(humidex(t, 12) - (t + 0.5555 * (e - 10))) < 1e-9);
});

check('handles negative dew points', () => {
  assert.ok(vapourPressure(-10) > 0);
  assert.ok(vapourPressure(-10) < vapourPressure(0));
});

check('validation: non-finite inputs throw', () => {
  assert.throws(() => humidex(NaN, 15), /temperature must be a finite number/);
  assert.throws(() => vapourPressure('x'), /dew point must be a finite number/);
  assert.throws(() => category('x'), /humidex must be a number/);
});

console.log(`\n${n} checks passed.`);
