import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { blobRadius, randomBlob, blobCss } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('blobRadius builds the two-axis shorthand', () => {
  assert.equal(
    blobRadius([30, 70, 70, 30, 30, 70, 70, 30]),
    '30% 70% 70% 30% / 30% 70% 70% 30%'
  );
});

check('blobRadius accepts numeric strings', () => {
  assert.equal(blobRadius(['10', '20', '30', '40', '50', '60', '70', '80']),
    '10% 20% 30% 40% / 50% 60% 70% 80%');
});

check('blobRadius rejects wrong length', () => {
  assert.throws(() => blobRadius([1, 2, 3]), /exactly 8/);
  assert.throws(() => blobRadius('nope'), /exactly 8/);
});

check('blobRadius rejects out-of-range values', () => {
  assert.throws(() => blobRadius([0, 0, 0, 0, 0, 0, 0, 101]), /between 0 and 100/);
  assert.throws(() => blobRadius([-1, 0, 0, 0, 0, 0, 0, 0]), /between 0 and 100/);
});

check('randomBlob is deterministic given an rng', () => {
  const mid = randomBlob(() => 0.5);
  assert.deepEqual(mid, [50, 50, 50, 50, 50, 50, 50, 50]); // 25 + 0.5*50
  const lo = randomBlob(() => 0);
  assert.deepEqual(lo, [25, 25, 25, 25, 25, 25, 25, 25]);
});

check('randomBlob stays within the 25–75 band', () => {
  let seed = 0;
  const rng = () => { seed += 0.137; return seed % 1; };
  const vals = randomBlob(rng);
  assert.equal(vals.length, 8);
  assert.ok(vals.every(v => v >= 25 && v <= 75));
});

check('randomBlob output is valid blobRadius input', () => {
  const css = blobRadius(randomBlob(() => 0.3));
  assert.ok(/^\d+% \d+% \d+% \d+% \/ \d+% \d+% \d+% \d+%$/.test(css));
});

check('blobCss composes size, radius and color', () => {
  const css = blobCss([60, 40, 55, 45, 45, 55, 45, 55], { size: 200, color: '#ff0000' });
  assert.ok(css.includes('width: 200px;'));
  assert.ok(css.includes('height: 200px;'));
  assert.ok(css.includes('border-radius: 60% 40% 55% 45% / 45% 55% 45% 55%;'));
  assert.ok(css.includes('background: #ff0000;'));
});

check('blobCss has defaults', () => {
  const css = blobCss([50, 50, 50, 50, 50, 50, 50, 50]);
  assert.ok(css.includes('width: 220px;'));
  assert.ok(css.includes('background: #d946ef;'));
});

check('blobCss propagates radius validation errors', () => {
  assert.throws(() => blobCss([1, 2, 3], {}), /exactly 8/);
});

console.log(`\n${n} checks passed.`);
