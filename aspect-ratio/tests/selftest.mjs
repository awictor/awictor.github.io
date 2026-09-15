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
eval(js+`\n;globalThis.__t={gcd,simplifyRatio,heightFor,widthFor};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('gcd',()=>{
  assert.equal(t.gcd(1920,1080),120);
  assert.equal(t.gcd(17,5),1);
  assert.equal(t.gcd(100,0),100);
});
check('simplifyRatio: common resolutions',()=>{
  assert.deepEqual(t.simplifyRatio(1920,1080),{w:16,h:9});
  assert.deepEqual(t.simplifyRatio(1280,1024),{w:5,h:4});
  assert.deepEqual(t.simplifyRatio(3840,2160),{w:16,h:9});
  assert.deepEqual(t.simplifyRatio(1000,1000),{w:1,h:1});
});
check('heightFor / widthFor: 16:9',()=>{
  assert.equal(t.heightFor(1600,16,9),900);
  assert.equal(t.widthFor(900,16,9),1600);
  assert.equal(t.heightFor(1920,16,9),1080);
  assert.equal(t.heightFor(100,0,9),0); // guard against divide by zero
});
check('round-trip through the ratio',()=>{
  const w=1280, h=t.heightFor(w,16,9); // 720
  assert.equal(h,720);
  assert.equal(t.widthFor(h,16,9),w);
});

console.log(`\n${n} checks passed.`);
