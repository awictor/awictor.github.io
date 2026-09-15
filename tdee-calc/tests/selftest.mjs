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
eval(js+`\n;globalThis.__t={bmrMifflin,tdee,goalCalories};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('bmrMifflin: male and female',()=>{
  // male: 10*80 + 6.25*180 - 5*30 + 5 = 1780
  assert.equal(t.bmrMifflin(80,180,30,"male"),1780);
  // female: 10*65 + 6.25*165 - 5*30 - 161 = 1370.25
  assert.ok(Math.abs(t.bmrMifflin(65,165,30,"female")-1370.25)<1e-9);
  // sex defaults to male branch unless female
  assert.equal(t.bmrMifflin(80,180,30,"m"),1780);
});
check('tdee: BMR * activity factor',()=>{
  assert.ok(Math.abs(t.tdee(1780,1.55)-2759)<1e-9);
  assert.equal(t.tdee(1500,1.2),1800);
});
check('goalCalories: ±500 around maintenance',()=>{
  assert.deepEqual(t.goalCalories(2759),{lose:2259,maintain:2759,gain:3259});
});
check('female BMR is 166 kcal below male (same inputs)',()=>{
  assert.ok(Math.abs((t.bmrMifflin(70,170,30,"male")-t.bmrMifflin(70,170,30,"female"))-166)<1e-9);
});

console.log(`\n${n} checks passed.`);
