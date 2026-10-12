import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { jsonLd, normalizeRoute, pageMeta, renderRoute, routes, SITE_URL } from '@/lib/site';

type PageProps = { params: Promise<{ slug?: string[] }> };

export function generateStaticParams() {
  return routes.map(route => ({ slug: route === '/' ? undefined : route.slice(1).split('/') }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const route = normalizeRoute((await params).slug);
  if (!route) return {};
  const meta = pageMeta[route];
  const canonical = `${SITE_URL}${route}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages: { en: canonical, 'x-default': canonical } },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', siteName: 'AL MANTIQ', title: meta.title, description: meta.description, url: canonical, images: [{ url: '/assets/brand/og-image.jpg', width: 1200, height: 630, alt: 'AL MANTIQ' }] },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, images: ['/assets/brand/og-image.jpg'] },
  };
}

export default async function Page({ params }: PageProps) {
  const route = normalizeRoute((await params).slug);
  if (!route) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(route)).replace(/</g, '\\u003c') }} />
      <div dangerouslySetInnerHTML={{ __html: renderRoute(route) }} />
    </>
  );
}
