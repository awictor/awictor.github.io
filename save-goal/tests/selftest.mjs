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
eval(js+`\n;globalThis.__t={requiredMonthly};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||0.01);

check('no interest: simple division',()=>{
  assert.equal(t.requiredMonthly(12000,0,12,0),1000);
  assert.ok(near(t.requiredMonthly(10000,2000,12,0),666.6667));
});
check('interest lowers the required monthly',()=>{
  assert.ok(t.requiredMonthly(12000,0,12,6) < t.requiredMonthly(12000,0,12,0));
});
check('interest case matches the annuity formula',()=>{
  // goal 12000, 12 months, 6%/yr -> r=0.005, g=1.005^12
  const r=0.005, g=Math.pow(1.005,12), expected=12000/((g-1)/r);
  assert.ok(near(t.requiredMonthly(12000,0,12,6),expected,1e-6));
});
check('already have enough -> zero or negative',()=>{
  assert.ok(t.requiredMonthly(5000,6000,12,0) < 0);
});
check('current savings grow too (with interest)',()=>{
  // with 2000 already at 12% over 12mo, need less than plain (goal-current)/12
  assert.ok(t.requiredMonthly(10000,2000,12,12) < (10000-2000)/12);
});

console.log(`\n${n} checks passed.`);
