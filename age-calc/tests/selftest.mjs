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
eval(js+`\n;globalThis.__t={ageParts,totalDays,nextBirthday,isoDate};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('ageParts: exact years/months/days',()=>{
  assert.deepEqual(t.ageParts("2000-01-15","2024-03-20"),{years:24,months:2,days:5});
  assert.deepEqual(t.ageParts("2000-03-20","2024-03-20"),{years:24,months:0,days:0});
  assert.equal(t.ageParts("2025-01-01","2024-01-01"),null); // not born yet
});
check('totalDays',()=>{
  assert.equal(t.totalDays("2024-01-01","2024-01-31"),30);
  assert.equal(t.totalDays("2024-01-01","2025-01-01"),366); // 2024 leap
});
check('nextBirthday: upcoming this year',()=>{
  const nb=t.nextBirthday("2000-06-15","2024-03-20");
  assert.equal(nb.date,"2024-06-15");
  assert.equal(nb.daysUntil,87); // Mar20->Jun15
});
check('nextBirthday: already passed -> next year',()=>{
  const nb=t.nextBirthday("2000-01-10","2024-03-20");
  assert.equal(nb.date,"2025-01-10");
  assert.ok(nb.daysUntil>0);
});
check('nextBirthday: today is the birthday',()=>{
  const nb=t.nextBirthday("2000-03-20","2024-03-20");
  assert.equal(nb.date,"2024-03-20");
  assert.equal(nb.daysUntil,0);
});

console.log(`\n${n} checks passed.`);
