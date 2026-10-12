import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { SiteChrome } from '@/components/site-chrome';
import { SITE_URL } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'AL MANTIQ',
  authors: [{ name: 'AL MANTIQ' }],
  icons: {
    icon: '/assets/brand/favicon.svg',
    apple: '/assets/brand/mantiq-symbol.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3159eb',
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />
        <Script id="theme-init" strategy="beforeInteractive">{`try{const t=localStorage.getItem('mantiq-color-theme')==='light'?'light':'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch{document.documentElement.dataset.theme='dark'}`}</Script>
      </head>
      <body><SiteChrome>{children}</SiteChrome></body>
    </html>
  );
}
