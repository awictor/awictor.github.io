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
eval(js+`\n;globalThis.__t={textToMorse,morseToText,MORSE};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('textToMorse: letters, words, numbers',()=>{
  assert.equal(t.textToMorse("SOS"),"... --- ...");
  assert.equal(t.textToMorse("HI THERE"),".... .. / - .... . .-. .");
  assert.equal(t.textToMorse("SOS 123"),"... --- ... / .---- ..--- ...--");
  assert.equal(t.textToMorse(""),"");
});
check('morseToText: reverse',()=>{
  assert.equal(t.morseToText("... --- ..."),"SOS");
  assert.equal(t.morseToText(".... .. / - .... . .-. ."),"HI THERE");
});
check('case-insensitive + round-trip',()=>{
  assert.equal(t.textToMorse("hello world"),t.textToMorse("HELLO WORLD"));
  for(const s of ["HELLO WORLD","SOS 911","ABC XYZ 42"]) assert.equal(t.morseToText(t.textToMorse(s)),s);
});
check('punctuation',()=>{
  assert.equal(t.textToMorse("A?"),".- ..--..");
  assert.equal(t.morseToText(".- ..--.."),"A?");
});

console.log(`\n${n} checks passed.`);
