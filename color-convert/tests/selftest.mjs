import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

function el(){ return {value:'',textContent:'',innerHTML:'',checked:false,className:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return null;},querySelectorAll(){return[];},appendChild(){},onclick:null}; }
const ids={};
globalThis.document={getElementById:id=>ids[id]||(ids[id]=el()),createElement:()=>el(),querySelectorAll:()=>[],documentElement:el(),activeElement:null};
globalThis.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
globalThis.location={hash:'',origin:'',pathname:''};
globalThis.window={matchMedia:()=>({matches:false}),location:globalThis.location};
globalThis.matchMedia=globalThis.window.matchMedia;

const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
eval(js+`\n;globalThis.__t={normalizeHex,hexToRgb,rgbToHex,rgbToHsl,hslToRgb,parseRgb,parseHsl,paletteScale};`);
const t=globalThis.__t;

let n=0; const check=(name,fn)=>{fn();n++;console.log('  ok -',name);};

check('hexToRgb / rgbToHex round-trip',()=>{
  assert.deepEqual(t.hexToRgb('#ff0000'),{r:255,g:0,b:0});
  assert.deepEqual(t.hexToRgb('#08f'),{r:0,g:136,b:255});
  assert.equal(t.rgbToHex(255,0,0),'#ff0000');
  assert.equal(t.rgbToHex(0,136,255),'#0088ff');
  assert.equal(t.hexToRgb('zzz'),null);
});
check('rgbToHsl: known values',()=>{
  assert.deepEqual(t.rgbToHsl(255,0,0),{h:0,s:100,l:50});
  assert.deepEqual(t.rgbToHsl(0,255,0),{h:120,s:100,l:50});
  assert.deepEqual(t.rgbToHsl(0,0,255),{h:240,s:100,l:50});
  assert.deepEqual(t.rgbToHsl(255,255,255),{h:0,s:0,l:100});
  assert.deepEqual(t.rgbToHsl(128,128,128),{h:0,s:0,l:50});
});
check('hslToRgb: known values',()=>{
  assert.deepEqual(t.hslToRgb(0,100,50),{r:255,g:0,b:0});
  assert.deepEqual(t.hslToRgb(120,100,50),{r:0,g:255,b:0});
  assert.deepEqual(t.hslToRgb(240,100,50),{r:0,g:0,b:255});
  assert.deepEqual(t.hslToRgb(0,0,50),{r:128,g:128,b:128});
});
check('rgb -> hsl -> rgb round-trips (approx)',()=>{
  for(const c of [[192,38,211],[17,34,51],[250,128,64]]){
    const hsl=t.rgbToHsl(...c), back=t.hslToRgb(hsl.h,hsl.s,hsl.l);
    for(const k of ['r','g','b']) assert.ok(Math.abs(back[k]-c[['r','g','b'].indexOf(k)])<=3,'channel drift '+JSON.stringify({c,back}));
  }
});
check('parseRgb / parseHsl: tolerant parsing + bounds',()=>{
  assert.deepEqual(t.parseRgb('rgb(10, 20, 30)'),{r:10,g:20,b:30});
  assert.deepEqual(t.parseRgb('10 20 30'),{r:10,g:20,b:30});
  assert.equal(t.parseRgb('rgb(300,0,0)'),null); // out of range
  assert.deepEqual(t.parseHsl('hsl(210, 50%, 40%)'),{h:210,s:50,l:40});
  assert.equal(t.parseRgb('nope'),null);
});

check('paletteScale: valid hexes, descending lightness, L=50 matches base hue',()=>{
  const pal=t.paletteScale('#c026d3');
  assert.equal(pal.length,10);
  for(const p of pal) assert.ok(t.normalizeHex(p.hex),'valid hex '+p.hex);
  // lightness of produced swatches strictly descends across the stops
  const ls=pal.map(p=>t.rgbToHsl(...Object.values(t.hexToRgb(p.hex))).l);
  for(let i=1;i<ls.length;i++) assert.ok(ls[i]<=ls[i-1],'descending L');
  // the L=50 stop equals hslToRgb of the base hue/sat at 50
  const base=t.rgbToHsl(...Object.values(t.hexToRgb('#c026d3')));
  const at50=t.paletteScale('#c026d3',[50])[0];
  const exp=t.hslToRgb(base.h,base.s,50);
  assert.equal(at50.hex,t.rgbToHex(exp.r,exp.g,exp.b));
  assert.deepEqual(t.paletteScale('zzz'),[]);
});

console.log(`\n${n} checks passed.`);
