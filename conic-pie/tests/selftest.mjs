import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isHex, conicPie } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('two equal segments split at 180deg', () => {
  assert.equal(conicPie([{ color: '#ff0000', value: 1 }, { color: '#00ff00', value: 1 }]),
    'conic-gradient(from 0deg, #ff0000 0deg 180deg, #00ff00 180deg 360deg)');
});

check('25/75 split', () => {
  assert.equal(conicPie([{ color: '#f00', value: 25 }, { color: '#0f0', value: 75 }]),
    'conic-gradient(from 0deg, #f00 0deg 90deg, #0f0 90deg 360deg)');
});

check('single segment fills the circle', () => {
  assert.equal(conicPie([{ color: '#123456', value: 5 }]),
    'conic-gradient(from 0deg, #123456 0deg 360deg)');
});

check('start angle (from) flows through', () => {
  assert.ok(conicPie([{ color: '#000', value: 1 }], { from: 90 }).startsWith('conic-gradient(from 90deg,'));
});

check('three segments sum to 360', () => {
  const css = conicPie([{ color: '#f00', value: 1 }, { color: '#0f0', value: 1 }, { color: '#00f', value: 1 }]);
  // last stop must end at 360
  assert.ok(/360deg\)$/.test(css));
  assert.ok(css.includes('#0f0 120deg 240deg'));
});

check('values act as proportions regardless of scale', () => {
  const a = conicPie([{ color: '#f00', value: 1 }, { color: '#0f0', value: 3 }]);
  const b = conicPie([{ color: '#f00', value: 10 }, { color: '#0f0', value: 30 }]);
  assert.equal(a, b);
  assert.ok(a.includes('#f00 0deg 90deg'));
});

check('rejects empty and all-zero', () => {
  assert.throws(() => conicPie([]), /at least one segment/);
  assert.throws(() => conicPie([{ color: '#f00', value: 0 }]), /total must be positive/);
});

check('rejects negative value and bad hex', () => {
  assert.throws(() => conicPie([{ color: '#f00', value: -1 }]), /non-negative/);
  assert.throws(() => conicPie([{ color: 'red', value: 1 }]), /invalid hex/);
});

check('a zero-value segment among others is a no-width stop', () => {
  const css = conicPie([{ color: '#f00', value: 1 }, { color: '#0f0', value: 0 }, { color: '#00f', value: 1 }]);
  assert.ok(css.includes('#0f0 180deg 180deg')); // zero width
});

check('isHex helper', () => {
  assert.ok(isHex('#abc'));
  assert.ok(isHex('#aabbcc'));
  assert.ok(!isHex('abc'));
});

console.log(`\n${n} checks passed.`);
