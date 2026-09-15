// Headless regression tests for Keyframes — CSS @keyframes/animation builders.
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
  classList:{add(){},remove(){},toggle(){}},offsetWidth:0,
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el(), head: { appendChild(){} }
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { PRESETS, keyframesCss, animationValue, fullCss } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('PRESETS has the expected animations', () => {
  ['fade', 'slide', 'spin', 'pulse', 'bounce', 'shake'].forEach(k => assert.ok(PRESETS[k], 'missing ' + k));
});

check('keyframesCss — fade', () => {
  assert.equal(keyframesCss('fade', { 0: { opacity: '0' }, 100: { opacity: '1' } }),
    '@keyframes fade {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}');
});

check('keyframesCss — stops sorted numerically (not lexically)', () => {
  const css = keyframesCss('x', { 100: { a: '1' }, 25: { a: '2' }, 0: { a: '3' } });
  const order = [...css.matchAll(/(\d+)%/g)].map(m => m[1]);
  assert.deepEqual(order, ['0', '25', '100']);
});

check('keyframesCss — multiple declarations per stop', () => {
  assert.equal(keyframesCss('s', { 0: { transform: 'translateX(-100%)', opacity: '0' } }),
    '@keyframes s {\n  0% { transform: translateX(-100%); opacity: 0; }\n}');
});

check('animationValue — order and defaults', () => {
  assert.equal(animationValue({ name: 'spin', duration: 2, timing: 'linear', iteration: 'infinite' }),
    'spin 2s linear infinite normal none');
  assert.equal(animationValue({ name: 'a' }), 'a 1s ease 1 normal none');
});

check('animationValue — includes delay only when set', () => {
  assert.equal(animationValue({ name: 'a', duration: 1, delay: 0.5 }),
    'a 1s ease 0.5s 1 normal none');
  assert.ok(!animationValue({ name: 'a' }).includes('0s')); // no stray delay
});

check('fullCss — keyframes + .animated rule', () => {
  const css = fullCss('spin', { duration: 2, timing: 'linear', iteration: 'infinite' });
  assert.ok(css.includes('@keyframes spin {'));
  assert.ok(css.includes('100% { transform: rotate(360deg); }'));
  assert.ok(css.includes('.animated {\n  animation: spin 2s linear infinite normal none;\n}'));
});

check('fullCss — unknown preset -> empty', () => {
  assert.equal(fullCss('nope', {}), '');
});

check('pulse preset has a midpoint stop', () => {
  assert.ok(keyframesCss('pulse', PRESETS.pulse).includes('50% {'));
});

console.log(`\n${n} checks passed.`);
