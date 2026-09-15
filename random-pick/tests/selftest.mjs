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
eval(js+`\n;globalThis.__t={randInt,pick,shuffle,pickN,rollDice};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const zero=()=>0, almost=()=>0.9999999;

check('randInt: bounds via rng edges',()=>{
  assert.equal(t.randInt(1,6,zero),1);
  assert.equal(t.randInt(1,6,almost),6);
  assert.equal(t.randInt(5,5,zero),5);
  assert.equal(t.randInt(10,1,zero),1); // swaps reversed range
});
check('randInt stays in range over many draws',()=>{
  for(let i=0;i<500;i++){ const v=t.randInt(1,6); assert.ok(v>=1&&v<=6&&Number.isInteger(v)); }
});
check('pick: first with rng 0, null on empty',()=>{
  assert.equal(t.pick(["a","b","c"],zero),"a");
  assert.equal(t.pick([],zero),null);
});
check('shuffle preserves the multiset',()=>{
  const src=["a","b","c","d","e"];
  const out=t.shuffle(src,Math.random);
  assert.equal(out.length,5);
  assert.deepEqual([...out].sort(),[...src].sort());
  assert.deepEqual(src,["a","b","c","d","e"]); // original untouched
});
check('pickN returns n items from the list',()=>{
  const out=t.pickN(["a","b","c","d"],2,Math.random);
  assert.equal(out.length,2);
  const set=new Set(["a","b","c","d"]);
  for(const x of out) assert.ok(set.has(x));
});
check('rollDice: rng 0 gives all 1s',()=>{
  const r=t.rollDice(6,3,zero);
  assert.deepEqual(r.rolls,[1,1,1]);
  assert.equal(r.sum,3);
});

console.log(`\n${n} checks passed.`);
