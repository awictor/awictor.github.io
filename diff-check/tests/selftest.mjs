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
eval(js+`\n;globalThis.__t={diffLines,diffStats};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const types=d=>d.map(x=>x.type);

check('diffLines: single line changed',()=>{
  const d=t.diffLines("a\nb\nc","a\nx\nc");
  assert.deepEqual(types(d),["same","del","add","same"]);
  assert.deepEqual(t.diffStats(d),{added:1,removed:1,unchanged:2});
});
check('diffLines: identical text is all same',()=>{
  const d=t.diffLines("one\ntwo","one\ntwo");
  assert.deepEqual(types(d),["same","same"]);
  assert.deepEqual(t.diffStats(d),{added:0,removed:0,unchanged:2});
});
check('diffLines: pure additions and deletions',()=>{
  // "" is one empty line, replaced by the two new lines
  assert.deepEqual(t.diffStats(t.diffLines("","a\nb")),{added:2,removed:1,unchanged:0});
  assert.deepEqual(t.diffStats(t.diffLines("a\nb\nc","")),{added:1,removed:3,unchanged:0});
});
check('diffLines: appended line kept common prefix',()=>{
  const d=t.diffLines("x\ny","x\ny\nz");
  assert.deepEqual(types(d),["same","same","add"]);
  assert.equal(d[2].line,"z");
});
check('diffLines: reordered/inserted middle line via LCS',()=>{
  // longest common subsequence keeps a,c; b removed, x added
  const d=t.diffLines("a\nb\nc","a\nx\nc");
  assert.equal(d.find(l=>l.type==="del").line,"b");
  assert.equal(d.find(l=>l.type==="add").line,"x");
});

console.log(`\n${n} checks passed.`);
