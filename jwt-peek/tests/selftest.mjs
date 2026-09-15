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
eval(js+`\n;globalThis.__t={base64UrlDecode,decodeJwt,claimStatus};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

const SAMPLE="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

check('base64UrlDecode: handles url-safe chars and padding',()=>{
  // "eyJhIjoxfQ" -> {"a":1}
  assert.equal(t.base64UrlDecode("eyJhIjoxfQ"),'{"a":1}');
});
check('decodeJwt: canonical jwt.io token',()=>{
  const r=t.decodeJwt(SAMPLE);
  assert.equal(r.error,undefined);
  assert.equal(r.header.alg,"HS256");
  assert.equal(r.header.typ,"JWT");
  assert.equal(r.payload.sub,"1234567890");
  assert.equal(r.payload.name,"John Doe");
  assert.equal(r.payload.iat,1516239022);
  assert.equal(r.signature,"SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
});
check('decodeJwt: token without signature still decodes',()=>{
  const two=SAMPLE.split(".").slice(0,2).join(".");
  const r=t.decodeJwt(two);
  assert.equal(r.error,undefined);
  assert.equal(r.signature,null);
  assert.equal(r.payload.name,"John Doe");
});
check('decodeJwt: rejects malformed input',()=>{
  assert.ok(t.decodeJwt("abc").error);           // one part
  assert.ok(t.decodeJwt("").error);              // empty
  assert.ok(t.decodeJwt("!!!.!!!").error);       // undecodable header
});
check('claimStatus: expiry and not-before',()=>{
  const now=2_000_000_000_000; // ms
  const past=t.claimStatus({exp:1000, iat:900},now);
  assert.equal(past.expired,true);
  assert.ok(past.expiresAt instanceof Date);
  const future=t.claimStatus({exp:Math.floor(now/1000)+3600},now);
  assert.equal(future.expired,false);
  const none=t.claimStatus({sub:"x"},now);
  assert.equal(none.expired,null);
  const nbf=t.claimStatus({nbf:Math.floor(now/1000)+3600},now);
  assert.equal(nbf.notYetValid,true);
});

console.log(`\n${n} checks passed.`);
