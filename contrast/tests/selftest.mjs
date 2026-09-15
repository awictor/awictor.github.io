import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',checked:false,className:'',style:{},dataset:{},classList:{toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},onclick:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;
try{Object.defineProperty(globalThis,'navigator',{value:{clipboard:{writeText:()=>Promise.resolve()}},configurable:true});}catch{}

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={normalizeHex,hexToRgb,relativeLuminance,contrastRatio,wcagLevels,mix,suggestColor,encodeState,decodeState};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('normalizeHex: expands shorthand, validates',()=>{
  assert.equal(t.normalizeHex('#fff'),'#ffffff');
  assert.equal(t.normalizeHex('ABC'),'#aabbcc');
  assert.equal(t.normalizeHex('#1a2b3c'),'#1a2b3c');
  assert.equal(t.normalizeHex('xyz'),null);
  assert.equal(t.normalizeHex('#12345'),null);
});
check('hexToRgb: parses channels',()=>{
  assert.deepEqual(t.hexToRgb('#ffffff'),{r:255,g:255,b:255});
  assert.deepEqual(t.hexToRgb('#ff0000'),{r:255,g:0,b:0});
  assert.deepEqual(t.hexToRgb('#000'),{r:0,g:0,b:0});
  assert.equal(t.hexToRgb('nope'),null);
});
check('relativeLuminance: black 0, white 1',()=>{
  assert.ok(Math.abs(t.relativeLuminance({r:0,g:0,b:0}))<1e-9);
  assert.ok(Math.abs(t.relativeLuminance({r:255,g:255,b:255})-1)<1e-9);
});
check('contrastRatio: known WCAG values',()=>{
  assert.ok(Math.abs(t.contrastRatio('#000000','#ffffff')-21)<1e-6);
  assert.ok(Math.abs(t.contrastRatio('#ffffff','#ffffff')-1)<1e-9);
  assert.ok(Math.abs(t.contrastRatio('#777777','#ffffff')-4.48)<0.02);
  assert.ok(Math.abs(t.contrastRatio('#ffffff','#000000')-21)<1e-6); // order-independent
  assert.equal(t.contrastRatio('zzz','#fff'),null);
});
check('wcagLevels: thresholds at the boundaries',()=>{
  assert.deepEqual(t.wcagLevels(21),{aaNormal:true,aaLarge:true,aaaNormal:true,aaaLarge:true});
  assert.deepEqual(t.wcagLevels(4.48),{aaNormal:false,aaLarge:true,aaaNormal:false,aaaLarge:false});
  assert.deepEqual(t.wcagLevels(4.5),{aaNormal:true,aaLarge:true,aaaNormal:false,aaaLarge:true});
  assert.deepEqual(t.wcagLevels(1),{aaNormal:false,aaLarge:false,aaaNormal:false,aaaLarge:false});
});
check('share codec round-trips',()=>{
  assert.equal(t.encodeState({fg:'#112233',bg:'#aabbcc'}),'112233aabbcc');
  assert.deepEqual(t.decodeState('#112233#aabbcc'),{fg:'#112233',bg:'#aabbcc'});
  assert.deepEqual(t.decodeState(t.encodeState({fg:'#ff0000',bg:'#00ff00'})),{fg:'#ff0000',bg:'#00ff00'});
  assert.equal(t.decodeState('short'),null);
});

check('mix: blends endpoints correctly',()=>{
  assert.equal(t.mix('#000000','#ffffff',0),'#000000');
  assert.equal(t.mix('#000000','#ffffff',1),'#ffffff');
  assert.equal(t.mix('#000000','#ffffff',0.5),'#808080');
});
check('suggestColor: leaves an already-passing color unchanged',()=>{
  assert.equal(t.suggestColor('#000000','#ffffff',4.5),'#000000');
  assert.equal(t.suggestColor('#595959','#ffffff',4.5),'#595959'); // ~7:1, passes
});
check('suggestColor: nudges a failing color until it passes AA',()=>{
  const s=t.suggestColor('#777777','#ffffff',4.5); // 4.48 fails
  assert.ok(t.normalizeHex(s),'valid hex: '+s);
  assert.notEqual(s,'#777777');
  assert.ok(t.contrastRatio(s,'#ffffff')>=4.5,'now passes: '+t.contrastRatio(s,'#ffffff'));
});
check('suggestColor: unreachable target returns the max-contrast endpoint',()=>{
  const s=t.suggestColor('#888888','#777777',21); // 21:1 impossible on gray bg
  assert.ok(['#000000','#ffffff'].includes(s),'endpoint: '+s);
});

console.log(`\n${n} checks passed.`);
