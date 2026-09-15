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
eval(js+`\n;globalThis.__t={macroGrams};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||0.01);

check('macroGrams: balanced 30/40/30 at 2000 kcal',()=>{
  const g=t.macroGrams(2000,{p:30,c:40,f:30});
  assert.equal(g.protein,150); // 2000*.3/4
  assert.equal(g.carbs,200);   // 2000*.4/4
  assert.ok(near(g.fat,66.6667));// 2000*.3/9
});
check('macroGrams: fat uses 9 kcal/g',()=>{
  const g=t.macroGrams(900,{p:0,c:0,f:100});
  assert.equal(g.fat,100);
});
check('macroGrams: protein & carbs use 4 kcal/g',()=>{
  assert.equal(t.macroGrams(400,{p:100,c:0,f:0}).protein,100);
  assert.equal(t.macroGrams(400,{p:0,c:100,f:0}).carbs,100);
});
check('kcal from macros reconstructs total',()=>{
  const cal=2500, g=t.macroGrams(cal,{p:40,c:40,f:20});
  const kcal=g.protein*4 + g.carbs*4 + g.fat*9;
  assert.ok(near(kcal,cal,0.001));
});

console.log(`\n${n} checks passed.`);
