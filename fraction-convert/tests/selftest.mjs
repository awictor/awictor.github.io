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
eval(js+`\n;globalThis.__t={gcd,decimalToFraction,fractionToDecimal,parseFraction};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('decimalToFraction: simplified',()=>{
  assert.deepEqual(t.decimalToFraction(0.5),{whole:0,num:1,den:2});
  assert.deepEqual(t.decimalToFraction(0.75),{whole:0,num:3,den:4});
  assert.deepEqual(t.decimalToFraction(0.375),{whole:0,num:3,den:8});
  assert.deepEqual(t.decimalToFraction(1.25),{whole:1,num:1,den:4});
  assert.deepEqual(t.decimalToFraction(2),{whole:2,num:0,den:1});
});
check('decimalToFraction: 1/3 within maxDenom',()=>{
  assert.deepEqual(t.decimalToFraction(0.333333,64),{whole:0,num:1,den:3});
});
check('fractionToDecimal',()=>{
  assert.equal(t.fractionToDecimal(3,4),0.75);
  assert.equal(t.fractionToDecimal(1,3),1/3);
  assert.equal(t.fractionToDecimal(5,0),0);
});
check('parseFraction: mixed, simple, decimal, invalid',()=>{
  assert.equal(t.parseFraction("1 1/2"),1.5);
  assert.equal(t.parseFraction("3/4"),0.75);
  assert.equal(t.parseFraction("2"),2);
  assert.equal(t.parseFraction("0.25"),0.25);
  assert.equal(t.parseFraction("1/0"),null);
  assert.equal(t.parseFraction("abc"),null);
});
check('round-trip decimal -> fraction -> decimal',()=>{
  for(const x of [0.5,0.75,0.375,0.125,1.25]){
    const f=t.decimalToFraction(x,64);
    assert.ok(Math.abs(t.fractionToDecimal(f.num,f.den)+f.whole - x)<1e-9);
  }
});

console.log(`\n${n} checks passed.`);
