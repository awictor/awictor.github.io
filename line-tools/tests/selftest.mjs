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
eval(js+`\n;globalThis.__t={sortLines,dedupe,removeBlank,trimLines,reverseLines,numberLines,apply};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('sortLines: az / za / numeric',()=>{
  assert.equal(t.sortLines("banana\napple\ncherry","az"),"apple\nbanana\ncherry");
  assert.equal(t.sortLines("banana\napple\ncherry","za"),"cherry\nbanana\napple");
  assert.equal(t.sortLines("10\n2\n1","num"),"1\n2\n10");
});
check('dedupe: keeps first occurrence, order preserved',()=>{
  assert.equal(t.dedupe("a\nb\na\nc\nb"),"a\nb\nc");
});
check('removeBlank & trim',()=>{
  assert.equal(t.removeBlank("a\n\nb\n   \nc"),"a\nb\nc");
  assert.equal(t.trimLines("  a \n b  "),"a\nb");
});
check('reverse & number',()=>{
  assert.equal(t.reverseLines("a\nb\nc"),"c\nb\na");
  assert.equal(t.numberLines("x\ny"),"1. x\n2. y");
});
check('apply dispatches',()=>{
  assert.equal(t.apply("az","b\na"),"a\nb");
  assert.equal(t.apply("dedupe","a\na"),"a");
  assert.equal(t.apply("unknown","keep"),"keep");
});

console.log(`\n${n} checks passed.`);
