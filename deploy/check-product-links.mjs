import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../public/assets/js/content.js', import.meta.url), 'utf8');
const retiredHosts = [
  ['ilma', 'almantiqhub.com'].join('.'),
  ['ilma-demo', 'almantiqhub.com'].join('.'),
  ['ilma-website', 'pages.dev'].join('.'),
];

for (const host of retiredHosts) {
  assert.equal(source.includes(host), false, `retired ILMA host must not be referenced: ${host}`);
}

assert.match(source, /https:\/\/ilma\.live\/onboarding\?source=almantiq/);
assert.match(source, /https:\/\/demo\.ilma\.live/);

console.log('Canonical ILMA product links verified.');
