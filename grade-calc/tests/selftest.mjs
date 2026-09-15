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
eval(js+`\n;globalThis.__t={weightedAverage,gradeLetter,neededOnFinal};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b)=>Math.abs(a-b)<1e-9;

check('weightedAverage',()=>{
  assert.equal(t.weightedAverage([{score:90,weight:1},{score:80,weight:1}]),85);
  assert.equal(t.weightedAverage([{score:100,weight:3},{score:50,weight:1}]),87.5);
  assert.equal(t.weightedAverage([]),0);
  assert.equal(t.weightedAverage([{score:100,weight:0}]),0); // zero total weight
});
check('gradeLetter thresholds',()=>{
  assert.equal(t.gradeLetter(95),"A");
  assert.equal(t.gradeLetter(90),"A");
  assert.equal(t.gradeLetter(89.9),"B");
  assert.equal(t.gradeLetter(72),"C");
  assert.equal(t.gradeLetter(60),"D");
  assert.equal(t.gradeLetter(55),"F");
});
check('neededOnFinal',()=>{
  // current 80 over 80% done, target 82 -> need 90 on last 20%
  assert.ok(near(t.neededOnFinal(80,80,82),90));
  // fully done -> null
  assert.equal(t.neededOnFinal(85,100,90),null);
  // already secured (99% over 95% of grade, target 90) -> negative (0 suffices)
  assert.ok(t.neededOnFinal(99,95,90)<0);
});

console.log(`\n${n} checks passed.`);
