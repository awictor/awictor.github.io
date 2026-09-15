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
eval(js+`\n;globalThis.__t={applyDiscount,applyStacked,effectivePct};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b)=>Math.abs(a-b)<1e-9;

check('applyDiscount',()=>{
  assert.equal(t.applyDiscount(100,20),80);
  assert.equal(t.applyDiscount(50,0),50);
  assert.equal(t.applyDiscount(100,100),0);
});
check('applyStacked: discounts multiply, not add',()=>{
  assert.ok(near(t.applyStacked(100,[20,10]),72));  // 100*.8*.9
  assert.equal(t.applyStacked(100,[]),100);
  assert.ok(near(t.applyStacked(200,[50,50]),50));
});
check('effectivePct',()=>{
  assert.ok(near(t.effectivePct(100,72),28));
  assert.equal(t.effectivePct(200,150),25);
  assert.equal(t.effectivePct(0,0),null);
});
check('stacked 20%+10% is 28% off, not 30%',()=>{
  const final=t.applyStacked(100,[20,10]);
  assert.ok(near(t.effectivePct(100,final),28));
});

console.log(`\n${n} checks passed.`);
