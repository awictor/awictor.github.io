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
eval(js+`\n;globalThis.__t={epley,brzycki,oneRepMax,percentOfMax};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||0.01);

check('epley: 1 rep = weight; formula otherwise',()=>{
  assert.equal(t.epley(100,1),100);
  assert.ok(near(t.epley(100,10),133.333));  // 100*(1+10/30)
  assert.ok(near(t.epley(100,5),116.667));
});
check('brzycki: 1 rep = weight; formula otherwise',()=>{
  assert.equal(t.brzycki(100,1),100);        // 100*36/36
  assert.ok(near(t.brzycki(100,10),133.333)); // 100*36/27
  assert.equal(t.brzycki(100,37),Infinity);
});
check('oneRepMax averages the two',()=>{
  assert.ok(near(t.oneRepMax(100,10),(t.epley(100,10)+t.brzycki(100,10))/2));
  assert.equal(t.oneRepMax(100,1),100);
});
check('percentOfMax',()=>{
  assert.equal(t.percentOfMax(200,90),180);
  assert.equal(t.percentOfMax(150,100),150);
  assert.equal(t.percentOfMax(200,50),100);
});

console.log(`\n${n} checks passed.`);
