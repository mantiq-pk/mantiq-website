import type { MetadataRoute } from 'next';
import { routes, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => ({ url: `${SITE_URL}${route}`, lastModified: new Date(), priority: route === '/' ? 1 : route.startsWith('/product/') ? 0.8 : 0.7 }));
}
