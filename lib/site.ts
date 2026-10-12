import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export const SITE_URL = 'https://almantiqhub.com';

export const routes = [
  '/',
  '/products',
  '/services',
  '/contact',
  '/product/ilma-cms',
  '/product/pakistan-education-ai',
] as const;

export type SiteRoute = (typeof routes)[number];

export const pageMeta: Record<SiteRoute, { title: string; description: string }> = {
  '/': {
    title: 'AL MANTIQ | AI Products & Digital Engineering',
    description: 'AL MANTIQ builds AI-powered products, custom ERP platforms, mobile apps, Salesforce solutions and flexible engineering teams for ambitious businesses.',
  },
  '/products': {
    title: 'AI Products: ILMA CMS & Education AI | AL MANTIQ',
    description: 'Explore ILMA CMS, an AI-powered operating system for schools, and Pakistan Education AI, a curriculum-aware AI tutor built for local learners.',
  },
  '/services': {
    title: 'Software Development & Engineering Services | AL MANTIQ',
    description: 'Build custom ERP, web and mobile apps, Salesforce solutions and immersive XR products with AL MANTIQ engineering, QA and delivery teams.',
  },
  '/contact': {
    title: 'Contact AL MANTIQ | Start a Project or Build Your Team',
    description: 'Talk to AL MANTIQ about your software product, ERP, mobile app or offshore team. Book a 30-minute call or send a message today.',
  },
  '/product/ilma-cms': {
    title: 'ILMA CMS | AI School Management Platform | AL MANTIQ',
    description: 'ILMA connects schools, teachers, students and parents through one intelligent ecosystem for management, learning, communication and assessment.',
  },
  '/product/pakistan-education-ai': {
    title: 'Pakistan Education AI | AI Tutor for Pakistan | AL MANTIQ',
    description: "A specialized study and teaching companion designed around Pakistan's board curricula, examination patterns and local learning needs.",
  },
};

type LegacySite = {
  renderHome: () => string;
  renderProducts: () => string;
  renderServices: () => string;
  renderContact: () => string;
  renderProductDetail: (slug: string) => string;
};

let cachedSite: LegacySite | undefined;

function legacySite(): LegacySite {
  if (cachedSite) return cachedSite;

  const source = fs.readFileSync(path.join(process.cwd(), 'public/assets/js/content.js'), 'utf8');
  const inertElement = {
    innerHTML: '',
    textContent: '',
    value: '',
    elements: {},
    classList: { add() {}, remove() {} },
    addEventListener() {},
    append() {},
    querySelector() { return inertElement; },
    scrollIntoView() {},
  };
  const context = vm.createContext({
    console,
    document: {
      addEventListener() {},
      querySelectorAll: () => [],
      querySelector: () => inertElement,
      getElementById: () => inertElement,
      createTextNode: (text: string) => text,
    },
    window: { addEventListener() {}, scrollTo() {}, location: {} },
    location: { hash: '', pathname: '/' },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    FormData: class {},
    fetch: async () => ({ ok: true }),
  });

  vm.runInContext(`${source}\n;globalThis.__site = { renderHome, renderProducts, renderServices, renderContact, renderProductDetail };`, context);
  cachedSite = context.__site as LegacySite;
  return cachedSite;
}

function makeLinksReal(html: string): string {
  return html
    .replace(/<a([^>]*?)onclick="go\('([^']*)'\)"([^>]*)>/g, (_match, before, target, after) => `<a${before}href="/${target}"${after}>`)
    .replace('onclick="startTeamRequest()"', 'data-team-request="true"');
}

export function renderRoute(route: SiteRoute): string {
  const site = legacySite();
  if (route === '/') return makeLinksReal(site.renderHome());
  if (route === '/products') return makeLinksReal(site.renderProducts());
  if (route === '/services') return makeLinksReal(site.renderServices());
  if (route === '/contact') return makeLinksReal(site.renderContact());
  return makeLinksReal(site.renderProductDetail(route.split('/').at(-1) || ''));
}

export function normalizeRoute(parts?: string[]): SiteRoute | null {
  const route = (`/${parts?.join('/') || ''}`.replace(/\/$/, '') || '/') as SiteRoute;
  return routes.includes(route) ? route : null;
}

export function jsonLd(route: SiteRoute) {
  const meta = pageMeta[route];
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: 'AL MANTIQ',
    alternateName: 'Mantiq',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/brand/mantiq-symbol.png`,
    image: `${SITE_URL}/assets/brand/og-image.jpg`,
    email: 'contact@almantiqhub.com',
  };
  const page = {
    '@type': route === '/contact' ? 'ContactPage' : 'WebPage',
    '@id': `${SITE_URL}${route}#webpage`,
    url: `${SITE_URL}${route}`,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': `${SITE_URL}/#site` },
    about: { '@id': `${SITE_URL}/#org` },
  };
  return { '@context': 'https://schema.org', '@graph': [organization, page] };
}
