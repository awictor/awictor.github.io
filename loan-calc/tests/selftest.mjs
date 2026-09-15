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
eval(js+`\n;globalThis.__t={loan,payoffWith,encodeState,decodeState};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('loan: monthly payment on a known amortization',()=>{
  const r=t.loan(20000,6,60); // $20k, 6% APR, 60 months
  assert.ok(Math.abs(r.emi-386.66)<0.01, 'emi '+r.emi);
  assert.equal(r.months,60);
  assert.ok(Math.abs(r.total-r.emi*60)<1e-6);
  assert.ok(Math.abs(r.totalInterest-(r.total-20000))<0.01);
});
check('loan: balance series starts at principal and ends near zero',()=>{
  const r=t.loan(20000,6,60);
  assert.equal(r.series[0],20000);
  assert.equal(r.series.length,61);
  assert.ok(r.series[60]<1, 'ends near zero: '+r.series[60]);
});
check('loan: zero interest splits principal evenly',()=>{
  const r=t.loan(12000,0,12);
  assert.equal(r.emi,1000);
  assert.equal(r.totalInterest,0);
  assert.ok(Math.abs(r.total-12000)<1e-6);
});
check('loan: interest rises with rate',()=>{
  assert.ok(t.loan(20000,10,60).totalInterest > t.loan(20000,3,60).totalInterest);
});
check('payoffWith: extra payment shortens term and saves interest',()=>{
  const r=t.payoffWith(20000,6,60,200);
  assert.ok(r.months<60, 'months '+r.months);
  assert.ok(r.monthsSaved>0);
  assert.ok(r.interestSaved>0);
  assert.ok(r.series[r.series.length-1]<1, 'ends paid off');
});
check('payoffWith: zero extra equals the base schedule',()=>{
  const r=t.payoffWith(20000,6,60,0);
  assert.equal(r.months,60);
  assert.equal(r.monthsSaved,0);
  assert.ok(Math.abs(r.interestSaved)<0.01);
});
check('share codec round-trips incl extra',()=>{
  const s={principal:25000,apr:5.5,years:6,unit:'months',extra:150};
  assert.deepEqual(t.decodeState(t.encodeState(s)),s);
  assert.equal(t.decodeState('!!bad'),null);
});

console.log(`\n${n} checks passed.`);
