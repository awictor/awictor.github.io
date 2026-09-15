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
eval(js+`\n;globalThis.__t={toRoman,fromRoman};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('toRoman: known values + bounds',()=>{
  assert.equal(t.toRoman(4),"IV");
  assert.equal(t.toRoman(9),"IX");
  assert.equal(t.toRoman(2024),"MMXXIV");
  assert.equal(t.toRoman(3999),"MMMCMXCIX");
  assert.equal(t.toRoman(0),null);
  assert.equal(t.toRoman(4000),null);
  assert.equal(t.toRoman(3.5),null);
});
check('fromRoman: known values',()=>{
  assert.equal(t.fromRoman("IV"),4);
  assert.equal(t.fromRoman("MMXXIV"),2024);
  assert.equal(t.fromRoman("mmmcmxcix"),3999); // case-insensitive
  assert.equal(t.fromRoman("XLII"),42);
});
check('fromRoman: rejects non-canonical & junk',()=>{
  assert.equal(t.fromRoman("IIII"),null); // should be IV
  assert.equal(t.fromRoman("IL"),null);   // not valid subtractive
  assert.equal(t.fromRoman("VV"),null);
  assert.equal(t.fromRoman("ABC"),null);
  assert.equal(t.fromRoman(""),null);
});
check('round-trip 1..3999',()=>{
  for(const n of [1,4,14,40,90,444,999,1666,2024,3888,3999]){
    assert.equal(t.fromRoman(t.toRoman(n)),n);
  }
});

console.log(`\n${n} checks passed.`);
