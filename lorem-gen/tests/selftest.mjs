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
eval(js+`\n;globalThis.__t={words,sentence,paragraph,generate,BANK,CLASSIC};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const zero=()=>0; // deterministic rng: always picks BANK[0] = "lorem", n at minimum

check('words: exact count, drawn from bank/classic',()=>{
  const w=t.words(10,false,zero);
  assert.equal(w.length,10);
  const set=new Set(t.BANK);
  for(const x of w) assert.ok(set.has(x),'unknown word '+x);
});
check('words: classic opening fills first words',()=>{
  const w=t.words(5,true,zero);
  assert.deepEqual(w,["lorem","ipsum","dolor","sit","amet"]);
});
check('sentence: capitalized, ends with period, min 6 words at rng 0',()=>{
  const s=t.sentence(false,zero);
  assert.ok(/^[A-Z]/.test(s));
  assert.ok(s.endsWith("."));
  assert.equal(s.slice(0,-1).split(" ").length,6);
});
check('paragraph: 3 sentences at rng 0',()=>{
  const p=t.paragraph(false,zero);
  assert.equal((p.match(/\./g)||[]).length,3);
});
check('generate: words unit, classic exact',()=>{
  assert.equal(t.generate({units:"words",count:5,classic:true},zero),"Lorem ipsum dolor sit amet.");
});
check('generate: sentences and paragraphs counts',()=>{
  assert.equal((t.generate({units:"sentences",count:4},zero).match(/\./g)||[]).length,4);
  assert.equal(t.generate({units:"paragraphs",count:3},zero).split("\n\n").length,3);
});

console.log(`\n${n} checks passed.`);
