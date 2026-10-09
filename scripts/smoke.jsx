import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from '../src/App.jsx';

const issues = [];
console.error = (...args) => issues.push(args.map(String).join(' '));
console.warn = (...args) => issues.push(args.map(String).join(' '));

/* Practical 2 renders a route table, so each URL is rendered on its own.
   StaticRouter is the SSR-safe router: unlike MemoryRouter it runs no
   useLayoutEffect, so server rendering stays warning-free. */
const renderAt = (path) =>
  renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <App name="Alex Carter" themeColor="#4f8cff" />
      </StaticRouter>
    </React.StrictMode>
  );

const home = renderAt('/');
const projects = renderAt('/projects');
const contact = renderAt('/contact');
const missing = renderAt('/definitely-not-a-page');

const navHtml = (html) => {
  const start = html.indexOf('<nav');
  const end = html.indexOf('</nav>');
  return start === -1 || end === -1 ? '' : html.slice(start, end);
};

const activeHref = (html) => {
  const tag = html.match(/<a [^>]*aria-current="page"[^>]*>/);
  const href = tag && tag[0].match(/href="([^"]*)"/);
  return href ? href[1] : null;
};

const duplicateIds = (html) => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  return ids.filter((value, index) => ids.indexOf(value) !== index);
};

const checks = [
  ['skip link present', /class="skip-link"[^>]*href="#main-content"/.test(home)],
  ['main landmark with skip target', /<main[^>]*id="main-content"/.test(home)],
  ['primary nav landmark on every route', [home, projects, contact, missing]
    .every((html) => /<nav[^>]*aria-label="Primary"/.test(html))],
  ['footer on every route', [home, projects, contact, missing]
    .every((html) => html.includes('<footer'))],

  /* NavBar rebuilt with NavLink/Link - never hand-written # anchors */
  ['nav links point at routes', ['/projects', '/contact']
    .every((href) => navHtml(home).includes(`href="${href}"`))],
  ['nav contains no "#..." anchors', !navHtml(home).includes('href="#')],
  ['NavLink isActive marks Home active on "/"', activeHref(home) === '/'],
  ['NavLink isActive marks Projects active on "/projects"', activeHref(projects) === '/projects'],
  ['NavLink isActive marks Contact active on "/contact"', activeHref(contact) === '/contact'],

  /* Home composes Header + About + Skills (and nothing else) */
  ['home renders banner header', home.includes('<header') && home.includes('id="home"')],
  ['home composes About', /<section[^>]*id="about"/.test(home)],
  ['home composes Skills', /<section[^>]*id="skills"/.test(home)],
  ['home does not render Projects', !home.includes('id="projects"')],
  ['home does not render Contact form', !home.includes('id="contact-page"')],
  ['6 skill chips render', (home.match(/class="skill-chip"/g) || []).length === 6],

  /* Projects route */
  ['projects page section present', /<section[^>]*id="projects"/.test(projects)],
  ['projects page owns the h1', /<h1[^>]*id="projects-title"/.test(projects)],
  ['3 project cards render', (projects.match(/class="project-card"/g) || []).length === 3],
  ['project links uniquely labelled', (projects.match(/aria-label="View project: /g) || []).length === 3],

  /* Contact route: controlled form, live preview, counter, help toggle */
  ['contact page owns the h1', /<h1[^>]*id="contact-page-title"/.test(contact)],
  ['contact form present', contact.includes('<form')],
  ['3 controlled fields with value + onChange-backed ids',
    ['contact-name', 'contact-email', 'contact-message']
      .every((id) => contact.includes(`id="${id}"`))],
  /* Inputs emit value="" as an attribute; React SSR renders a textarea's
     value as its children instead. React also warns for any value field
     missing onChange, so "console warnings: 0" below proves all 3 are
     controlled. */
  ['all 3 fields ship an initial value',
    (contact.match(/value=""/g) || []).length === 2 &&
      /<textarea[^>]*><\/textarea>/.test(contact)],
  ['live message preview below the field', /<p class="contact__preview"/.test(contact)],
  ['live character count "0 / 300"', contact.includes('0 / 300')],
  ['help toggle present with aria-expanded', /aria-expanded="false"/.test(contact)],
  ['help box hidden until the second useState flips', !contact.includes('id="contact-help"')],

  /* 404 route */
  ['catch-all renders custom 404', missing.includes('Page not found')],
  ['404 offers a "Back to Home" Link', missing.includes('Back to Home') && missing.includes('href="/"')],
  ['404 does not render the portfolio sections', !missing.includes('id="skills"')],

  /* No duplicated ids on any route */
  ['unique element ids on every route', [home, projects, contact, missing]
    .every((html) => duplicateIds(html).length === 0)],
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
