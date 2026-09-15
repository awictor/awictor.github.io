import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',checked:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},onclick:null,onchange:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={runRegex};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('global match: all occurrences with indices',()=>{
  const r=t.runRegex("\\d+","g","a1b22c333");
  assert.equal(r.error,null);
  assert.deepEqual(r.matches.map(m=>m.match),["1","22","333"]);
  assert.deepEqual(r.matches.map(m=>m.index),[1,3,6]);
});
check('capture groups',()=>{
  const r=t.runRegex("(\\w)(\\w)","","ab cd");
  assert.equal(r.matches.length,1);        // non-global: one match
  assert.deepEqual(r.matches[0].groups,["a","b"]);
});
check('non-global returns at most one match',()=>{
  assert.equal(t.runRegex("\\d","","1 2 3").matches.length,1);
});
check('invalid pattern returns an error',()=>{
  const r=t.runRegex("(","","x");
  assert.ok(r.error);
  assert.deepEqual(r.matches,[]);
});
check('empty/zero-length matches do not infinite-loop',()=>{
  const r=t.runRegex("a*","g","aa");
  assert.ok(r.matches.length>0);
  assert.ok(r.matches.length<1000);
});
check('email-ish pattern on sample',()=>{
  const r=t.runRegex("(\\w+)@(\\w+)","g","bob@example alice@site");
  assert.equal(r.matches.length,2);
  assert.deepEqual(r.matches[0].groups,["bob","example"]);
});

console.log(`\n${n} checks passed.`);
