// Headless regression tests for GridGen — CSS Grid track parsing & generation.
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
  classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},querySelectorAll(){return[];},querySelector(){return null;},closest(){return null;}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(), querySelector: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { splitTracks, normalizeTrackToken, parseTracks, buildTemplate, repeatTrack, gridCSS } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('normalizeTrackToken — fr / lengths / keywords', () => {
  assert.equal(normalizeTrackToken('1fr'), '1fr');
  assert.equal(normalizeTrackToken('1.5FR'), '1.5fr');
  assert.equal(normalizeTrackToken('200px'), '200px');
  assert.equal(normalizeTrackToken('50%'), '50%');
  assert.equal(normalizeTrackToken('2rem'), '2rem');
  assert.equal(normalizeTrackToken('auto'), 'auto');
  assert.equal(normalizeTrackToken('MIN-CONTENT'), 'min-content');
});

check('normalizeTrackToken — rejects invalid tokens', () => {
  assert.equal(normalizeTrackToken('bad'), null);
  assert.equal(normalizeTrackToken('10'), null);      // no unit
  assert.equal(normalizeTrackToken('px'), null);
  assert.equal(normalizeTrackToken(''), null);
  assert.equal(normalizeTrackToken('1fr;'), null);
});

check('normalizeTrackToken — minmax (recursive, validated)', () => {
  assert.equal(normalizeTrackToken('minmax(100px, 1fr)'), 'minmax(100px, 1fr)');
  assert.equal(normalizeTrackToken('minmax( 100PX , 1FR )'), 'minmax(100px, 1fr)');
  assert.equal(normalizeTrackToken('minmax(auto, 200px)'), 'minmax(auto, 200px)');
  assert.equal(normalizeTrackToken('minmax(oops, 1fr)'), null);
});

check('normalizeTrackToken — repeat (recursive)', () => {
  assert.equal(normalizeTrackToken('repeat(3, 1fr)'), 'repeat(3, 1fr)');
  assert.equal(normalizeTrackToken('repeat(4,1fr)'), 'repeat(4, 1fr)');
  assert.equal(normalizeTrackToken('repeat(auto-fill, minmax(160px, 1fr))'),
    'repeat(auto-fill, minmax(160px, 1fr))');
  assert.equal(normalizeTrackToken('repeat(auto-fit, 1fr 2fr)'), 'repeat(auto-fit, 1fr 2fr)');
  assert.equal(normalizeTrackToken('repeat(x, 1fr)'), null);
  assert.equal(normalizeTrackToken('repeat(3, bad)'), null);
});

check('splitTracks — whitespace split, paren-aware', () => {
  assert.deepEqual(splitTracks('1fr 1fr 200px'), ['1fr', '1fr', '200px']);
  assert.deepEqual(splitTracks('  1fr   2fr  '), ['1fr', '2fr']);
  assert.deepEqual(splitTracks('minmax(100px, 1fr) auto'), ['minmax(100px, 1fr)', 'auto']);
  assert.deepEqual(splitTracks('repeat(3, 1fr) 200px'), ['repeat(3, 1fr)', '200px']);
  assert.deepEqual(splitTracks(''), []);
});

check('parseTracks — normalizes and drops invalid', () => {
  assert.deepEqual(parseTracks('1fr 1fr 200px'), ['1fr', '1fr', '200px']);
  assert.deepEqual(parseTracks('1fr bad 2fr'), ['1fr', '2fr']);
  assert.deepEqual(parseTracks('minmax(100px, 1fr) auto'), ['minmax(100px, 1fr)', 'auto']);
  assert.deepEqual(parseTracks(''), []);
});

check('buildTemplate + repeatTrack', () => {
  assert.equal(buildTemplate(['1fr', '1fr', '2fr']), '1fr 1fr 2fr');
  assert.equal(buildTemplate([]), '');
  assert.equal(repeatTrack(3, '1fr'), 'repeat(3, 1fr)');
  assert.equal(repeatTrack('auto-fill', 'minmax(160px, 1fr)'), 'repeat(auto-fill, minmax(160px, 1fr))');
});

check('gridCSS — full rule', () => {
  assert.equal(
    gridCSS({ columns: '1fr 1fr 1fr', gap: '16px' }),
    '.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}'
  );
});

check('gridCSS — with rows', () => {
  assert.equal(
    gridCSS({ columns: '200px 1fr', rows: 'auto 1fr auto', gap: '' }),
    '.grid {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr auto;\n}'
  );
});

check('gridCSS — empty / invalid columns -> none, no gap line', () => {
  assert.equal(
    gridCSS({ columns: 'garbage', gap: '' }),
    '.grid {\n  display: grid;\n  grid-template-columns: none;\n}'
  );
});

check('gridCSS — normalizes messy input', () => {
  assert.equal(
    gridCSS({ columns: 'repeat( 3 , 1FR )   200PX', gap: '1rem' }),
    '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr) 200px;\n  gap: 1rem;\n}'
  );
});

console.log(`\n${n} checks passed.`);
