import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { contain, cover } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };
const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

check('contain a 16:9 into an 800x800 box', () => {
  const r = contain(1600, 900, 800, 800);
  near(r.scale, 0.5);
  near(r.width, 800);
  near(r.height, 450);
});

check('cover a 16:9 into an 800x800 box', () => {
  const r = cover(1600, 900, 800, 800);
  near(r.scale, 800 / 900);
  near(r.height, 800);
  near(r.width, 1600 * (800 / 900));
});

check('contain uses the smaller scale, cover the larger', () => {
  assert.ok(contain(100, 100, 50, 200).scale <= cover(100, 100, 50, 200).scale);
  near(contain(100, 100, 50, 200).scale, 0.5);
  near(cover(100, 100, 50, 200).scale, 2);
});

check('contain fits inside the box (neither dimension exceeds)', () => {
  const r = contain(1234, 567, 300, 400);
  assert.ok(r.width <= 300 + 1e-9 && r.height <= 400 + 1e-9);
});

check('cover fills the box (neither dimension smaller)', () => {
  const r = cover(1234, 567, 300, 400);
  assert.ok(r.width >= 300 - 1e-9 && r.height >= 400 - 1e-9);
});

check('same aspect ratio: contain and cover agree and fill exactly', () => {
  const r1 = contain(200, 100, 800, 400), r2 = cover(200, 100, 800, 400);
  near(r1.scale, r2.scale);
  near(r1.width, 800); near(r1.height, 400);
});

check('aspect ratio is preserved', () => {
  const r = contain(1600, 900, 500, 500);
  near(r.width / r.height, 1600 / 900);
});

check('exact-fit box returns scale 1', () => {
  const r = contain(640, 480, 640, 480);
  near(r.scale, 1);
  near(r.width, 640); near(r.height, 480);
});

check('portrait content into landscape box', () => {
  const r = contain(600, 800, 400, 400); // scale min(0.666, 0.5)=0.5
  near(r.scale, 0.5);
  near(r.width, 300); near(r.height, 400);
});

check('validation: non-positive dimensions throw', () => {
  assert.throws(() => contain(0, 100, 50, 50), /content width must be a positive/);
  assert.throws(() => cover(100, 100, 50, 0), /box height must be a positive/);
});

console.log(`\n${n} checks passed.`);
