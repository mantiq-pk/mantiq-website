// Builds the production site into .deploy/ with real, prerendered, SEO-friendly URLs.
// Run: node deploy/build.mjs   then: cd .deploy && vercel deploy --prod --yes
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, '.deploy');
const BUILD = Date.now();
const SITE = 'https://almantiqhub.com';
const SRC = ROOT;
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
for (const f of ['styles.css']) write(path.join(OUT, f), bumpCss(read(path.join(OUT, f))) + '\n' + read(path.join(ROOT, 'deploy/overrides.css')));
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

// ---- footer: single source of truth for prerender + runtime ----
const FOOTER_HTML = `<div class="ft"><a class="ft-logo" href="/" aria-label="AL MANTIQ home"><span class="brand-symbol" aria-hidden="true"></span><span>AL MANTIQ</span></a><p class="ft-tag">Intelligent Products. Digital Engineering.</p><nav class="ft-cols" aria-label="Footer"><div><strong>Products</strong><a href="/product/ilma-cms">ILMA CMS</a><a href="/product/pakistan-education-ai">Pakistan Education AI</a></div><div><strong>Services</strong><a href="/services">Software Development</a><a href="/services">Mobile App Development</a><a href="/services">QA &amp; Testing</a></div><div><strong>Company</strong><a href="/contact">Contact</a><a href="/contact">Start a Project</a></div></nav><div class="ft-bottom"><span>&copy; 2026 AL MANTIQ. All rights reserved.</span></div></div>`;
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
const footer = FOOTER_HTML;
const withHrefs = html => html.replace(/<a([^>]*?)onclick="go\('([^']*)'\)"([^>]*)>/g, (m, a, p, b) => `<a${a}href="/${p}"${b}>`);

const ORG = {
  '@type': 'Organization', '@id': SITE + '/#org', name: 'AL MANTIQ', alternateName: 'Mantiq', url: SITE + '/',
  logo: { '@type': 'ImageObject', url: SITE + '/assets/brand/mantiq-symbol.png', width: 1254, height: 1254 },
  image: SITE + '/assets/brand/og-image.jpg', email: 'hello@mantiq.io',
  description: 'AL MANTIQ is a product-driven technology company building AI-powered software and digital products.',
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'hello@mantiq.io', availableLanguage: ['English'] },
};
const WEBSITE = { '@type': 'WebSite', '@id': SITE + '/#site', url: SITE + '/', name: 'AL MANTIQ', alternateName: 'Mantiq', inLanguage: 'en', publisher: { '@id': SITE + '/#org' } };
const crumbs = items => ({ '@type': 'BreadcrumbList', '@id': SITE + items.at(-1)[1] + '#breadcrumb', itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + url })) });
const webPage = (url, name, description, type = 'WebPage') => ({ '@type': type, '@id': SITE + url + '#webpage', url: SITE + url, name, description, inLanguage: 'en', isPartOf: { '@id': SITE + '/#site' }, about: { '@id': SITE + '/#org' }, ...(url === '/' ? {} : { breadcrumb: { '@id': SITE + url + '#breadcrumb' } }) });
const productTitle = p => p.slug === 'ilma-cms' ? 'ILMA CMS | AI School Management Platform | AL MANTIQ' : 'Pakistan Education AI | AI Tutor for Pakistan | AL MANTIQ';
const softwareApplication = p => ({
  '@type': 'SoftwareApplication', '@id': `${SITE}/product/${p.slug}#software`, name: p.name,
  applicationCategory: 'EducationalApplication', operatingSystem: 'Web', description: p.blurb,
  url: `${SITE}/product/${p.slug}`, image: SITE + '/assets/brand/og-image.jpg', publisher: { '@id': SITE + '/#org' },
  featureList: p.features.map(feature => feature[0]),
  ...(p.slug === 'ilma-cms' ? { offers: p.plans.filter(plan => /^PKR\s[\d,]+/.test(plan.price)).map(plan => ({
    '@type': 'Offer', name: `${p.name} ${plan.name}`, url: `${SITE}/product/${p.slug}`, availability: 'https://schema.org/InStock',
    price: plan.price.match(/[\d,]+/)[0].replace(/,/g, ''), priceCurrency: 'PKR',
    priceSpecification: { '@type': 'UnitPriceSpecification', price: plan.price.match(/[\d,]+/)[0].replace(/,/g, ''), priceCurrency: 'PKR', billingDuration: 'P1M' },
  })) } : {}),
});

const pages = [
  { url: '/', title: 'AL MANTIQ | AI Products & Digital Engineering', desc: 'AL MANTIQ builds AI-powered products, custom ERP platforms, mobile apps, Salesforce solutions and flexible engineering teams for ambitious businesses.', html: api.renderHome(),
    ld: [ORG, WEBSITE, webPage('/', 'AL MANTIQ | AI Products & Digital Engineering', 'AL MANTIQ builds AI-powered products and reliable digital platforms for ambitious businesses.')] },
  { url: '/products', title: 'AI Products: ILMA CMS & Education AI | AL MANTIQ', desc: 'Explore ILMA CMS, an AI-powered operating system for schools, and Pakistan Education AI, a curriculum-aware AI tutor built for local learners.', html: api.renderProducts(),
    ld: [webPage('/products', 'AI Products: ILMA CMS & Education AI | AL MANTIQ', 'Explore the AI-powered education products built by AL MANTIQ.'), crumbs([['Home', '/'], ['Products', '/products']]), { '@type': 'ItemList', '@id': SITE + '/products#products', name: 'AL MANTIQ products', itemListElement: api.PRODUCTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/product/${p.slug}`, name: p.name })) }] },
  { url: '/services', title: 'Software Development & Engineering Services | AL MANTIQ', desc: 'Build custom ERP, web and mobile apps, Salesforce solutions and immersive XR products with AL MANTIQ engineering, QA and delivery teams.', html: api.renderServices(),
    ld: [webPage('/services', 'Software Development & Engineering Services | AL MANTIQ', 'Custom software development, engineering, QA and delivery services from AL MANTIQ.'), crumbs([['Home', '/'], ['Services', '/services']]), { '@type': 'ItemList', '@id': SITE + '/services#services', name: 'AL MANTIQ services', itemListElement: api.SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Service', name: s.name, description: s.description, url: SITE + '/services', provider: { '@id': SITE + '/#org' } } })) }] },
  { url: '/contact', title: 'Contact AL MANTIQ | Start a Project or Build Your Team', desc: 'Talk to AL MANTIQ about your software product, ERP, mobile app or offshore team. Book a 30-minute call or send a message today.', html: api.renderContact(),
    ld: [webPage('/contact', 'Contact AL MANTIQ | Start a Project or Build Your Team', 'Book a 30-minute call or contact AL MANTIQ about your product or engineering team.', 'ContactPage'), crumbs([['Home', '/'], ['Contact', '/contact']])] },
  ...api.PRODUCTS.map(p => ({ url: `/product/${p.slug}`, title: productTitle(p), desc: p.blurb, html: api.renderProductDetail(p.slug),
    ld: [webPage(`/product/${p.slug}`, productTitle(p), p.blurb), crumbs([['Home', '/'], ['Products', '/products'], [p.name, `/product/${p.slug}`]]), softwareApplication(p)] })),
];

// client-side navigation keeps title/description/canonical in sync with the prerendered pages
const seoMap = Object.fromEntries(pages.map(p => [p.url.replace(/^\//, ''), { t: p.title, d: p.desc }]));

let clientJs = content.replace(/document\.title = [^;]*;/g, '');
clientJs = clientJs.replace(/if\(footer\) footer\.innerHTML = `[^`]*`;/, () => 'if(footer) footer.innerHTML = `' + FOOTER_HTML + '`;');
clientJs = clientJs.replace('window.scrollTo(0,0);', 'seoUpdate(hash); window.scrollTo(0,0);');
clientJs = `
const SEO_MAP = ${JSON.stringify(seoMap)};
function seoUpdate(h){ const m = SEO_MAP[h] || SEO_MAP['']; document.title = m.t; const set = (sel, attr, v) => { const el = document.querySelector(sel); if(el) el.setAttribute(attr, v); }; set('meta[name=description]', 'content', m.d); set('meta[property="og:title"]', 'content', m.t); set('meta[property="og:description"]', 'content', m.d); set('meta[name="twitter:title"]', 'content', m.t); set('meta[name="twitter:description"]', 'content', m.d); const u = '${SITE}/' + (h || ''); set('link[rel=canonical]', 'href', u); set('meta[property="og:url"]', 'content', u); set('meta[name="twitter:url"]', 'content', u); }
` + clientJs;
if (!clientJs.includes('seoUpdate(hash)')) throw new Error('seoUpdate patch failed');
write(path.join(OUT, 'assets/js/content.js'), clientJs);

const shell = read(path.join(SRC, 'index.html'))
  .replace(/<meta name="(?:description|robots|twitter:[^"]+)"[^>]*>\s*/g, '')
  .replace(/<meta property="og:[^"]+"[^>]*>\s*/g, '')
  .replace('href="styles.css?v=service-heading-v3"', `href="/styles.css?v=${BUILD}"`)
  .replace('src="presentation.js?v=mobile-nav"', `src="/presentation.js?v=${BUILD}"`)
  .replace(/(assets\/(?:js|css)\/[\w.-]+\.(?:js|css))/g, `$1?v=${Date.now()}`)
  .replace(/href="#" onclick/g, 'onclick')
  .replace(/<link rel="icon"[^>]*>\n?/, '');

const navHrefs = ['/', '/products', '/services', '/contact'];
for (const p of pages) {
  const abs = SITE + p.url;
  const head = `<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#3159eb">
<meta name="author" content="AL MANTIQ"><meta name="application-name" content="AL MANTIQ"><meta name="format-detection" content="telephone=no"><meta name="color-scheme" content="dark light">
<link rel="manifest" href="/site.webmanifest"><link rel="alternate" hreflang="en" href="${abs}"><link rel="alternate" hreflang="x-default" href="${abs}">
<link rel="canonical" href="${abs}">
<meta property="og:type" content="website"><meta property="og:site_name" content="AL MANTIQ">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${abs}"><meta property="og:image" content="${SITE}/assets/brand/og-image.jpg"><meta property="og:image:secure_url" content="${SITE}/assets/brand/og-image.jpg"><meta property="og:image:type" content="image/jpeg"><meta property="og:locale" content="en_US"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="AL MANTIQ logo">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:url" content="${abs}"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.desc)}"><meta name="twitter:image" content="${SITE}/assets/brand/og-image.jpg"><meta name="twitter:image:alt" content="AL MANTIQ — Intelligent Products and Digital Engineering">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': p.ld })}</script>
<link rel="icon" type="image/svg+xml" href="/assets/brand/favicon.svg"><link rel="apple-touch-icon" href="/assets/brand/mantiq-symbol.png">`;
  let html = shell.replace(/<title>.*?<\/title>/s, () => head)
    .replace('<div id="app"></div>', () => `<div id="app">${withHrefs(p.html)}</div>`)
    .replace(/(<footer class="site-footer">).*?(<\/footer>)/s, (m, a, b) => a + footer + b);
  const page = p.url === '/' ? 'home' : p.url.split('/')[1] === 'product' ? 'product' : p.url.slice(1);
  let i = 0;
  html = html.replace(/<a onclick="go\('[^']*'\)">/g, () => `<a href="${navHrefs[i++] ?? '/'}">`);
  html = withHrefs(html).replace('<body>', `<body data-page="${page}">`);
  for (const [label, pattern] of [
    ['title', /<title>/g], ['description', /<meta name="description"/g], ['canonical', /<link rel="canonical"/g],
    ['og:title', /<meta property="og:title"/g], ['twitter:title', /<meta name="twitter:title"/g], ['json-ld', /<script type="application\/ld\+json"/g],
  ]) {
    const count = (html.match(pattern) || []).length;
    if (count !== 1) throw new Error(`${p.url}: expected one ${label}, found ${count}`);
  }
  write(path.join(OUT, p.url === '/' ? 'index.html' : path.join(p.url.slice(1), 'index.html')), html);
}

write(path.join(OUT, 'site.webmanifest'), JSON.stringify({ name: 'AL MANTIQ', short_name: 'AL MANTIQ', start_url: '/', display: 'standalone', background_color: '#060b15', theme_color: '#3159eb', icons: [{ src: '/assets/brand/mantiq-symbol.png', sizes: '1254x1254', type: 'image/png' }] }, null, 2));
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
