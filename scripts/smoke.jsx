import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../src/App.jsx';

const issues = [];
console.error = (...args) => issues.push(args.map(String).join(' '));
console.warn = (...args) => issues.push(args.map(String).join(' '));

let html = '';
try {
  html = renderToString(
    <React.StrictMode>
      <App name="Alex Carter" themeColor="#4f8cff" />
    </React.StrictMode>
  );
} catch (err) {
  issues.push(err.stack);
}

const footerStart = html.indexOf('<footer');
const footerHtml = footerStart === -1 ? '' : html.slice(footerStart);
const headerIndex = html.indexOf('<header');
const mainIndex = html.indexOf('<main');

const checks = [
  ['banner <header> renders before <main>', headerIndex > -1 && headerIndex < mainIndex],
  ['skip link present', /class="skip-link"[^>]*href="#main-content"/.test(html)],
  ['main landmark with skip target', /<main[^>]*id="main-content"/.test(html)],
  ['primary nav landmark', /<nav[^>]*aria-label="Primary"/.test(html)],
  ['all 4 sections present', ['about', 'skills', 'projects', 'contact']
    .every((id) => new RegExp(`<section[^>]*id="${id}"`).test(html))],
  ['sections labelled by headings', (html.match(/aria-labelledby="[a-z-]+-title"/g) || []).length === 4],
  ['unique heading ids', (html.match(/id="[a-z-]+-title"/g) || []).length === 4],
  ['footer contains no <header> (spec)', !footerHtml.includes('<header')],
  ['6 skill chips render', (html.match(/class="skill-chip"/g) || []).length === 6],
  [
    'skill levels not aria-labelled over visible text',
    !/skill-chip__level[^>]*aria-label/.test(html),
  ],
  ['decorative accent hidden', /class="header__accent" aria-hidden="true"/.test(html)],
  ['project links uniquely labelled', (html.match(/aria-label="View project: /g) || []).length === 3],
  ['external links announce new tab', (html.match(/opens in new tab/g) || []).length === 2],
  ['nav highlights active item', html.includes('aria-current="location"')],
];

let failed = 0;
console.log('--- structure checks');
for (const [label, ok] of checks) {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
}

console.log(`--- console warnings: ${issues.length}`);
issues.forEach((msg) => console.log(msg.slice(0, 400)));

process.exitCode = failed + issues.length > 0 ? 1 : 0;
