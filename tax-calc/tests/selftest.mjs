import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',checked:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelector(){return el();},querySelectorAll(){return[];},appendChild(){},onclick:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelector:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={addTax,removeTax};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b)=>Math.abs(a-b)<1e-9;

check('addTax',()=>{
  const r=t.addTax(100,20);
  assert.equal(r.tax,20); assert.equal(r.gross,120); assert.equal(r.net,100);
  assert.ok(near(t.addTax(50,8).gross,54));
  assert.equal(t.addTax(100,0).gross,100);
});
check('removeTax (reverse out of gross)',()=>{
  const r=t.removeTax(120,20);
  assert.ok(near(r.net,100)); assert.ok(near(r.tax,20));
  assert.ok(near(t.removeTax(108,8).net,100));
});
check('add then remove round-trips',()=>{
  const gross=t.addTax(200,15).gross;
  assert.ok(near(t.removeTax(gross,15).net,200));
});
check('removeTax at 0% is identity',()=>{
  const r=t.removeTax(99.99,0);
  assert.ok(near(r.net,99.99)); assert.ok(near(r.tax,0));
});

console.log(`\n${n} checks passed.`);
