import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { add, subtract, multiply, divide, modulus, argument, conjugate, toPolar, fromPolar } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);
const nearZ = (z, re, im, e = 1e-9) => { near(z.re, re, e); near(z.im, im, e); };

check('addition and subtraction are component-wise', () => {
  nearZ(add({ re: 1, im: 2 }, { re: 3, im: 4 }), 4, 6);
  nearZ(subtract({ re: 5, im: 5 }, { re: 1, im: 2 }), 4, 3);
});

check('(1+i)² = 2i', () => {
  nearZ(multiply({ re: 1, im: 1 }, { re: 1, im: 1 }), 0, 2);
});

check('i² = −1', () => {
  nearZ(multiply({ re: 0, im: 1 }, { re: 0, im: 1 }), -1, 0);
});

check('1 / i = −i', () => {
  nearZ(divide({ re: 1, im: 0 }, { re: 0, im: 1 }), 0, -1);
});

check('division inverts multiplication', () => {
  const a = { re: 3, im: -2 }, b = { re: 1, im: 4 };
  nearZ(divide(multiply(a, b), b), a.re, a.im);
});

check('modulus |3+4i| = 5', () => {
  near(modulus({ re: 3, im: 4 }), 5);
  near(modulus({ re: 0, im: 0 }), 0);
});

check('argument of i is π/2; of 1 is 0', () => {
  near(argument({ re: 0, im: 1 }), Math.PI / 2);
  near(argument({ re: 1, im: 0 }), 0);
  near(argument({ re: -1, im: 0 }), Math.PI);
});

check('z · conj(z) = |z|² (real)', () => {
  const z = { re: 3, im: 4 };
  const p = multiply(z, conjugate(z));
  near(p.re, 25); near(p.im, 0);
});

check('polar round trip', () => {
  for (const z of [{ re: 3, im: 4 }, { re: -2, im: 5 }, { re: 1, im: -1 }]) {
    const p = toPolar(z);
    nearZ(fromPolar(p.r, p.theta), z.re, z.im);
  }
});

check('validation: bad parts and divide-by-zero throw', () => {
  assert.throws(() => add({ re: NaN, im: 0 }, { re: 1, im: 1 }), /finite number/);
  assert.throws(() => divide({ re: 1, im: 1 }, { re: 0, im: 0 }), /divide by zero/);
  assert.throws(() => fromPolar(-1, 0), /zero or positive/);
});

console.log(`\n${n} checks passed.`);
