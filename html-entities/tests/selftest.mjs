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
eval(js+`\n;globalThis.__t={encodeHtml,decodeHtml};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('encodeHtml: escapes the five special chars',()=>{
  assert.equal(t.encodeHtml('<a href="x">&'),'&lt;a href=&quot;x&quot;&gt;&amp;');
  assert.equal(t.encodeHtml("it's"),"it&#39;s");
  assert.equal(t.encodeHtml("plain"),"plain");
});
check('decodeHtml: named entities',()=>{
  assert.equal(t.decodeHtml("&lt;a&gt; &amp; &quot;q&quot; &#39;"),"<a> & \"q\" '");
  assert.equal(t.decodeHtml("Tom &amp; Jerry"),"Tom & Jerry");
  assert.equal(t.decodeHtml("&copy;&mdash;"),"©—");
});
check('decodeHtml: numeric and hex',()=>{
  assert.equal(t.decodeHtml("&#65;&#66;&#67;"),"ABC");
  assert.equal(t.decodeHtml("&#x41;&#x42;"),"AB");
  assert.equal(t.decodeHtml("&#x1F600;"),"\u{1F600}");
});
check('decodeHtml: leaves unknown entities intact',()=>{
  assert.equal(t.decodeHtml("&notareal; &amp;"),"&notareal; &");
});
check('round-trip encode -> decode',()=>{
  for(const s of ['<a href="x">Tom & Jerry</a>',"quotes \" ' & <tags>","plain text"]) assert.equal(t.decodeHtml(t.encodeHtml(s)),s);
});

console.log(`\n${n} checks passed.`);
