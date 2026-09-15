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
eval(js+`\n;globalThis.__t={percentOf,whatPercent,percentChange,addPercent,subPercent};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('percentOf',()=>{
  assert.equal(t.percentOf(20,150),30);
  assert.equal(t.percentOf(0,999),0);
  assert.equal(t.percentOf(150,80),120);
});
check('whatPercent (guards divide-by-zero)',()=>{
  assert.equal(t.whatPercent(30,150),20);
  assert.equal(t.whatPercent(50,50),100);
  assert.equal(t.whatPercent(5,0),null);
});
check('percentChange up and down (guards zero start)',()=>{
  assert.equal(t.percentChange(200,250),25);
  assert.equal(t.percentChange(250,200),-20);
  assert.equal(t.percentChange(100,100),0);
  assert.equal(t.percentChange(0,5),null);
});
check('addPercent / subPercent',()=>{
  assert.equal(t.addPercent(100,20),120);
  assert.equal(t.subPercent(100,20),80);
  assert.equal(t.addPercent(80,25),100);
  assert.equal(t.subPercent(200,100),0);
});

console.log(`\n${n} checks passed.`);
