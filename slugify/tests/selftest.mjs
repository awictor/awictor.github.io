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
eval(js+`\n;globalThis.__t={slugify};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('slugify: basic + punctuation collapse',()=>{
  assert.equal(t.slugify("Hello World!"),"hello-world");
  assert.equal(t.slugify("  multiple   spaces  "),"multiple-spaces");
  assert.equal(t.slugify("Rock & Roll"),"rock-roll");
  assert.equal(t.slugify("a/b\\c"),"a-b-c");
});
check('slugify: strips accents',()=>{
  assert.equal(t.slugify("Café Déjà Vu"),"cafe-deja-vu");
  assert.equal(t.slugify("naïve piñata"),"naive-pinata");
});
check('slugify: separator option',()=>{
  assert.equal(t.slugify("Hello World","_"),"hello_world");
});
check('slugify: max length trims trailing separator',()=>{
  assert.equal(t.slugify("hello world foo","-",8),"hello-wo");
  assert.equal(t.slugify("hello world foo","-",6),"hello");
});
check('slugify: empty / all-punctuation -> empty',()=>{
  assert.equal(t.slugify("!!!"),"");
  assert.equal(t.slugify(""),"");
});

console.log(`\n${n} checks passed.`);
