import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',checked:false,className:'',style:{},dataset:{},classList:{toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},onclick:null,innerHTML:''}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;
try{Object.defineProperty(globalThis,'navigator',{value:{clipboard:{writeText:()=>Promise.resolve()}},configurable:true});}catch{}

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={setsFor,buildCharset,poolSize,entropyBits,strengthLabel,crackTimeText,humanTime,generatePassword,hasAllSets,WORDS,joinPassphrase,passphraseEntropy,generatePassphrase};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

const ALL={lower:true,upper:true,digits:true,symbols:true,excludeAmbiguous:false};

check('buildCharset: pool sizes match selected sets',()=>{
  assert.equal(t.poolSize({lower:true,upper:false,digits:false,symbols:false}),26);
  assert.equal(t.poolSize({lower:true,upper:true,digits:true,symbols:false}),62);
  assert.equal(t.poolSize(ALL),88); // 26+26+10+26 symbols
  assert.equal(t.poolSize({lower:false,upper:false,digits:false,symbols:false}),0);
});
check('buildCharset: exclude look-alikes shrinks the pool',()=>{
  const full=t.poolSize(ALL), trimmed=t.poolSize({...ALL,excludeAmbiguous:true});
  assert.ok(trimmed<full);
  assert.ok(!/[O0Il1|]/.test(t.buildCharset({...ALL,excludeAmbiguous:true})));
});
check('entropyBits: length * log2(pool)',()=>{
  assert.ok(Math.abs(t.entropyBits(16,88)-16*Math.log2(88))<1e-9);
  assert.ok(Math.abs(t.entropyBits(16,88)-103.35)<0.1);
  assert.equal(t.entropyBits(20,1),0); // a single-char pool carries no entropy
});
check('strengthLabel: thresholds',()=>{
  assert.equal(t.strengthLabel(20),'Very weak');
  assert.equal(t.strengthLabel(30),'Weak');
  assert.equal(t.strengthLabel(50),'Fair');
  assert.equal(t.strengthLabel(100),'Strong');
  assert.equal(t.strengthLabel(140),'Very strong');
});
check('crackTimeText: instant for tiny, forever for huge',()=>{
  assert.equal(t.crackTimeText(0,1e11),'instantly');
  assert.equal(t.crackTimeText(300,1e11),'effectively forever');
  assert.ok(/year|centur/.test(t.crackTimeText(90,1e11)));
});
check('generatePassword: right length, only allowed chars',()=>{
  const cs=t.buildCharset(ALL);
  const pw=t.generatePassword(ALL,24);
  assert.equal(pw.length,24);
  for(const ch of pw) assert.ok(cs.includes(ch),'unexpected char '+ch);
  assert.equal(t.generatePassword({lower:false,upper:false,digits:false,symbols:false},10),'');
});
check('hasAllSets: predicate detects a missing group',()=>{
  assert.ok(t.hasAllSets('aB3!',ALL));
  assert.ok(!t.hasAllSets('abcd',ALL)); // no upper/digit/symbol
  assert.ok(t.hasAllSets('abcd',{lower:true,upper:false,digits:false,symbols:false}));
});
check('generatePassword: guarantees every selected set (200 runs)',()=>{
  for(let i=0;i<200;i++){
    const pw=t.generatePassword(ALL,12);
    assert.equal(pw.length,12);
    assert.ok(t.hasAllSets(pw,ALL),'missing a set: '+pw);
  }
  // when length < number of groups, coverage can't be guaranteed but length still holds
  assert.equal(t.generatePassword(ALL,2).length,2);
});

check('WORDS: non-trivial and unique',()=>{
  assert.ok(t.WORDS.length>=200,'word list too small: '+t.WORDS.length);
  assert.equal(t.WORDS.length,new Set(t.WORDS).size,'duplicate words inflate entropy');
});
check('joinPassphrase: separator, capitalize, appended number',()=>{
  assert.equal(t.joinPassphrase(['red','fox','moon'],{separator:'-',capitalize:false}),'red-fox-moon');
  assert.equal(t.joinPassphrase(['red','fox'],{separator:'_',capitalize:true}),'Red_Fox');
  assert.equal(t.joinPassphrase(['red','fox'],{separator:'-',capitalize:false,number:7}),'red-fox-7');
});
check('passphraseEntropy: words*log2(list) plus digit bonus',()=>{
  assert.ok(Math.abs(t.passphraseEntropy(4,256,false)-4*8)<1e-9);
  assert.ok(Math.abs(t.passphraseEntropy(4,256,true)-(4*8+Math.log2(10)))<1e-9);
  assert.equal(t.passphraseEntropy(4,1,false),0);
});
check('generatePassphrase: word count, separator, words from list',()=>{
  const set=new Set(t.WORDS);
  for(let i=0;i<50;i++){
    const p=t.generatePassphrase({words:5,separator:'-',capitalize:false,number:false});
    const parts=p.split('-');
    assert.equal(parts.length,5);
    for(const w of parts) assert.ok(set.has(w),'unknown word '+w);
  }
  // appended number adds a trailing numeric segment
  const withNum=t.generatePassphrase({words:3,separator:'.',capitalize:true,number:true}).split('.');
  assert.equal(withNum.length,4);
  assert.ok(/^[0-9]$/.test(withNum[3]));
});

console.log(`\n${n} checks passed.`);
