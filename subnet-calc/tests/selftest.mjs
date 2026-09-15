// Headless regression tests for SubnetCalc pure functions.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

// Extract the largest <script> block and evaluate it with a minimal DOM stub.
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(m => m[1]).sort((a, b) => b.length - a.length)[0];

function el(){ return {value:'',textContent:'',innerHTML:'',style:{},className:'',
  appendChild(){},getAttribute(){return null;},setAttribute(){},removeAttribute(){},
  addEventListener(){},querySelectorAll(){return[];}}; }
globalThis.document = {
  getElementById: () => el(), createElement: () => el(),
  querySelectorAll: () => [], documentElement: el()
};
globalThis.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
globalThis.matchMedia = () => ({ matches:false });
globalThis.window = { matchMedia: globalThis.matchMedia };

const mod = {};
eval(js.replace('if(typeof module !== \'undefined\') module.exports =',
  'globalThis.__t =') );
const { ipToInt, intToIp, parseCidr, maskInt, subnetInfo, ipClass, isPrivate } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('ipToInt round-trips', () => {
  assert.equal(ipToInt('0.0.0.0'), 0);
  assert.equal(ipToInt('255.255.255.255'), 0xFFFFFFFF >>> 0);
  assert.equal(intToIp(ipToInt('192.168.1.10')), '192.168.1.10');
  assert.equal(intToIp(0), '0.0.0.0');
});

check('ipToInt rejects malformed input', () => {
  assert.equal(ipToInt('192.168.1'), null);
  assert.equal(ipToInt('192.168.1.256'), null);
  assert.equal(ipToInt('a.b.c.d'), null);
  assert.equal(ipToInt('1.2.3.4.5'), null);
  assert.equal(ipToInt(''), null);
});

check('maskInt matches known prefixes', () => {
  assert.equal(intToIp(maskInt(0)), '0.0.0.0');
  assert.equal(intToIp(maskInt(8)), '255.0.0.0');
  assert.equal(intToIp(maskInt(24)), '255.255.255.0');
  assert.equal(intToIp(maskInt(30)), '255.255.255.252');
  assert.equal(intToIp(maskInt(32)), '255.255.255.255');
});

check('parseCidr splits ip and prefix', () => {
  assert.deepEqual(parseCidr('192.168.1.10/24'),
    { ip: ipToInt('192.168.1.10'), prefix: 24 });
  assert.equal(parseCidr('192.168.1.10'), null);
  assert.equal(parseCidr('192.168.1.10/33'), null);
  assert.equal(parseCidr('999.0.0.0/24'), null);
});

check('subnetInfo /24 canonical vector', () => {
  const s = subnetInfo(ipToInt('192.168.1.10'), 24);
  assert.equal(s.network, '192.168.1.0');
  assert.equal(s.broadcast, '192.168.1.255');
  assert.equal(s.mask, '255.255.255.0');
  assert.equal(s.wildcard, '0.0.0.255');
  assert.equal(s.firstHost, '192.168.1.1');
  assert.equal(s.lastHost, '192.168.1.254');
  assert.equal(s.totalHosts, 256);
  assert.equal(s.usableHosts, 254);
});

check('subnetInfo /30 gives 2 usable hosts', () => {
  const s = subnetInfo(ipToInt('10.0.0.5'), 30);
  assert.equal(s.network, '10.0.0.4');
  assert.equal(s.broadcast, '10.0.0.7');
  assert.equal(s.firstHost, '10.0.0.5');
  assert.equal(s.lastHost, '10.0.0.6');
  assert.equal(s.totalHosts, 4);
  assert.equal(s.usableHosts, 2);
});

check('subnetInfo /31 and /32 edge cases', () => {
  const s31 = subnetInfo(ipToInt('10.0.0.0'), 31);
  assert.equal(s31.totalHosts, 2);
  assert.equal(s31.usableHosts, 2); // RFC 3021 point-to-point
  const s32 = subnetInfo(ipToInt('10.0.0.1'), 32);
  assert.equal(s32.totalHosts, 1);
  assert.equal(s32.usableHosts, 1);
  assert.equal(s32.network, '10.0.0.1');
  assert.equal(s32.broadcast, '10.0.0.1');
});

check('subnetInfo /8 large block', () => {
  const s = subnetInfo(ipToInt('10.20.30.40'), 8);
  assert.equal(s.network, '10.0.0.0');
  assert.equal(s.broadcast, '10.255.255.255');
  assert.equal(s.mask, '255.0.0.0');
  assert.equal(s.totalHosts, 16777216);
  assert.equal(s.usableHosts, 16777214);
});

check('subnetInfo /0 covers entire space', () => {
  const s = subnetInfo(ipToInt('8.8.8.8'), 0);
  assert.equal(s.network, '0.0.0.0');
  assert.equal(s.broadcast, '255.255.255.255');
  assert.equal(s.totalHosts, 4294967296);
});

check('ipClass classification', () => {
  assert.equal(ipClass(ipToInt('10.0.0.1')), 'A');
  assert.equal(ipClass(ipToInt('172.16.0.1')), 'B');
  assert.equal(ipClass(ipToInt('192.168.0.1')), 'C');
  assert.equal(ipClass(ipToInt('224.0.0.1')), 'D (multicast)');
  assert.equal(ipClass(ipToInt('240.0.0.1')), 'E (reserved)');
});

check('isPrivate detects RFC 1918 + loopback', () => {
  assert.equal(isPrivate(ipToInt('10.1.2.3')), true);
  assert.equal(isPrivate(ipToInt('172.16.5.5')), true);
  assert.equal(isPrivate(ipToInt('172.32.0.1')), false);
  assert.equal(isPrivate(ipToInt('192.168.1.1')), true);
  assert.equal(isPrivate(ipToInt('127.0.0.1')), true);
  assert.equal(isPrivate(ipToInt('8.8.8.8')), false);
});

console.log(`\n${n} checks passed.`);
