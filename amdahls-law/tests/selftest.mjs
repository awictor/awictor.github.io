import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { amdahl, gustafson, maxSpeedup, efficiency } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);

check('Amdahl 90% parallel on 4 cores', () => {
  near(amdahl(0.9, 4), 1 / (0.1 + 0.9 / 4)); // = 3.076923...
  near(amdahl(0.9, 4), 3.0769230769, 1e-6);
});

check('Amdahl on 1 core is always 1x', () => {
  for (const p of [0, 0.25, 0.5, 0.9, 1]) assert.equal(amdahl(p, 1), 1);
});

check('p=0 (fully serial): no speedup on any core count', () => {
  for (const c of [1, 2, 8, 100]) near(amdahl(0, c), 1);
});

check('p=1 (fully parallel): Amdahl equals core count', () => {
  for (const c of [1, 2, 8, 64]) near(amdahl(1, c), c);
});

check('Gustafson is linear: (1-p) + p*n', () => {
  near(gustafson(0.9, 4), 0.1 + 0.9 * 4); // 3.7
  near(gustafson(0.9, 4), 3.7);
  near(gustafson(0.5, 10), 5.5);
});

check('Gustafson bounds: p=0 stays 1x, p=1 equals cores', () => {
  for (const c of [1, 4, 32]) { near(gustafson(0, c), 1); near(gustafson(1, c), c); }
});

check('maxSpeedup caps at 1/(1-p)', () => {
  near(maxSpeedup(0.9), 10);
  near(maxSpeedup(0.75), 4);
  near(maxSpeedup(0.5), 2);
  assert.equal(maxSpeedup(1), Infinity);
});

check('Amdahl approaches its cap but never exceeds it', () => {
  const cap = maxSpeedup(0.95); // 20
  assert.ok(amdahl(0.95, 1e6) < cap);
  assert.ok(amdahl(0.95, 1e6) > cap - 0.01);
});

check('efficiency = speedup / cores, in (0,1]', () => {
  near(efficiency(0.9, 4), amdahl(0.9, 4) / 4);
  assert.equal(efficiency(1, 8), 1);        // perfect scaling
  assert.equal(efficiency(0, 8), 1 / 8);    // serial: 1x over 8 cores
});

check('validation: bad fraction or core count throws', () => {
  assert.throws(() => amdahl(-0.1, 4), /between 0 and 1/);
  assert.throws(() => amdahl(1.5, 4), /between 0 and 1/);
  assert.throws(() => amdahl(0.9, 0), /positive integer/);
  assert.throws(() => gustafson(0.9, 2.5), /positive integer/);
});

console.log(`\n${n} checks passed.`);
