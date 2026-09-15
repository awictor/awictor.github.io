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
eval(js+`\n;globalThis.__t={roi,netProfit,annualizedROI};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||0.01);

check('roi: gain and loss',()=>{
  assert.equal(t.roi(1500,1000),50);
  assert.equal(t.roi(800,1000),-20);
  assert.equal(t.roi(1000,1000),0);
  assert.equal(t.roi(1000,0),null);
});
check('netProfit',()=>{
  assert.equal(t.netProfit(1500,1000),500);
  assert.equal(t.netProfit(800,1000),-200);
});
check('annualizedROI',()=>{
  assert.ok(near(t.annualizedROI(2000,1000,10),7.1773));
  assert.equal(t.annualizedROI(1500,1000,1),50);
  assert.equal(t.annualizedROI(1000,0,5),null);
  assert.equal(t.annualizedROI(1000,1000,0),null);
});
check('annualized compounds back to total',()=>{
  const a=t.annualizedROI(2000,1000,10)/100;
  assert.ok(near(Math.pow(1+a,10),2,1e-6)); // doubled
});

console.log(`\n${n} checks passed.`);
