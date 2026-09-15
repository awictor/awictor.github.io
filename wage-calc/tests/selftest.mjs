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
eval(js+`\n;globalThis.__t={annualFrom,breakdownFromAnnual};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b)=>Math.abs(a-b)<1e-6;

check('annualFrom: each period',()=>{
  assert.equal(t.annualFrom(25,"hour",40,52),52000);
  assert.equal(t.annualFrom(1000,"week",40,52),52000);
  assert.equal(t.annualFrom(5000,"month",40,52),60000);
  assert.equal(t.annualFrom(52000,"year",40,52),52000);
});
check('breakdownFromAnnual',()=>{
  const b=t.breakdownFromAnnual(52000,40,52);
  assert.equal(b.year,52000);
  assert.ok(near(b.month,4333.333333));
  assert.equal(b.week,1000);
  assert.equal(b.hour,25);
});
check('round-trip hour -> annual -> hour',()=>{
  const annual=t.annualFrom(37.5,"hour",37.5,48);
  assert.ok(near(t.breakdownFromAnnual(annual,37.5,48).hour,37.5));
});
check('guards zero divisors',()=>{
  const b=t.breakdownFromAnnual(52000,0,0);
  assert.equal(b.week,0);
  assert.equal(b.hour,0);
  assert.equal(b.month,52000/12);
});

console.log(`\n${n} checks passed.`);
