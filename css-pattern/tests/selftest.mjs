import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { stripes, checkerboard, dots, toCss } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('stripes use a repeating linear gradient', () => {
  const d = stripes({ color1: '#f00', color2: '#00f', size: 20, angle: 45 });
  assert.match(d.background, /repeating-linear-gradient/);
  assert.match(d.background, /45deg/);
  assert.ok(d.background.includes('#f00') && d.background.includes('#00f'));
});

check('stripe period is twice the size', () => {
  const d = stripes({ size: 15 });
  assert.ok(d.background.includes('15px'));
  assert.ok(d.background.includes('30px'));   // 2 × size
});

check('stripes default angle and colors', () => {
  const d = stripes();
  assert.match(d.background, /0deg|45deg/);
  assert.ok(d.background.includes('#000000') && d.background.includes('#ffffff'));
});

check('checkerboard uses a conic gradient with a doubled tile', () => {
  const d = checkerboard({ color1: '#000', color2: '#fff', size: 20 });
  assert.match(d['background-image'], /conic-gradient/);
  assert.equal(d['background-size'], '40px 40px');
});

check('dots use a radial gradient sized by the spacing', () => {
  const d = dots({ color1: '#111', color2: '#eee', size: 24, radius: 5 });
  assert.match(d['background-image'], /radial-gradient/);
  assert.equal(d['background-color'], '#eee');
  assert.equal(d['background-size'], '24px 24px');
  assert.ok(d['background-image'].includes('5px'));
});

check('colors are substituted verbatim', () => {
  assert.ok(stripes({ color1: 'rebeccapurple' }).background.includes('rebeccapurple'));
  assert.ok(dots({ color1: 'tomato' })['background-image'].includes('tomato'));
});

check('toCss formats declarations', () => {
  const css = toCss({ 'background-image': 'x', 'background-size': '10px 10px' });
  assert.equal(css, 'background-image: x;\nbackground-size: 10px 10px;');
});

check('angle can be any number', () => {
  assert.match(stripes({ angle: 135 }).background, /135deg/);
  assert.match(stripes({ angle: 0 }).background, /0deg/);
});

check('size validation', () => {
  assert.throws(() => stripes({ size: 0 }), /size/);
  assert.throws(() => checkerboard({ size: -1 }), /size/);
  assert.throws(() => dots({ size: 20, radius: 0 }), /size/);
});

check('angle validation', () => {
  assert.throws(() => stripes({ angle: 'x' }), /angle/);
});

console.log(`\n${n} checks passed.`);
