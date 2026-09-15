import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isHex, textGradientCss } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('isHex validates 3 and 6 digit', () => {
  assert.ok(isHex('#fff'));
  assert.ok(isHex('#ff6100'));
  assert.ok(!isHex('ff6100'));
  assert.ok(!isHex('#zz0'));
});

check('composes the gradient with the angle', () => {
  const css = textGradientCss({ colors: ['#ff6100', '#c026d3'], angle: 90 });
  assert.ok(css.includes('background: linear-gradient(90deg, #ff6100, #c026d3);'));
});

check('includes both background-clip prefixes and transparent fill', () => {
  const css = textGradientCss({ colors: ['#000000', '#ffffff'] });
  assert.ok(css.includes('-webkit-background-clip: text;'));
  assert.ok(css.includes('background-clip: text;'));
  assert.ok(css.includes('-webkit-text-fill-color: transparent;'));
  assert.ok(css.includes('color: transparent;'));
});

check('supports three or more stops', () => {
  const css = textGradientCss({ colors: ['#f00', '#0f0', '#00f'], angle: 45 });
  assert.ok(css.includes('linear-gradient(45deg, #f00, #0f0, #00f)'));
});

check('angle defaults to 90', () => {
  assert.ok(textGradientCss({ colors: ['#000', '#fff'] }).includes('90deg'));
});

check('default colors when none given', () => {
  const css = textGradientCss({});
  assert.ok(css.includes('linear-gradient(90deg, #ff6100, #c026d3)'));
});

check('requires at least two colors', () => {
  assert.throws(() => textGradientCss({ colors: ['#fff'] }), /at least two/);
  assert.throws(() => textGradientCss({ colors: [] }), /at least two/);
});

check('rejects invalid hex', () => {
  assert.throws(() => textGradientCss({ colors: ['#fff', 'red'] }), /invalid hex/);
});

check('arbitrary angles flow through', () => {
  assert.ok(textGradientCss({ colors: ['#000', '#fff'], angle: 217 }).includes('217deg'));
});

check('output is deterministic', () => {
  const opts = { colors: ['#111', '#222'], angle: 30 };
  assert.equal(textGradientCss(opts), textGradientCss(opts));
});

console.log(`\n${n} checks passed.`);
