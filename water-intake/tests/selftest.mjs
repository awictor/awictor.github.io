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
eval(js+`\n;globalThis.__t={dailyWaterMl,mlToLitres,mlToCups,mlToOz};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||0.01);

check('dailyWaterMl: weight + exercise',()=>{
  assert.equal(t.dailyWaterMl(70,0),2310);
  assert.equal(t.dailyWaterMl(70,30),2660);
  assert.equal(t.dailyWaterMl(80,60),3340);
  assert.equal(t.dailyWaterMl(0,0),0);
});
check('exercise scales linearly (350 mL per 30 min)',()=>{
  assert.equal(t.dailyWaterMl(0,30),350);
  assert.equal(t.dailyWaterMl(0,60),700);
});
check('unit conversions',()=>{
  assert.equal(t.mlToLitres(2000),2);
  assert.equal(t.mlToCups(240),1);
  assert.ok(near(t.mlToOz(29.5735295625),1));
});
check('negatives clamped to zero',()=>{
  assert.equal(t.dailyWaterMl(-5,-10),0);
});

console.log(`\n${n} checks passed.`);
