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
eval(js+`\n;globalThis.__t={generateV4,isValidUuid,uuidVersion,uuidVariant,isNil};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};
const RE=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

check('generateV4: shape, version 4, RFC variant',()=>{
  for(let i=0;i<200;i++){
    const u=t.generateV4();
    assert.ok(RE.test(u),'bad uuid '+u);
    assert.equal(t.uuidVersion(u),4);
    assert.equal(t.uuidVariant(u),"RFC 4122");
  }
});
check('generateV4: unique across many',()=>{
  const set=new Set(); for(let i=0;i<500;i++) set.add(t.generateV4());
  assert.equal(set.size,500);
});
check('isValidUuid: accepts valid, rejects junk',()=>{
  assert.ok(t.isValidUuid("550e8400-e29b-41d4-a716-446655440000"));
  assert.ok(t.isValidUuid("00000000-0000-0000-0000-000000000000")); // nil
  assert.ok(!t.isValidUuid("nope"));
  assert.ok(!t.isValidUuid("550e8400e29b41d4a716446655440000")); // no dashes
  assert.ok(!t.isValidUuid("550e8400-e29b-41d4-a716-44665544000")); // too short
});
check('uuidVersion / uuidVariant: known values',()=>{
  assert.equal(t.uuidVersion("550e8400-e29b-41d4-a716-446655440000"),4);
  assert.equal(t.uuidVersion("6ba7b810-9dad-11d1-80b4-00c04fd430c8"),1);
  assert.equal(t.uuidVariant("6ba7b810-9dad-11d1-80b4-00c04fd430c8"),"RFC 4122"); // 8 -> RFC
  assert.equal(t.uuidVersion("bad"),null);
});
check('isNil',()=>{
  assert.ok(t.isNil("00000000-0000-0000-0000-000000000000"));
  assert.ok(!t.isNil(t.generateV4()));
});

console.log(`\n${n} checks passed.`);
