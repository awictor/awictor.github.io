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
eval(js+`\n;globalThis.__t={titleCase,sentenceCase,upperCase,lowerCase,apply};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('titleCase: small words stay lowercase (not first/last)',()=>{
  assert.equal(t.titleCase("the lord of the rings"),"The Lord of the Rings");
  assert.equal(t.titleCase("a tale of two cities"),"A Tale of Two Cities");
  assert.equal(t.titleCase("gone with the wind"),"Gone With the Wind"); // "with" not a small word here
  assert.equal(t.titleCase("to be or not to be"),"To Be or Not to Be");
});
check('titleCase: first and last always capitalized',()=>{
  assert.equal(t.titleCase("of mice and men"),"Of Mice and Men");   // first "of" capitalized
  assert.equal(t.titleCase("what it is all for"),"What It Is All For"); // last "for" capitalized
});
check('sentenceCase',()=>{
  assert.equal(t.sentenceCase("hELLO wORLD. bye NOW"),"Hello world. Bye now");
  assert.equal(t.sentenceCase("one. two! three?"),"One. Two! Three?");
});
check('upper / lower',()=>{
  assert.equal(t.upperCase("Hello"),"HELLO");
  assert.equal(t.lowerCase("Hello"),"hello");
});
check('apply dispatches',()=>{
  assert.equal(t.apply("title","a b"),"A B");
  assert.equal(t.apply("upper","ab"),"AB");
  assert.equal(t.apply("nope","keep"),"keep");
});

console.log(`\n${n} checks passed.`);
