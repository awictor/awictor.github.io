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
eval(js+`\n;globalThis.__t={parseUrl};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('parseUrl: full URL parts',()=>{
  const r=t.parseUrl("https://example.com:8080/path?a=1&b=2#frag");
  assert.equal(r.error,null);
  assert.equal(r.protocol,"https:");
  assert.equal(r.hostname,"example.com");
  assert.equal(r.port,"8080");
  assert.equal(r.pathname,"/path");
  assert.equal(r.hash,"#frag");
  assert.deepEqual(r.params,[["a","1"],["b","2"]]);
});
check('parseUrl: query decoding (+ and %20)',()=>{
  assert.deepEqual(t.parseUrl("https://x.com/?q=hello+world").params,[["q","hello world"]]);
  assert.deepEqual(t.parseUrl("https://x.com/?q=a%20b").params,[["q","a b"]]);
});
check('parseUrl: userinfo + default port',()=>{
  const r=t.parseUrl("https://user:pass@x.com/p");
  assert.equal(r.username,"user");
  assert.equal(r.password,"pass");
  assert.equal(r.port,""); // default port is empty string
  assert.equal(r.origin,"https://x.com");
});
check('parseUrl: invalid input returns error',()=>{
  assert.ok(t.parseUrl("not a url").error);
  assert.ok(t.parseUrl("example.com/no-scheme").error);
});

console.log(`\n${n} checks passed.`);
