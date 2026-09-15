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
eval(js+`\n;globalThis.__t={parseInBase,toBase,convert};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('toBase: known values',()=>{
  assert.equal(t.toBase(255n,16),"ff");
  assert.equal(t.toBase(255n,2),"11111111");
  assert.equal(t.toBase(8n,8),"10");
  assert.equal(t.toBase(0n,2),"0");
  assert.equal(t.toBase(-255n,16),"-ff");
  assert.equal(t.toBase(35n,36),"z");
});
check('parseInBase: known values + invalid',()=>{
  assert.equal(t.parseInBase("ff",16),255n);
  assert.equal(t.parseInBase("11111111",2),255n);
  assert.equal(t.parseInBase("-10",2),-2n);
  assert.equal(t.parseInBase("zz",16),null); // digit out of range
  assert.equal(t.parseInBase("",10),null);
  assert.equal(t.parseInBase("12",2),null);  // '2' invalid in binary
});
check('convert: cross-base',()=>{
  assert.equal(t.convert("ff",16,2),"11111111");
  assert.equal(t.convert("255",10,16),"ff");
  assert.equal(t.convert("777",8,10),"511");
  assert.equal(t.convert("bad",16,10),"2989"); // b,a,d valid hex
});
check('round-trips across bases',()=>{
  for(const dec of ["0","1","255","4096","123456789012345678901234567890"]){
    for(const b of [2,8,16,36]){
      assert.equal(t.convert(t.convert(dec,10,b),b,10),dec);
    }
  }
});
check('base bounds rejected',()=>{
  assert.equal(t.toBase(5n,1),null);
  assert.equal(t.toBase(5n,37),null);
  assert.equal(t.parseInBase("5",40),null);
});

console.log(`\n${n} checks passed.`);
