import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { isHex, scrollbarCss } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('isHex validates 3 and 6 digit', () => {
  assert.ok(isHex('#fff'));
  assert.ok(isHex('#888888'));
  assert.ok(!isHex('888888'));
  assert.ok(!isHex('#12g'));
});

check('scrollbarCss composes width, colors and radius', () => {
  const css = scrollbarCss({ width: 12, track: '#f1f1f1', thumb: '#888888', thumbHover: '#555555', radius: 6 });
  assert.ok(css.includes('::-webkit-scrollbar { width: 12px; height: 12px; }'));
  assert.ok(css.includes('::-webkit-scrollbar-track { background: #f1f1f1; }'));
  assert.ok(css.includes('::-webkit-scrollbar-thumb { background: #888888; border-radius: 6px; }'));
  assert.ok(css.includes('::-webkit-scrollbar-thumb:hover { background: #555555; }'));
});

check('includes Firefox scrollbar-color (thumb then track)', () => {
  const css = scrollbarCss({ track: '#eeeeee', thumb: '#333333' });
  assert.ok(css.includes('scrollbar-color: #333333 #eeeeee;'));
  assert.ok(css.includes('scrollbar-width: thin'));
});

check('thumbHover defaults to thumb when omitted', () => {
  const css = scrollbarCss({ thumb: '#abcdef' });
  assert.ok(css.includes('::-webkit-scrollbar-thumb:hover { background: #abcdef; }'));
});

check('defaults are sensible', () => {
  const css = scrollbarCss({});
  assert.ok(css.includes('width: 12px'));
  assert.ok(css.includes('border-radius: 6px'));
  assert.ok(css.includes('background: #888888'));
});

check('custom width and radius flow through', () => {
  const css = scrollbarCss({ width: 4, radius: 0 });
  assert.ok(css.includes('width: 4px; height: 4px;'));
  assert.ok(css.includes('border-radius: 0px;'));
});

check('3-digit hex colors are accepted', () => {
  const css = scrollbarCss({ track: '#eee', thumb: '#333' });
  assert.ok(css.includes('background: #eee'));
});

check('rejects invalid colors', () => {
  assert.throws(() => scrollbarCss({ track: 'grey' }), /invalid hex/);
  assert.throws(() => scrollbarCss({ thumb: 'nope' }), /invalid hex/);
});

check('rejects negative width / radius', () => {
  assert.throws(() => scrollbarCss({ width: -1 }), /non-negative/);
  assert.throws(() => scrollbarCss({ radius: -5 }), /non-negative/);
});

check('output is deterministic', () => {
  assert.equal(scrollbarCss({ width: 10 }), scrollbarCss({ width: 10 }));
});

console.log(`\n${n} checks passed.`);
