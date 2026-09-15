import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { camelCss, parseStyle, htmlToJsx } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('camelCss camelizes CSS properties', () => {
  assert.equal(camelCss('background-color'), 'backgroundColor');
  assert.equal(camelCss('font-size'), 'fontSize');
  assert.equal(camelCss('color'), 'color');
  assert.equal(camelCss('-webkit-transform'), 'WebkitTransform');
  assert.equal(camelCss('-ms-flex'), 'msFlex');
});

check('parseStyle builds a JSX style object', () => {
  assert.equal(parseStyle('color: red; font-size: 12px'), "{{ color: 'red', fontSize: '12px' }}");
  assert.equal(parseStyle('margin:0'), "{{ margin: '0' }}");
});

check('class → className', () => {
  assert.equal(htmlToJsx('<div class="a b">x</div>'), '<div className="a b">x</div>');
});

check('for → htmlFor (non-void tag untouched otherwise)', () => {
  assert.equal(htmlToJsx('<label for="n">Name</label>'), '<label htmlFor="n">Name</label>');
});

check('void elements become self-closing', () => {
  assert.equal(htmlToJsx('<br>'), '<br />');
  assert.equal(htmlToJsx('<img src="x.png">'), '<img src="x.png" />');
  assert.equal(htmlToJsx('<input type="text">'), '<input type="text" />');
});

check('already self-closed void tags are normalized', () => {
  assert.equal(htmlToJsx('<br/>'), '<br />');
  assert.equal(htmlToJsx('<img src="a" />'), '<img src="a" />');
});

check('HTML comments become JSX comments', () => {
  assert.equal(htmlToJsx('<!-- hi -->'), '{/* hi */}');
});

check('inline style attribute → object', () => {
  assert.equal(
    htmlToJsx('<div style="background-color: red; font-size: 12px">'),
    "<div style={{ backgroundColor: 'red', fontSize: '12px' }}>"
  );
});

check('misc attribute renames', () => {
  assert.equal(htmlToJsx('<div tabindex="0">'), '<div tabIndex="0">');
  assert.equal(htmlToJsx('<input readonly maxlength="5">'), '<input readOnly maxLength="5" />');
  assert.equal(htmlToJsx('<button onclick="f()">go</button>'), '<button onClick="f()">go</button>');
});

check('does not corrupt attribute-like substrings inside words', () => {
  // "for" only renamed as a standalone attribute, not inside "before"
  assert.equal(htmlToJsx('<span data-before="1">x</span>'), '<span data-before="1">x</span>');
});

console.log(`\n${n} checks passed.`);
