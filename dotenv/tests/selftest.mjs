// Headless regression tests for DotEnv pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',firstChild:{textContent:''},style:{},className:'',
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
const { parseEnv, toEnv, needsQuote, envToJson, jsonToEnv } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('parseEnv basic key=value', () => {
  assert.deepEqual(parseEnv('FOO=bar\nBAZ=qux'), { FOO: 'bar', BAZ: 'qux' });
});

check('parseEnv ignores comments, blanks, and bad lines', () => {
  assert.deepEqual(parseEnv('# comment\n\n  \nA=1\nnokeyhere\n1BAD=x'), { A: '1' });
});

check('parseEnv strips export prefix', () => {
  assert.deepEqual(parseEnv('export NODE_ENV=production'), { NODE_ENV: 'production' });
});

check('parseEnv double quotes unescape \\n \\t \\"', () => {
  assert.deepEqual(parseEnv('A="hello world"'), { A: 'hello world' });
  assert.deepEqual(parseEnv('B="line1\\nline2"'), { B: 'line1\nline2' });
  assert.deepEqual(parseEnv('C="a\\tb"'), { C: 'a\tb' });
  assert.deepEqual(parseEnv('D="say \\"hi\\""'), { D: 'say "hi"' });
});

check('parseEnv single quotes are literal', () => {
  assert.deepEqual(parseEnv("E='a\\nb'"), { E: 'a\\nb' });
});

check('parseEnv splits on first = only', () => {
  assert.deepEqual(parseEnv('URL=postgres://u:p@h:5432/db?x=1'),
    { URL: 'postgres://u:p@h:5432/db?x=1' });
});

check('needsQuote', () => {
  assert.equal(needsQuote('simple'), false);
  assert.equal(needsQuote('has space'), true);
  assert.equal(needsQuote(''), true);
  assert.equal(needsQuote('a#b'), true);
});

check('toEnv quotes only when needed', () => {
  assert.equal(toEnv({ A: 'bar', B: 'hello world' }), 'A=bar\nB="hello world"');
  assert.equal(toEnv({ N: 'a\nb' }), 'N="a\\nb"');
});

check('round-trip parseEnv(toEnv(obj)) === obj', () => {
  const obj = { NODE_ENV: 'production', APP: 'My Cool App', MULTI: 'a\nb\tc', Q: 'say "hi"', PLAIN: 'x1' };
  assert.deepEqual(parseEnv(toEnv(obj)), obj);
});

check('envToJson and jsonToEnv', () => {
  assert.equal(envToJson('A=1\nB=two'), '{\n  "A": "1",\n  "B": "two"\n}');
  assert.equal(jsonToEnv('{"A":"1","B":"two words"}'), 'A=1\nB="two words"');
  assert.throws(() => jsonToEnv('[1,2,3]'));
  assert.throws(() => jsonToEnv('not json'));
});

console.log(`\n${n} checks passed.`);
