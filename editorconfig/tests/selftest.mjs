import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).sort((a, b) => b.length - a.length)[0];
eval(js.replace("if(typeof module !== 'undefined') module.exports =", 'globalThis.__t ='));
const { section, generate } = globalThis.__t;

let passed = 0;
function check(name, cond) {
  if (!cond) { console.error('FAIL: ' + name); process.exit(1); }
  passed++;
}

// 1. root line on its own.
check('root only', generate({ root: true, sections: [] }) === 'root = true');
// 2. Section header uses the glob in brackets.
check('section header', section('*', {}).split('\n')[0] === '[*]');
// 3. Keys are emitted.
check('indent key', section('*', { indent_style: 'space' }).includes('indent_style = space'));
// 4. Keys appear in canonical order.
const s = section('*', { insert_final_newline: true, indent_style: 'space', indent_size: 2 });
check('key order', s.indexOf('indent_style') < s.indexOf('indent_size') && s.indexOf('indent_size') < s.indexOf('insert_final_newline'));
// 5. Booleans render as true/false text.
check('boolean render', section('*', { insert_final_newline: true }).includes('insert_final_newline = true'));
// 6. Omitted/empty keys are skipped.
check('omit empty', !section('*', { charset: '' }).includes('charset'));
// 7. Full document has root, blank line, then the section.
const doc = generate({ root: true, sections: [{ glob: '*', indent_style: 'space', indent_size: 2 }] });
check('full doc', doc === 'root = true\n\n[*]\nindent_style = space\nindent_size = 2');
// 8. Two sections separated by a blank line.
const two = generate({ root: false, sections: [{ glob: '*', indent_size: 4 }, { glob: '*.md', trim_trailing_whitespace: false }] });
check('two sections', two === '[*]\nindent_size = 4\n\n[*.md]\ntrim_trailing_whitespace = false');
// 9. No root line when root is falsy.
check('no root', generate({ sections: [{ glob: '*', charset: 'utf-8' }] }) === '[*]\ncharset = utf-8');
// 10. tab_width and end_of_line supported.
check('tab and eol', section('*', { indent_style: 'tab', tab_width: 4, end_of_line: 'lf' }) === '[*]\nindent_style = tab\ntab_width = 4\nend_of_line = lf');

console.log(passed + ' checks passed.');
