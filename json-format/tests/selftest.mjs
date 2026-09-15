import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',checked:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},onclick:null,onchange:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={parseJson,formatJson,minifyJson,jsonStats};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('formatJson: beautifies with the given indent',()=>{
  const r=t.formatJson('{"a":1,"b":[1,2]}',2);
  assert.ok(r.ok);
  assert.equal(r.output,'{\n  "a": 1,\n  "b": [\n    1,\n    2\n  ]\n}');
  assert.equal(t.formatJson('{"a":1}','\t').output,'{\n\t"a": 1\n}');
});
check('formatJson: reports invalid JSON',()=>{
  const r=t.formatJson('{bad}');
  assert.equal(r.ok,false);
  assert.ok(r.error && r.error.length>0);
  assert.equal(r.output,null);
});
check('minifyJson: strips whitespace',()=>{
  assert.equal(t.minifyJson('{ "a": 1, "b": [1, 2] }').output,'{"a":1,"b":[1,2]}');
  assert.equal(t.minifyJson('nope').ok,false);
});
check('format/minify round-trip',()=>{
  const src='{"x":[1,{"y":"z"}],"n":true}';
  const pretty=t.formatJson(src,2).output;
  assert.equal(t.minifyJson(pretty).output,t.minifyJson(src).output);
});
check('jsonStats: counts keys, arrays, depth',()=>{
  const st=t.jsonStats(t.parseJson('{"a":1,"b":[1,2],"c":{"d":"x"}}').value);
  assert.equal(st.keys,4);   // a,b,c + d
  assert.equal(st.arrays,1);
  assert.equal(st.strings,1);
  assert.equal(st.numbers,3);
  assert.equal(st.depth,2);
});

console.log(`\n${n} checks passed.`);
