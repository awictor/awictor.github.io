import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { PER_YEAR, dogYears, catYears, epigenetic } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, eps) => assert.ok(Math.abs(a - b) < eps, `${a} !~ ${b} (±${eps})`);

check('dog first two years: 15 then 24', () => {
  assert.equal(dogYears(1, 'medium'), 15);
  assert.equal(dogYears(2, 'medium'), 24);
});

check('dog years after 2 scale by size', () => {
  assert.equal(dogYears(3, 'medium'), 29);          // 24 + 5
  assert.equal(dogYears(5, 'small'), 24 + 3 * 4);   // 36
  assert.equal(dogYears(5, 'medium'), 24 + 3 * 5);  // 39
  assert.equal(dogYears(5, 'large'), 24 + 3 * 6);   // 42
});

check('size only matters after year 2', () => {
  assert.equal(dogYears(2, 'small'), dogYears(2, 'large'));
  assert.equal(dogYears(1.5, 'small'), dogYears(1.5, 'large'));
});

check('fractional puppy age is linear in year one', () => {
  assert.equal(dogYears(0.5, 'medium'), 7.5);
  assert.equal(dogYears(0, 'medium'), 0);
});

check('cat years', () => {
  assert.equal(catYears(1), 15);
  assert.equal(catYears(2), 24);
  assert.equal(catYears(5), 24 + 3 * 4);   // 36
});

check('epigenetic formula 16·ln(age)+31', () => {
  assert.equal(epigenetic(1), 31);                       // ln1 = 0
  near(epigenetic(4), 16 * Math.log(4) + 31, 1e-9);      // ≈ 53.18
  near(epigenetic(Math.E), 47, 1e-9);                    // 16*1 + 31
});

check('all methods increase with age (monotonic)', () => {
  assert.ok(dogYears(6, 'medium') > dogYears(5, 'medium'));
  assert.ok(catYears(6) > catYears(5));
  assert.ok(epigenetic(6) > epigenetic(5));
});

check('bigger dogs age faster past year 2', () => {
  assert.ok(dogYears(8, 'large') > dogYears(8, 'medium'));
  assert.ok(dogYears(8, 'medium') > dogYears(8, 'small'));
});

check('per-year table', () => {
  assert.deepEqual(PER_YEAR, { small: 4, medium: 5, large: 6 });
});

check('validation', () => {
  assert.throws(() => dogYears(-1, 'medium'), /age/);
  assert.throws(() => dogYears(3, 'giant'), /size/);
  assert.throws(() => catYears('x'), /age/);
  assert.throws(() => epigenetic(0), /age must be > 0/);
});

console.log(`\n${n} checks passed.`);
