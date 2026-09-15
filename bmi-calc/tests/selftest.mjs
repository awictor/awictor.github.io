import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',checked:false,hidden:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelector(){return el();},querySelectorAll(){return[];},appendChild(){},onclick:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelector:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={bmi,bmiImperial,bmiCategory,healthyRange};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('bmi (metric)',()=>{
  assert.ok(Math.abs(t.bmi(70,1.75)-22.857)<0.01);
  assert.ok(Math.abs(t.bmi(100,2.0)-25)<1e-9);
  assert.equal(t.bmi(70,0),0);
});
check('bmiImperial',()=>{
  // 154 lb, 5'9" = 69 in -> 703*154/69^2 = 22.74
  assert.ok(Math.abs(t.bmiImperial(154,69)-22.74)<0.02);
  assert.equal(t.bmiImperial(154,0),0);
});
check('bmiCategory: WHO thresholds',()=>{
  assert.equal(t.bmiCategory(17),"Underweight");
  assert.equal(t.bmiCategory(18.5),"Normal");
  assert.equal(t.bmiCategory(24.9),"Normal");
  assert.equal(t.bmiCategory(25),"Overweight");
  assert.equal(t.bmiCategory(29.9),"Overweight");
  assert.equal(t.bmiCategory(30),"Obese");
});
check('healthyRange: BMI 18.5–24.9 for a height',()=>{
  const hr=t.healthyRange(1.75);
  assert.ok(Math.abs(hr.min-56.66)<0.05);
  assert.ok(Math.abs(hr.max-76.26)<0.05);
  // endpoints map back to the boundary BMIs
  assert.ok(Math.abs(t.bmi(hr.min,1.75)-18.5)<1e-6);
  assert.ok(Math.abs(t.bmi(hr.max,1.75)-24.9)<1e-6);
});

console.log(`\n${n} checks passed.`);
