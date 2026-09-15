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
eval(js+`\n;globalThis.__t={parseField,parseCron,describeCron,nextRuns};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const iso=d=>d.toISOString().slice(0,16)+"Z";

check('parseField: star, step, range, list, names',()=>{
  assert.deepEqual(t.parseField('*',0,5),[0,1,2,3,4,5]);
  assert.deepEqual(t.parseField('*/2',0,6),[0,2,4,6]);
  assert.deepEqual(t.parseField('1-3',0,9),[1,2,3]);
  assert.deepEqual(t.parseField('5,1,3',0,9),[1,3,5]);
  assert.deepEqual(t.parseField('mon-fri',0,6,{SUN:0,MON:1,TUE:2,WED:3,THU:4,FRI:5,SAT:6}),[1,2,3,4,5]);
  assert.equal(t.parseField('99',0,59),null);
  assert.equal(t.parseField('',0,59),null);
});
check('parseCron: valid shape + macros + invalid',()=>{
  const p=t.parseCron('*/15 0 * * *');
  assert.deepEqual(p.minute,[0,15,30,45]);
  assert.deepEqual(p.hour,[0]);
  assert.equal(p.dom.length,31);
  assert.deepEqual(t.parseCron('@hourly').minute,[0]);
  assert.deepEqual(t.parseCron('0 0 * * 7').dow,[0]); // 7 == Sunday
  assert.equal(t.parseCron('* * *'),null);      // too few fields
  assert.equal(t.parseCron('60 * * * *'),null);  // minute out of range
});
check('describeCron: common templates',()=>{
  assert.equal(t.describeCron('* * * * *'),'Every minute.');
  assert.equal(t.describeCron('*/5 * * * *'),'Every 5 minutes.');
  assert.equal(t.describeCron('0 * * * *'),'Every hour, on the hour.');
  assert.equal(t.describeCron('0 9 * * *'),'Every day at 09:00.');
  assert.equal(t.describeCron('30 8 1 * *'),'At 08:30, on day 1 of the month.');
  assert.equal(t.describeCron('0 0 * * 0'),'At 00:00, only on Sunday.');
});
check('nextRuns: 9:00 every Monday',()=>{
  // 2024-01-01 is a Monday (UTC)
  const runs=t.nextRuns('0 9 * * 1',new Date('2024-01-01T00:00:00Z'),3);
  assert.deepEqual(runs.map(iso),['2024-01-01T09:00Z','2024-01-08T09:00Z','2024-01-15T09:00Z']);
});
check('nextRuns: every 15 minutes rolls the hour',()=>{
  const runs=t.nextRuns('*/15 * * * *',new Date('2024-03-10T10:07:00Z'),3);
  assert.deepEqual(runs.map(iso),['2024-03-10T10:15Z','2024-03-10T10:30Z','2024-03-10T10:45Z']);
});
check('nextRuns: DOM or DOW (either) when both restricted',()=>{
  // "on the 1st OR on Mondays" at 00:00, Jan 2024 (1st is Mon). Next: Jan1, then Mondays 8,15,22,29
  const runs=t.nextRuns('0 0 1 * 1',new Date('2024-01-01T12:00:00Z'),3);
  assert.deepEqual(runs.map(iso),['2024-01-08T00:00Z','2024-01-15T00:00Z','2024-01-22T00:00Z']);
});
check('nextRuns: invalid expression yields nothing',()=>{
  assert.deepEqual(t.nextRuns('nope',new Date('2024-01-01T00:00:00Z'),3),[]);
});

console.log(`\n${n} checks passed.`);
