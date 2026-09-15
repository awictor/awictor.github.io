import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { parseUA } = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

check('Chrome on Windows 10', () => {
  const r = parseUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  assert.equal(r.browser, 'Chrome');
  assert.equal(r.version, '120.0.0.0');
  assert.equal(r.os, 'Windows');
  assert.equal(r.osVersion, '10/11');
  assert.equal(r.engine, 'Blink');
  assert.equal(r.deviceType, 'desktop');
  assert.equal(r.bot, false);
});

check('Safari on iPhone → mobile, iOS', () => {
  const r = parseUA('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
  assert.equal(r.browser, 'Safari');
  assert.equal(r.version, '17.0');
  assert.equal(r.os, 'iOS');
  assert.equal(r.osVersion, '17.0');
  assert.equal(r.engine, 'WebKit');
  assert.equal(r.deviceType, 'mobile');
});

check('iPad is classified as a tablet', () => {
  const r = parseUA('Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1');
  assert.equal(r.os, 'iOS');
  assert.equal(r.osVersion, '15.0');
  assert.equal(r.deviceType, 'tablet');
});

check('Firefox on macOS', () => {
  const r = parseUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0');
  assert.equal(r.browser, 'Firefox');
  assert.equal(r.version, '121.0');
  assert.equal(r.os, 'macOS');
  assert.equal(r.osVersion, '10.15');
  assert.equal(r.engine, 'Gecko');
  assert.equal(r.deviceType, 'desktop');
});

check('Edge is detected before Chrome', () => {
  const r = parseUA('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.1');
  assert.equal(r.browser, 'Edge');
  assert.equal(r.version, '120.0.1');
  assert.equal(r.engine, 'Blink');
});

check('Chrome on Android phone → mobile', () => {
  const r = parseUA('Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36');
  assert.equal(r.browser, 'Chrome');
  assert.equal(r.os, 'Android');
  assert.equal(r.osVersion, '13');
  assert.equal(r.deviceType, 'mobile');
});

check('Android tablet (no "Mobile" token) → tablet', () => {
  const r = parseUA('Mozilla/5.0 (Linux; Android 12; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  assert.equal(r.os, 'Android');
  assert.equal(r.deviceType, 'tablet');
});

check('Googlebot flagged as a bot', () => {
  const r = parseUA('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
  assert.equal(r.bot, true);
});

check('legacy IE11 detected via Trident', () => {
  const r = parseUA('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko');
  assert.equal(r.browser, 'Internet Explorer');
  assert.equal(r.version, '11.0');
  assert.equal(r.os, 'Windows');
  assert.equal(r.osVersion, '7');
  assert.equal(r.engine, 'Trident');
});

check('empty input returns all Unknown, not a bot', () => {
  const r = parseUA('');
  assert.equal(r.browser, 'Unknown');
  assert.equal(r.os, 'Unknown');
  assert.equal(r.bot, false);
  assert.equal(r.deviceType, 'desktop');
});

console.log(`\n${n} checks passed.`);
