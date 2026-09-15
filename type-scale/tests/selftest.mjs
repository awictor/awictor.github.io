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
eval(js+`\n;globalThis.__t={modularScale};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('modularScale: major third from 16',()=>{
  assert.deepEqual(t.modularScale(16,1.25,0,3).map(r=>r.size),[16,20,25,31.25]);
});
check('modularScale: doubling',()=>{
  assert.deepEqual(t.modularScale(10,2,0,3).map(r=>r.size),[10,20,40,80]);
});
check('modularScale: negative steps go below base',()=>{
  const s=t.modularScale(16,1.5,-1,1);
  assert.deepEqual(s.map(r=>r.step),[-1,0,1]);
  assert.ok(Math.abs(s[0].size-10.67)<0.01);
  assert.equal(s[1].size,16);
  assert.equal(s[2].size,24);
});
check('modularScale: step field ranges correctly',()=>{
  assert.deepEqual(t.modularScale(16,1.2,-2,5).map(r=>r.step),[-2,-1,0,1,2,3,4,5]);
});

console.log(`\n${n} checks passed.`);
