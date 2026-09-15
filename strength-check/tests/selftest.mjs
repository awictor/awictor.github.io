import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',type:'',checked:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},onclick:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el()};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={charPool,entropyBits,strengthLabel,crackTimeText,checkPassword};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const near=(a,b)=>Math.abs(a-b)<0.1;

check('charPool sums class sizes',()=>{
  assert.equal(t.charPool("abc"),26);
  assert.equal(t.charPool("abcDEF"),52);
  assert.equal(t.charPool("aB3"),62);
  assert.equal(t.charPool("aB3!"),95);
});
check('entropyBits = length * log2(pool)',()=>{
  assert.ok(near(t.entropyBits("aaaaaaaa"),8*Math.log2(26)));
  assert.equal(t.entropyBits(""),0);
});
check('strengthLabel thresholds',()=>{
  assert.equal(t.strengthLabel(20),"Very weak");
  assert.equal(t.strengthLabel(45),"Fair");
  assert.equal(t.strengthLabel(100),"Strong");
  assert.equal(t.strengthLabel(140),"Very strong");
});
check('checkPassword: common password flagged',()=>{
  const r=t.checkPassword("password");
  assert.ok(r.warnings.some(w=>/common/i.test(w)));
  assert.equal(r.classes.lower,true);
  assert.equal(r.classes.digit,false);
});
check('checkPassword: short + low variety warnings',()=>{
  const r=t.checkPassword("abc");
  assert.ok(r.warnings.some(w=>/short/i.test(w)));
  assert.ok(r.warnings.some(w=>/mix/i.test(w)));
});
check('checkPassword: strong password has no warnings',()=>{
  const r=t.checkPassword("Xk9$mP2vQr8!wZ");
  assert.deepEqual(r.warnings,[]);
  assert.ok(r.bits>60);
  assert.equal(r.classes.symbol,true);
});

console.log(`\n${n} checks passed.`);
