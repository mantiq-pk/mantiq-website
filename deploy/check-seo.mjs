// Checks every live page for the SEO tags it should have. Run: node deploy/check-seo.mjs
const SITE = 'https://almantiqhub.com';
const paths = ['', 'products', 'services', 'contact', 'product/ilma-cms', 'product/pakistan-education-ai'];
const checks = {
  title: /<title>[^<]{20,}/, description: /name="description" content="[^"]{50,}/, canonical: /rel="canonical" href="https:\/\/almantiqhub\.com/,
  robots: /name="robots"/, 'og:title': /property="og:title"/, 'og:description': /property="og:description"/, 'og:image': /property="og:image"/, 'og:url': /property="og:url"/,
  'twitter:card': /name="twitter:card"/, 'twitter:image': /name="twitter:image"/, 'json-ld': /application\/ld\+json/, h1: /<h1/, lang: /<html lang="en"/,
  viewport: /name="viewport"/, 'theme-color': /name="theme-color"/, manifest: /rel="manifest"/, hreflang: /hreflang="x-default"/, favicon: /rel="icon"/,
};
for (const p of paths) {
  const html = await (await fetch(`${process.env.CHECK_HOST || SITE}/${p}`)).text();
  const missing = Object.entries(checks).filter(([, re]) => !re.test(html)).map(([k]) => k);
  const noAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/g) || []).length;
  console.log(`/${p}`.padEnd(36), missing.length || noAlt ? `MISSING: ${missing.join(', ')} imgs-without-alt=${noAlt}` : 'all present');
}
for (const f of ['sitemap.xml', 'robots.txt', 'site.webmanifest']) console.log(f.padEnd(36), (await fetch(`${process.env.CHECK_HOST || SITE}/${f}`)).status);
