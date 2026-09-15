import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',checked:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},onclick:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={pxToRem,remToPx};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('pxToRem (default base 16)',()=>{
  assert.equal(t.pxToRem(16),1);
  assert.equal(t.pxToRem(24),1.5);
  assert.equal(t.pxToRem(8),0.5);
  assert.equal(t.pxToRem(0),0);
});
check('remToPx (default base 16)',()=>{
  assert.equal(t.remToPx(1.5),24);
  assert.equal(t.remToPx(2),32);
});
check('custom base',()=>{
  assert.equal(t.pxToRem(24,10),2.4);
  assert.equal(t.remToPx(2.4,10),24);
  assert.equal(t.pxToRem(10,0),0.625); // base 0 falls back to 16
});
check('round-trip',()=>{
  for(const px of [4,12,17,24,37,48]) assert.ok(Math.abs(t.remToPx(t.pxToRem(px))-px)<1e-9);
});

console.log(`\n${n} checks passed.`);
