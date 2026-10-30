'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://65-2-162-226.sslip.io/api/v1'
).replace(/\/$/, '');

function pageName(pathname: string) {
  if (pathname.startsWith('/product/')) return 'product';
  if (['/products', '/services', '/contact'].includes(pathname)) return pathname.slice(1);
  return 'home';
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(current);
  }, []);

  useEffect(() => {
    document.body.dataset.page = pageName(pathname);
    window.scrollTo(0, 0);

    const teamButton = document.querySelector<HTMLElement>('[data-team-request]');
    const startTeamRequest = () => {
      const fields = [
        ['Timezone', 'team-timezone'],
        ['Workflow', 'team-workflow'],
        ['Tech stack', 'team-stack'],
        ['Team size', 'team-size'],
      ];
      const summary = fields.map(([label, id]) => `${label}: ${(document.getElementById(id) as HTMLSelectElement)?.value || ''}`).join('\n');
      sessionStorage.setItem('mantiq-team-request', `I'd like help building an offshore team.\n\n${summary}`);
      router.push('/contact');
    };
    teamButton?.addEventListener('click', startTeamRequest);

    const jump = document.querySelector<HTMLAnchorElement>('a[href="#team-configurator"]');
    const jumpToTeam = (event: Event) => {
      event.preventDefault();
      document.getElementById('team-configurator')?.scrollIntoView({ behavior: 'smooth' });
    };
    jump?.addEventListener('click', jumpToTeam);

    const form = document.getElementById('cform') as HTMLFormElement | null;
    const saved = sessionStorage.getItem('mantiq-team-request');
    if (form && saved) {
      (form.elements.namedItem('message') as HTMLTextAreaElement).value = saved;
      (form.elements.namedItem('service') as HTMLSelectElement).value = 'Offshore Team';
      sessionStorage.removeItem('mantiq-team-request');
    }

    const submitContact = async (event: Event) => {
      event.preventDefault();
      if (!form) return;
      const data = new FormData(form);
      const status = document.getElementById('form-status');
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!status || !button) return;
      button.disabled = true;
      status.textContent = 'Sending your message…';
      try {
        const response = await fetch(`${API_BASE_URL}/onboarding/contact/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(data)),
        });
        if (!response.ok) throw new Error('Message could not be sent');
        form.reset();
        status.textContent = "Thanks — your message has been sent. We'll reply within one business day.";
      } catch {
        const subject = encodeURIComponent(`Project inquiry — ${data.get('service')}`);
        const body = encodeURIComponent(`${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || '—'}\nLooking for: ${data.get('service')}`);
        status.textContent = "The secure email service is unavailable, so we're opening a prefilled email instead.";
        window.location.href = `mailto:contact@almantiqhub.com?subject=${subject}&body=${body}`;
      } finally {
        button.disabled = false;
      }
    };
    form?.addEventListener('submit', submitContact);

    return () => {
      teamButton?.removeEventListener('click', startTeamRequest);
      jump?.removeEventListener('click', jumpToTeam);
      form?.removeEventListener('submit', submitContact);
    };
  }, [pathname, router]);

  const changeTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem('mantiq-color-theme', next);
  };

  const nav = [
    ['Home', '/'],
    ['Products', '/products'],
    ['Services', '/services'],
    ['Contact', '/contact'],
  ] as const;

  return (
    <>
      <nav>
        <div className="wrap">
          <Link className="logo" href="/" aria-label="AL MANTIQ home"><span className="brand-symbol" aria-hidden="true" />AL MANTIQ</Link>
          <div className="navlinks">
            {nav.slice(0, 3).map(([label, href]) => <Link key={href} className={pathname === href ? 'on' : undefined} href={href}>{label}</Link>)}
            <button className="theme-toggle" type="button" onClick={changeTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'dark'}>
              <span className="theme-toggle__icon" aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span>
              <span className="theme-toggle__text">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>
            <Link className={pathname === '/contact' ? 'on' : undefined} href="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      <main id="app">{children}</main>
      <footer className="site-footer">
        <div className="ft">
          <Link className="ft-logo" href="/" aria-label="AL MANTIQ home"><span className="brand-symbol" aria-hidden="true" /><span>AL MANTIQ</span></Link>
          <p className="ft-tag">Intelligent Products. Digital Engineering.</p>
          <nav className="ft-cols" aria-label="Footer">
            <div><strong>Products</strong><Link href="/product/ilma-cms">ILMA CMS</Link><Link href="/product/pakistan-education-ai">Pakistan Education AI</Link></div>
            <div><strong>Services</strong><Link href="/services">Software Development</Link><Link href="/services">Mobile App Development</Link><Link href="/services">QA &amp; Testing</Link></div>
            <div><strong>Company</strong><Link href="/contact">Contact</Link><Link href="/contact">Start a Project</Link></div>
          </nav>
          <div className="ft-bottom"><span>© 2026 AL MANTIQ. All rights reserved.</span></div>
        </div>
      </footer>
    </>
  );
}
