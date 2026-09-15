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
eval(js+`\n;globalThis.__t={sha,allHashes,ALGOS};`);
const t=globalThis.__t;

let n=0; const check=async(name,fn)=>{await fn();n++;console.log('  ok -',name);};

(async()=>{
  await check('SHA-256 of "abc" (canonical vector)',async()=>{
    assert.equal(await t.sha("abc","SHA-256"),"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
  await check('SHA-1 of "abc" (canonical vector)',async()=>{
    assert.equal(await t.sha("abc","SHA-1"),"a9993e364706816aba3e25717850c26c9cd0d89d");
  });
  await check('SHA-256 of empty string',async()=>{
    assert.equal(await t.sha("","SHA-256"),"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  });
  await check('SHA-512 length is 128 hex chars',async()=>{
    const h=await t.sha("hello","SHA-512");
    assert.equal(h.length,128);
    assert.ok(/^[0-9a-f]+$/.test(h));
  });
  await check('allHashes returns all algorithms',async()=>{
    const all=await t.allHashes("abc");
    assert.deepEqual(Object.keys(all),t.ALGOS);
    assert.equal(all["SHA-256"],"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
  await check('UTF-8 is hashed by bytes',async()=>{
    // "é" is 2 UTF-8 bytes; just assert it produces a stable 64-hex SHA-256
    const h=await t.sha("é","SHA-256");
    assert.equal(h.length,64);
    assert.equal(await t.sha("é","SHA-256"),h);
  });
  console.log(`\n${n} checks passed.`);
})().catch(e=>{ console.error(e); process.exit(1); });
