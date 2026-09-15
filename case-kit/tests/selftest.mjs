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
eval(js+`\n;globalThis.__t={tokens,toCamel,toPascal,toSnake,toKebab,toConstant,toDot,toTitle,toSentence,toSlug};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('tokens: splits separators and camelCase humps',()=>{
  assert.deepEqual(t.tokens("Hello World-example_test"),["hello","world","example","test"]);
  assert.deepEqual(t.tokens("getHTTPResponseCode"),["get","http","response","code"]);
  assert.deepEqual(t.tokens("already_snake"),["already","snake"]);
  assert.deepEqual(t.tokens("  spaced   out  "),["spaced","out"]);
  assert.deepEqual(t.tokens(""),[]);
});
check('the standard cases',()=>{
  const s="Hello World example_test";
  assert.equal(t.toCamel(s),"helloWorldExampleTest");
  assert.equal(t.toPascal(s),"HelloWorldExampleTest");
  assert.equal(t.toSnake(s),"hello_world_example_test");
  assert.equal(t.toKebab(s),"hello-world-example-test");
  assert.equal(t.toConstant(s),"HELLO_WORLD_EXAMPLE_TEST");
  assert.equal(t.toDot(s),"hello.world.example.test");
  assert.equal(t.toTitle(s),"Hello World Example Test");
  assert.equal(t.toSentence(s),"Hello world example test");
  assert.equal(t.toSlug(s),"hello-world-example-test");
});
check('acronym-heavy identifier',()=>{
  assert.equal(t.toCamel("getHTTPResponseCode"),"getHttpResponseCode");
  assert.equal(t.toConstant("XMLHttpRequest"),"XML_HTTP_REQUEST");
});
check('empty input yields empty strings',()=>{
  for(const f of ["toCamel","toSnake","toKebab","toConstant","toTitle","toSentence","toSlug"])
    assert.equal(t[f](""),"");
});
check('numbers are preserved as their own boundaries',()=>{
  assert.equal(t.toKebab("version2Point0"),"version2-point0");
  assert.deepEqual(t.tokens("foo123Bar"),["foo123","bar"]);
});

console.log(`\n${n} checks passed.`);
