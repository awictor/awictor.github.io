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
eval(js+`\n;globalThis.__t={futureValue,purchasingPower};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||0.01);

check('futureValue: compounds inflation',()=>{
  assert.ok(near(t.futureValue(100,3,10),134.39));
  assert.equal(t.futureValue(100,0,10),100);
  assert.ok(near(t.futureValue(1000,3,1),1030));
});
check('purchasingPower: discounts by inflation',()=>{
  assert.ok(near(t.purchasingPower(100,3,10),74.41));
  assert.equal(t.purchasingPower(100,0,5),100);
});
check('future & power are inverses',()=>{
  assert.ok(near(t.purchasingPower(t.futureValue(1000,3,10),3,10),1000));
});
check('higher rate erodes value faster',()=>{
  assert.ok(t.purchasingPower(1000,8,10) < t.purchasingPower(1000,2,10));
});

console.log(`\n${n} checks passed.`);
