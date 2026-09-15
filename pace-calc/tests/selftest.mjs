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
eval(js+`\n;globalThis.__t={toSeconds,pacePerKm,speedKmh,fmtClock};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||1e-9);

check('toSeconds',()=>{
  assert.equal(t.toSeconds(1,2,3),3723);
  assert.equal(t.toSeconds(0,50,0),3000);
});
check('pacePerKm & speedKmh',()=>{
  assert.equal(t.pacePerKm(10,3000),300);   // 5:00/km
  assert.equal(t.speedKmh(10,3000),12);
  assert.ok(near(t.pacePerKm(21.0975,6329.25),300));
  assert.equal(t.pacePerKm(0,3000),0);
  assert.equal(t.speedKmh(10,0),0);
});
check('fmtClock',()=>{
  assert.equal(t.fmtClock(300),"5:00");
  assert.equal(t.fmtClock(3723),"1:02:03");
  assert.equal(t.fmtClock(65),"1:05");
  assert.equal(t.fmtClock(0),"—");
});
check('marathon at 5:00/km ≈ 3:31:00',()=>{
  const secs=t.pacePerKm(42.195,1)*42.195; // reverse not needed; compute time for pace 300
  const total=300*42.195; // 12658.5s
  assert.equal(t.fmtClock(total),"3:30:59"); // 12658.5 -> round 12659 -> 3:30:59
});

console.log(`\n${n} checks passed.`);
