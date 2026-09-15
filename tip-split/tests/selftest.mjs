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
eval(js+`\n;globalThis.__t={splitBill,encodeState,decodeState};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('splitBill: tip, total, per-person',()=>{
  const r=t.splitBill({bill:100,tipPct:20,people:4,roundUp:false});
  assert.equal(r.tip,20);
  assert.equal(r.total,120);
  assert.equal(r.perPerson,30);
  assert.equal(r.collected,120);
  assert.equal(r.extra,0);
});
check('splitBill: round-up each share collects a little extra',()=>{
  const r=t.splitBill({bill:86.40,tipPct:20,people:4,roundUp:true});
  // total 103.68, /4 = 25.92 -> ceil 26; collected 104; extra 0.32
  assert.equal(r.perPerson,26);
  assert.ok(Math.abs(r.collected-104)<1e-9);
  assert.ok(Math.abs(r.extra-0.32)<1e-9);
});
check('splitBill: 0 people treated as 1',()=>{
  const r=t.splitBill({bill:50,tipPct:0,people:0,roundUp:false});
  assert.equal(r.perPerson,50);
});
check('share codec round-trips incl round-up flag',()=>{
  const s={bill:86.4,tipPct:18,people:3,roundUp:true};
  assert.deepEqual(t.decodeState(t.encodeState(s)),s);
  assert.equal(t.decodeState('!!bad'),null);
});

console.log(`\n${n} checks passed.`);
