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
eval(js+`\n;globalThis.__t={parseCsv,csvToRecords,csvToJson,recordsToCsv,jsonToCsv,esc};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('parseCsv: simple grid',()=>{
  assert.deepEqual(t.parseCsv("a,b\n1,2"),[["a","b"],["1","2"]]);
  assert.deepEqual(t.parseCsv("a,b\n1,2\n"),[["a","b"],["1","2"]]); // trailing newline dropped
});
check('parseCsv: quoted fields with commas, quotes, newlines',()=>{
  assert.deepEqual(t.parseCsv('a,"b,c"\n"x""y",z'),[["a","b,c"],['x"y',"z"]]);
  assert.deepEqual(t.parseCsv('"line1\nline2",end'),[["line1\nline2","end"]]);
});
check('csvToRecords: header maps to objects',()=>{
  assert.deepEqual(t.csvToRecords("name,age\nAlex,30\nSam,25"),[{name:"Alex",age:"30"},{name:"Sam",age:"25"}]);
  assert.deepEqual(t.csvToRecords(""),[]);
});
check('recordsToCsv: header union + quoting',()=>{
  assert.equal(t.recordsToCsv([{a:1,b:2},{a:3,b:4}]),"a,b\n1,2\n3,4");
  assert.equal(t.recordsToCsv([{x:"a,b"},{x:'he said "hi"'}]),'x\n"a,b"\n"he said ""hi"""');
  assert.equal(t.recordsToCsv([]),"");
});
check('jsonToCsv: parses JSON text, wraps single object',()=>{
  assert.equal(t.jsonToCsv('[{"a":"1","b":"2"}]'),"a,b\n1,2");
  assert.equal(t.jsonToCsv('{"a":"1","b":"2"}'),"a,b\n1,2");
});
check('round-trip CSV -> records -> CSV',()=>{
  const csv="name,note\nAlex,\"hello, world\"\nSam,plain";
  assert.equal(t.recordsToCsv(t.csvToRecords(csv)),csv);
});

console.log(`\n${n} checks passed.`);
