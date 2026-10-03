// Builds the production site into .deploy/ with real, prerendered, SEO-friendly URLs.
// Run: node deploy/build.mjs   then: cd .deploy && vercel deploy --prod --yes
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, '.deploy');
const SITE = 'https://almantiqhub.com';
const SRC = path.join(ROOT, 'designs/modern-plain');
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// keep the Vercel project link across rebuilds
const link = path.join(OUT, '.vercel');
const savedLink = fs.existsSync(link) ? fs.readFileSync(path.join(link, 'project.json'), 'utf8') : null;
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, f), { recursive: true, force: true });
if (savedLink) write(path.join(link, 'project.json'), savedLink);
fs.cpSync(path.join(ROOT, 'assets'), path.join(OUT, 'assets'), { recursive: true });
fs.copyFileSync(path.join(SRC, 'styles.css'), path.join(OUT, 'styles.css'));

// ---- typography: small text was too small on laptop and mobile; bump px font sizes ----
const bump = n => (n <= 12 ? n + 2 : n <= 18 ? Math.round((n + 1.5) * 2) / 2 : n);
const bumpCss = css => css.replace(/font-size:\s*([\d.]+)px/g, (m, n) => `font-size:${bump(parseFloat(n))}px`);
for (const f of ['styles.css']) write(path.join(OUT, f), bumpCss(read(path.join(OUT, f))));
for (const f of fs.readdirSync(path.join(OUT, 'assets/css'))) write(path.join(OUT, 'assets/css', f), bumpCss(read(path.join(OUT, 'assets/css', f))));

// ---- patch runtime scripts: hash routing -> real paths (History API) ----
let content = read(path.join(ROOT, 'assets/js/content.js'));
content = content.replace(/href="#\/([^"]*)"/g, 'href="/$1"');
content = content.replace("const hash = location.hash.replace(/^#\\/?/, '');",
  "const hash = location.pathname.replace(/^\\/+|\\/+$/g, '');");
content = content.replace(/function go\(path\)\{[^\n]*\}/,
  "function go(path){ history.pushState({}, '', path ? '/' + path : '/'); route(); }");
content = content.replace("window.addEventListener('hashchange', route);",
  "window.addEventListener('popstate', route);\n" +
  "document.addEventListener('click', e => { const a = e.target.closest('a[href^=\"/\"]'); if(!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return; e.preventDefault(); go(a.getAttribute('href').replace(/^\\//, '')); });");
for (const needle of ['popstate', 'location.pathname', 'history.pushState']) {
  if (!content.includes(needle)) throw new Error('content.js patch failed: ' + needle);
}

let pres = read(path.join(SRC, 'presentation.js'));
pres = pres.replace(/ document\.title=document\.title[^\n]*\n/, '\n');
pres = pres.replace("location.hash.replace(/^#\\/?/,'')", "location.pathname.replace(/^\\/+|\\/+$/g,'')");
pres = pres.replace("?'#/'+match[1]:'#'", "?'/'+match[1]:'/'");
pres = pres.replace("window.addEventListener('hashchange',enhancePresentation);", "window.addEventListener('popstate',()=>setTimeout(enhancePresentation));");
pres += "\nconst _go=window.go;window.go=function(p){_go(p);enhancePresentation();};\n";
write(path.join(OUT, 'presentation.js'), pres);

// ---- prerender every route by running the real render functions ----
const footerBox = { innerHTML: '' };
const stubEl = { addEventListener() {}, append() {}, querySelector: () => null, classList: { add() {}, remove() {} }, innerHTML: '' };
const ctx = vm.createContext({
  document: {
    addEventListener() {}, querySelectorAll: () => [],
    querySelector: s => (s === '.site-footer' ? footerBox : stubEl),
    getElementById: () => stubEl, createTextNode: t => t,
  },
  window: { addEventListener() {}, scrollTo() {}, location: {} },
  location: { hash: '', pathname: '/' }, history: { pushState() {} }, sessionStorage: {}, console,
});
const bodyOnly = content.slice(0, content.indexOf('enhanceGlobalChrome();\nwindow.addEventListener'));
vm.runInContext(bodyOnly + '\n;vm_api={SERVICES,PRODUCTS,renderHome,renderProducts,renderServices,renderContact,renderProductDetail,enhanceGlobalChrome};', ctx);
const api = ctx.vm_api;
api.enhanceGlobalChrome();
const footer = footerBox.innerHTML;
const withHrefs = html => html.replace(/<a([^>]*?)onclick="go\('([^']*)'\)"([^>]*)>/g, (m, a, p, b) => `<a${a}href="/${p}"${b}>`);

const ORG = { '@type': 'Organization', '@id': SITE + '/#org', name: 'AL MANTIQ', url: SITE + '/', logo: SITE + '/assets/brand/mantiq-symbol.png', description: 'AL MANTIQ is a product-driven technology company building AI-powered software and digital products.' };
const crumbs = items => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + url })) });

const pages = [
  { url: '/', title: 'AL MANTIQ — AI Products & Digital Engineering | Custom ERP, Mobile, Salesforce', desc: 'AL MANTIQ is a product-driven technology company building AI-powered software — custom ERP, mobile apps, Salesforce, AR/VR/XR, QA and ILMA CMS for education.', html: api.renderHome(),
    ld: [ORG, { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'AL MANTIQ', publisher: { '@id': SITE + '/#org' } }] },
  { url: '/products', title: 'Products — ILMA CMS & Pakistan Education AI | AL MANTIQ', desc: 'Intelligent products built by AL MANTIQ: ILMA CMS, an AI-powered operating system for schools, and Pakistan Education AI.', html: api.renderProducts(),
    ld: [crumbs([['Home', '/'], ['Products', '/products']]), { '@type': 'ItemList', itemListElement: api.PRODUCTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/product/${p.slug}`, name: p.name })) }] },
  { url: '/services', title: 'Services — Custom ERP, Mobile, Salesforce, XR & QA | AL MANTIQ', desc: 'Custom ERP, software and mobile app development, Salesforce, AR/VR/XR, QA & testing and project management — one team for every layer of product development.', html: api.renderServices(),
    ld: [crumbs([['Home', '/'], ['Services', '/services']]), { '@type': 'ItemList', itemListElement: api.SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Service', name: s.name, description: s.description, provider: { '@id': SITE + '/#org' } } })) }] },
  { url: '/contact', title: 'Contact AL MANTIQ — Start a Project or Build Your Team', desc: 'Talk to AL MANTIQ about your product, ERP, mobile app or offshore team. Book a 30-minute conversation or send a message — we reply within one business day.', html: api.renderContact(),
    ld: [crumbs([['Home', '/'], ['Contact', '/contact']]), { '@type': 'ContactPage', url: SITE + '/contact', name: 'Contact AL MANTIQ' }] },
  ...api.PRODUCTS.map(p => ({ url: `/product/${p.slug}`, title: `${p.name} — ${p.headline.replace(/\.$/, '')} | AL MANTIQ`, desc: p.blurb, html: api.renderProductDetail(p.slug),
    ld: [crumbs([['Home', '/'], ['Products', '/products'], [p.name, `/product/${p.slug}`]]), { '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: p.blurb, url: `${SITE}/product/${p.slug}`, publisher: { '@id': SITE + '/#org' } }] })),
];

// client-side navigation keeps title/description/canonical in sync with the prerendered pages
const seoMap = Object.fromEntries(pages.map(p => [p.url.replace(/^\//, ''), { t: p.title, d: p.desc }]));
let clientJs = content.replace(/document\.title = [^;]*;/g, '');
clientJs = clientJs.replace('window.scrollTo(0,0);', 'seoUpdate(hash); window.scrollTo(0,0);');
clientJs = `
const SEO_MAP = ${JSON.stringify(seoMap)};
function seoUpdate(h){ const m = SEO_MAP[h] || SEO_MAP['']; document.title = m.t; const set = (sel, attr, v) => { const el = document.querySelector(sel); if(el) el.setAttribute(attr, v); }; set('meta[name=description]', 'content', m.d); set('meta[property="og:title"]', 'content', m.t); set('meta[property="og:description"]', 'content', m.d); set('meta[name="twitter:title"]', 'content', m.t); set('meta[name="twitter:description"]', 'content', m.d); const u = '${SITE}/' + (h || ''); set('link[rel=canonical]', 'href', u); set('meta[property="og:url"]', 'content', u); }
` + clientJs;
if (!clientJs.includes('seoUpdate(hash)')) throw new Error('seoUpdate patch failed');
write(path.join(OUT, 'assets/js/content.js'), clientJs);

const shell = read(path.join(SRC, 'index.html'))
  .replace(/\.\.\/\.\.\/assets\//g, '/assets/')
  .replace(/<div class="review-bar">[^\n]*\n/, '')
  .replace('href="styles.css?v=service-heading-v3"', 'href="/styles.css?v=seo1"')
  .replace('src="presentation.js?v=mobile-nav"', 'src="/presentation.js?v=seo1"')
  .replace(/(assets\/(?:js|css)\/[\w.-]+\.(?:js|css))/g, `$1?v=${Date.now()}`)
  .replace(/href="#" onclick/g, 'onclick')
  .replace(/<link rel="icon"[^>]*>\n?/, '');
if (shell.includes('review-bar')) throw new Error('review bar not removed');

const navHrefs = ['/', '/products', '/services', '/contact'];
for (const p of pages) {
  const abs = SITE + p.url;
  const head = `<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#3159eb">
<link rel="canonical" href="${abs}">
<meta property="og:type" content="website"><meta property="og:site_name" content="AL MANTIQ">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${abs}"><meta property="og:image" content="${SITE}/assets/brand/al-mantiq-lockup.png"><meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.desc)}"><meta name="twitter:image" content="${SITE}/assets/brand/al-mantiq-lockup.png">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': p.ld })}</script>
<link rel="icon" type="image/svg+xml" href="/assets/brand/favicon.svg"><link rel="apple-touch-icon" href="/assets/brand/mantiq-symbol.png">`;
  let html = shell.replace(/<title>.*?<\/title>/s, () => head)
    .replace('<div id="app"></div>', () => `<div id="app">${withHrefs(p.html)}</div>`)
    .replace(/(<footer class="site-footer">).*?(<\/footer>)/s, (m, a, b) => a + footer + b);
  const page = p.url === '/' ? 'home' : p.url.split('/')[1] === 'product' ? 'product' : p.url.slice(1);
  let i = 0;
  html = html.replace(/<a onclick="go\('[^']*'\)">/g, () => `<a href="${navHrefs[i++] ?? '/'}">`);
  html = withHrefs(html).replace('<body>', `<body data-page="${page}">`);
  write(path.join(OUT, p.url === '/' ? 'index.html' : path.join(p.url.slice(1), 'index.html')), html);
}

write(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
write(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${SITE}${p.url}</loc><lastmod>${today}</lastmod><priority>${p.url === '/' ? '1.0' : p.url.startsWith('/product/') ? '0.8' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`);
write(path.join(OUT, 'vercel.json'), JSON.stringify({
  cleanUrls: true, trailingSlash: false,
  redirects: [{ source: '/index.html', destination: '/', permanent: true }],
  headers: [
    { source: '/assets/brand/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] },
  ],
}, null, 2));
console.log('built', pages.map(p => p.url).join(' '));
