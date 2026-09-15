// Headless regression tests for CSPKit pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { parseCsp, buildCsp, formatMultiline, analyze } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseCsp splits directives and sources', () => {
  assert.deepEqual(parseCsp("default-src 'self'; img-src * data:"),
    { 'default-src': ["'self'"], 'img-src': ['*', 'data:'] });
});

check('parseCsp lowercases directive, tolerates extra whitespace & trailing ;', () => {
  assert.deepEqual(parseCsp("  DEFAULT-SRC   'self'  ;  ;"),
    { 'default-src': ["'self'"] });
  assert.deepEqual(parseCsp(''), {});
  assert.deepEqual(parseCsp('block-all-mixed-content'),
    { 'block-all-mixed-content': [] });
});

check('buildCsp joins with "; " and handles valueless directives', () => {
  assert.equal(buildCsp({ 'default-src': ["'self'"], 'script-src': ["'self'", "'unsafe-inline'"] }),
    "default-src 'self'; script-src 'self' 'unsafe-inline'");
  assert.equal(buildCsp({ 'upgrade-insecure-requests': [] }), 'upgrade-insecure-requests');
});

check('formatMultiline joins with ";\\n"', () => {
  assert.equal(formatMultiline({ 'default-src': ["'self'"], 'img-src': ['*'] }),
    "default-src 'self';\nimg-src *");
});

check('round-trip parse -> build is stable', () => {
  const src = "default-src 'self'; script-src 'self'; img-src 'self' data:";
  assert.equal(buildCsp(parseCsp(src)), src);
});

check('analyze flags wildcard as high', () => {
  const w = analyze(parseCsp("default-src 'self'; img-src *"));
  assert.equal(w.length, 1);
  assert.equal(w[0].level, 'high');
  assert.ok(/any origin/.test(w[0].message));
});

check('analyze flags unsafe-inline and unsafe-eval as medium', () => {
  const w = analyze(parseCsp("default-src 'self'; script-src 'unsafe-inline' 'unsafe-eval'"));
  assert.equal(w.length, 2);
  assert.ok(w.every(x => x.level === 'medium'));
});

check('analyze warns when no default-src/script-src', () => {
  const w = analyze(parseCsp("img-src 'self'"));
  assert.equal(w.length, 1);
  assert.equal(w[0].level, 'high');
  assert.ok(/unrestricted/.test(w[0].message));
});

check('analyze flags insecure http: sources', () => {
  const w = analyze(parseCsp("default-src 'self'; img-src http://cdn.example.com"));
  assert.equal(w.length, 1);
  assert.equal(w[0].level, 'medium');
  assert.ok(/insecure http/.test(w[0].message));
  // https should NOT be flagged
  assert.equal(analyze(parseCsp("default-src 'self'; img-src https://cdn.example.com")).length, 0);
});

check('analyze returns empty for a clean strict policy', () => {
  const strict = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'";
  assert.deepEqual(analyze(parseCsp(strict)), []);
});

console.log(`\n${n} checks passed.`);
