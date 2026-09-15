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
globalThis.setInterval=()=>0;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={detectUnit,epochToDate,dateToEpoch,formatUTC,relativeFromNow};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('detectUnit: seconds vs milliseconds by magnitude',()=>{
  assert.equal(t.detectUnit(1516239022),'s');
  assert.equal(t.detectUnit(1516239022000),'ms');
  assert.equal(t.detectUnit(0),'s');
});
check('epochToDate: canonical timestamp (seconds)',()=>{
  const d=t.epochToDate(1516239022,'s');
  assert.equal(d.toISOString(),'2018-01-18T01:30:22.000Z');
});
check('epochToDate: auto-detects ms',()=>{
  const d=t.epochToDate(1516239022000);
  assert.equal(d.toISOString(),'2018-01-18T01:30:22.000Z');
  assert.equal(t.epochToDate('nope'),null);
});
check('formatUTC: fixed format',()=>{
  assert.equal(t.formatUTC(t.epochToDate(1516239022,'s')),'2018-01-18 01:30:22 UTC');
});
check('dateToEpoch: parses ISO, round-trips',()=>{
  const e=t.dateToEpoch('2018-01-18T01:30:22Z');
  assert.equal(e.seconds,1516239022);
  assert.equal(e.millis,1516239022000);
  assert.equal(t.dateToEpoch('not a date'),null);
  // round trip
  assert.equal(t.dateToEpoch(t.epochToDate(1516239022,'s')).seconds,1516239022);
});
check('relativeFromNow: past and future',()=>{
  const now=1516239022000;
  assert.ok(/ago$/.test(t.relativeFromNow(new Date(now-3600*1000),now)));
  assert.ok(/^in /.test(t.relativeFromNow(new Date(now+2*86400*1000),now)));
  assert.equal(t.relativeFromNow(new Date(now),now),'just now');
});

console.log(`\n${n} checks passed.`);
