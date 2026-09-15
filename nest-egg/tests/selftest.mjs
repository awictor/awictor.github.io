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
eval(js+`\n;globalThis.__t={grow,encodeState,decodeState};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('grow: lump sum compounds monthly',()=>{
  const r=t.grow({principal:10000,monthly:0,rate:6,years:10}); // 10000*(1.005)^120
  assert.ok(Math.abs(r.future-18193.97)<1, 'future '+r.future);
  assert.equal(r.contributed,10000);
  assert.ok(Math.abs(r.interest-(r.future-10000))<1e-6);
});
check('grow: zero return just sums contributions',()=>{
  const r=t.grow({principal:0,monthly:100,rate:0,years:1});
  assert.equal(r.future,1200);
  assert.equal(r.contributed,1200);
  assert.equal(r.interest,0);
});
check('grow: contributions plus return earn interest',()=>{
  const r=t.grow({principal:1000,monthly:200,rate:7,years:20});
  assert.ok(r.interest>0);
  assert.ok(r.future>r.contributed);
});
check('grow: series starts at principal and has months+1 points',()=>{
  const r=t.grow({principal:5000,monthly:100,rate:5,years:3});
  assert.equal(r.series[0],5000);
  assert.equal(r.series.length,r.months+1);
  assert.equal(r.months,36);
});
check('grow: inflation discounts to today\'s dollars',()=>{
  const r=t.grow({principal:10000,monthly:0,rate:6,years:10,inflation:2.5});
  // nominal 18193.97 / 1.025^10 = 18193.97 / 1.28008 ≈ 14213.2
  assert.ok(Math.abs(r.realFuture-14212.6)<2, 'realFuture '+r.realFuture);
  assert.ok(r.realFuture<r.future);
});
check('grow: zero inflation leaves real = nominal',()=>{
  const r=t.grow({principal:5000,monthly:100,rate:5,years:8,inflation:0});
  assert.ok(Math.abs(r.realFuture-r.future)<1e-6);
});
check('share codec round-trips incl inflation',()=>{
  const s={principal:15000,monthly:250,rate:6.5,years:25,inflation:3};
  assert.deepEqual(t.decodeState(t.encodeState(s)),s);
  assert.equal(t.decodeState('!!bad'),null);
});

console.log(`\n${n} checks passed.`);
