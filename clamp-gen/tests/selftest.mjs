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
eval(js+`\n;globalThis.__t={fluidClamp};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||0.001);

check('fluidClamp: 16→24 across 320→1200',()=>{
  const r=t.fluidClamp(16,24,320,1200);
  assert.equal(r.minRem,1);
  assert.equal(r.maxRem,1.5);
  assert.ok(near(r.slopeVw,0.9091));
  assert.ok(near(r.interceptRem,0.8182));
  assert.ok(r.css.startsWith("clamp(1rem,"));
  assert.ok(r.css.endsWith("1.5rem)"));
});
check('fluidClamp: equal sizes -> zero slope',()=>{
  const r=t.fluidClamp(16,16,320,1200);
  assert.equal(r.slopeVw,0);
  assert.equal(r.interceptRem,1);
  assert.equal(r.css,"clamp(1rem, 1rem + 0vw, 1rem)");
});
check('fluidClamp: at min/max viewport the value equals min/max size',()=>{
  // preferred(px) = interceptRem*16 + slopeVw/100 * vw
  const r=t.fluidClamp(16,24,320,1200);
  const atMin=r.interceptRem*16 + (r.slopeVw/100)*320;
  const atMax=r.interceptRem*16 + (r.slopeVw/100)*1200;
  assert.ok(Math.abs(atMin-16)<0.05);
  assert.ok(Math.abs(atMax-24)<0.05);
});
check('fluidClamp: equal viewports -> null',()=>{
  assert.equal(t.fluidClamp(16,24,320,320),null);
});

console.log(`\n${n} checks passed.`);
