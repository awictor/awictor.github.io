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
eval(js+`\n;globalThis.__t={daysBetween,addDays,dayOfWeek,diffParts,isoDate};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('daysBetween: exact, leap-year aware',()=>{
  assert.equal(t.daysBetween("2024-01-01","2024-01-31"),30);
  assert.equal(t.daysBetween("2024-02-01","2024-03-01"),29); // 2024 is a leap year
  assert.equal(t.daysBetween("2023-02-01","2023-03-01"),28);
  assert.equal(t.daysBetween("2024-01-01","2025-01-01"),366);
  assert.equal(t.daysBetween("2024-05-10","2024-05-10"),0);
  assert.equal(t.daysBetween("2024-01-10","2024-01-01"),-9);
});
check('addDays: rolls months and years, leap day',()=>{
  assert.equal(t.addDays("2024-02-28",1),"2024-02-29");
  assert.equal(t.addDays("2024-12-31",1),"2025-01-01");
  assert.equal(t.addDays("2024-03-01",-1),"2024-02-29");
  assert.equal(t.addDays("2024-01-01",90),"2024-03-31");
});
check('dayOfWeek (UTC)',()=>{
  assert.equal(t.dayOfWeek("2024-01-01"),"Monday");
  assert.equal(t.dayOfWeek("2000-01-01"),"Saturday");
});
check('diffParts: calendar years/months/days',()=>{
  assert.deepEqual(t.diffParts("2020-01-15","2023-03-20"),{years:3,months:2,days:5});
  assert.deepEqual(t.diffParts("2024-01-10","2024-03-15"),{years:0,months:2,days:5});
  assert.deepEqual(t.diffParts("2023-03-20","2020-01-15"),{years:3,months:2,days:5}); // order-independent
});
check('invalid input yields null',()=>{
  assert.equal(t.daysBetween("nope","2024-01-01"),null);
  assert.equal(t.addDays("bad",5),null);
});

console.log(`\n${n} checks passed.`);
