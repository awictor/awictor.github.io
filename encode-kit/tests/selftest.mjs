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
eval(js+`\n;globalThis.__t={b64Encode,b64Decode,urlEncode,urlDecode,convert};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('b64Encode: known value',()=>{
  assert.equal(t.b64Encode("Hello"),"SGVsbG8=");
  assert.equal(t.b64Encode("Hello, world!"),"SGVsbG8sIHdvcmxkIQ==");
});
check('b64Decode: known value + invalid',()=>{
  assert.equal(t.b64Decode("SGVsbG8="),"Hello");
  assert.equal(t.b64Decode("@@@@"),null);
});
check('base64 round-trips incl UTF-8',()=>{
  for(const s of ["héllo","日本語 🎉","",'{"a":1}']) assert.equal(t.b64Decode(t.b64Encode(s)),s);
});
check('urlEncode / urlDecode',()=>{
  assert.equal(t.urlEncode("a b&c=d"),"a%20b%26c%3Dd");
  assert.equal(t.urlDecode("a%20b%26c"),"a b&c");
  assert.equal(t.urlDecode("%"),null); // malformed percent-encoding
});
check('url round-trips',()=>{
  for(const s of ["path/to file?x=1&y=2","café ☕",""]) assert.equal(t.urlDecode(t.urlEncode(s)),s);
});
check('convert: dispatches by mode + direction',()=>{
  assert.equal(t.convert("base64","encode","Hello"),"SGVsbG8=");
  assert.equal(t.convert("base64","decode","SGVsbG8="),"Hello");
  assert.equal(t.convert("url","encode","a b"),"a%20b");
  assert.equal(t.convert("url","decode","a%20b"),"a b");
});

console.log(`\n${n} checks passed.`);
