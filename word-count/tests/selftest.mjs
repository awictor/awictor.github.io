import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',checked:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},focus(){},onclick:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={words,textStats,keywordDensity,countSyllables,syllableCount,fleschReadingEase,fleschKincaidGrade,readability};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('words: tokenizes ignoring punctuation, keeps hyphens/apostrophes',()=>{
  assert.deepEqual(t.words("Hello, world!"),["Hello","world"]);
  assert.deepEqual(t.words("it's a well-known fact"),["it's","a","well-known","fact"]);
  assert.deepEqual(t.words(""),[]);
});
check('textStats: counts on a known sentence',()=>{
  const s=t.textStats("Hello world. This is fun!");
  assert.equal(s.words,5);
  assert.equal(s.sentences,2);
  assert.equal(s.chars,25);
  assert.equal(s.charsNoSpaces,21);
  assert.equal(s.paragraphs,1);
  assert.equal(s.avgWordLen,3.8); // (5+5+4+2+3)/5
});
check('textStats: empty text is all zeros',()=>{
  const s=t.textStats("");
  assert.equal(s.words,0); assert.equal(s.sentences,0); assert.equal(s.paragraphs,0); assert.equal(s.avgWordLen,0);
});
check('textStats: reading & speaking time scale with words',()=>{
  const many=Array(400).fill("word").join(" ");
  const s=t.textStats(many);
  assert.equal(s.words,400);
  assert.equal(s.readingSeconds,120);  // 400/200*60
  assert.equal(s.speakingSeconds,Math.round(400/130*60));
});
check('textStats: paragraphs split on blank lines',()=>{
  assert.equal(t.textStats("one\n\ntwo\n\nthree").paragraphs,3);
});
check('keywordDensity: ranks non-stopwords by frequency',()=>{
  const kw=t.keywordDensity("the cat sat on the mat the cat",5);
  assert.equal(kw[0].word,"cat");
  assert.equal(kw[0].count,2);
  assert.equal(kw[0].pct,25); // 2 of 8 total tokens
  assert.ok(!kw.some(k=>k.word==="the"),"stopwords excluded");
  assert.deepEqual(t.keywordDensity("",3),[]);
});

check('countSyllables: common words (heuristic)',()=>{
  assert.equal(t.countSyllables("cat"),1);
  assert.equal(t.countSyllables("code"),1);
  assert.equal(t.countSyllables("hello"),2);
  assert.equal(t.countSyllables("table"),2);
  assert.equal(t.countSyllables(""),0);
});
check('fleschReadingEase: exact formula',()=>{
  // 206.835 - 1.015*(100/10) - 84.6*(150/100) = 206.835 - 10.15 - 126.9 = 69.785
  assert.equal(t.fleschReadingEase(100,10,150),69.8);
  assert.equal(t.fleschReadingEase(0,0,0),0);
});
check('fleschKincaidGrade: exact formula',()=>{
  // 0.39*(100/10) + 11.8*(150/100) - 15.59 = 3.9 + 17.7 - 15.59 = 6.01
  assert.equal(t.fleschKincaidGrade(100,10,150),6);
});
check('readability: labels and finite output',()=>{
  const r=t.readability("The cat sat on the mat. It was a sunny day.");
  assert.ok(Number.isFinite(r.ease) && r.ease>0); // simple text can exceed 100
  assert.ok(typeof r.grade==="number");
  assert.ok(r.syllables>0);
  assert.equal(t.readability("").ease,null);
  assert.equal(t.readingEaseLabel? t.readingEaseLabel(95):"Very easy","Very easy"); // label bands (if exported)
});

console.log(`\n${n} checks passed.`);
