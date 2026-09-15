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
eval(js+`\n;globalThis.__t={LENGTH,MASS,VOLUME,AREA,SPEED,DATA,convertFactor,convertTemp,convert};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b,e)=>Math.abs(a-b)<(e||1e-9);

check('length conversions',()=>{
  assert.equal(t.convertFactor(1,"km","m",t.LENGTH),1000);
  assert.ok(near(t.convertFactor(12,"in","ft",t.LENGTH),1));
  assert.ok(near(t.convertFactor(1,"mi","km",t.LENGTH),1.609344));
  assert.ok(near(t.convertFactor(100,"cm","m",t.LENGTH),1));
});
check('mass conversions',()=>{
  assert.ok(near(t.convertFactor(16,"oz","lb",t.MASS),1));
  assert.equal(t.convertFactor(1,"kg","g",t.MASS),1000);
  assert.ok(near(t.convertFactor(1,"kg","lb",t.MASS),2.2046226218,1e-6));
});
check('volume conversions',()=>{
  assert.ok(near(t.convertFactor(1,"gal","L",t.VOLUME),3.785411784));
  assert.ok(near(t.convertFactor(1,"L","mL",t.VOLUME),1000));
});
check('temperature conversions',()=>{
  assert.ok(near(t.convertTemp(100,"C","F"),212));
  assert.ok(near(t.convertTemp(32,"F","C"),0));
  assert.ok(near(t.convertTemp(0,"C","K"),273.15));
  assert.ok(near(t.convertTemp(300,"K","C"),26.85,1e-9));
  assert.ok(near(t.convertTemp(37,"C","F"),98.6,1e-9));
});
check('convert: dispatches by category, null on bad unit',()=>{
  assert.equal(t.convert(1,"km","m","Length"),1000);
  assert.ok(near(t.convert(100,"C","F","Temperature"),212));
  assert.equal(t.convert(1,"km","xx","Length"),null);
});
check('area conversions',()=>{
  assert.equal(t.convertFactor(1,"km²","m²",t.AREA),1e6);
  assert.equal(t.convertFactor(1,"ha","m²",t.AREA),10000);
  assert.ok(near(t.convertFactor(1,"acre","m²",t.AREA),4046.8564224));
});
check('speed conversions',()=>{
  assert.ok(near(t.convertFactor(100,"km/h","m/s",t.SPEED),27.77777778,1e-6));
  assert.ok(near(t.convertFactor(60,"mph","km/h",t.SPEED),96.56064,1e-5));
});
check('data-size conversions (SI + binary)',()=>{
  assert.equal(t.convertFactor(1,"GB","MB",t.DATA),1000);
  assert.equal(t.convertFactor(1,"MiB","KiB",t.DATA),1024);
  assert.equal(t.convertFactor(1,"B","bit",t.DATA),8);
  assert.equal(t.convert(1,"TiB","GiB","Data"),1024);
});

console.log(`\n${n} checks passed.`);
