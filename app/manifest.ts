import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AL MANTIQ',
    short_name: 'AL MANTIQ',
    start_url: '/',
    display: 'standalone',
    background_color: '#060b15',
    theme_color: '#3159eb',
    icons: [{ src: '/assets/brand/mantiq-symbol.png', sizes: '1254x1254', type: 'image/png' }],
  };
}
