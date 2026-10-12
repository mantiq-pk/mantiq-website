import { NextResponse } from 'next/server';

const RECIPIENT = 'contact@almantiqhub.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, maxLength: number) => String(value || '').trim().slice(0, maxLength);
const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const company = clean(body.company, 160);
  const service = clean(body.service, 160);
  const message = clean(body.message, 5000);
  if (!name || !EMAIL_PATTERN.test(email) || !service || !message) {
    return NextResponse.json({ error: 'Please complete all required fields' }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form is missing RESEND_API_KEY');
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
  }

  const subject = `Project inquiry — ${service}`;
  const text = `${message}\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nLooking for: ${service}`;
  const html = `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p><hr><p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Company:</strong> ${escapeHtml(company || '—')}<br><strong>Looking for:</strong> ${escapeHtml(service)}</p>`;
  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'AL MANTIQ Website <website@almantiqhub.com>',
        to: [RECIPIENT],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!resendResponse.ok) {
      console.error('Resend rejected contact email', resendResponse.status, await resendResponse.text());
      return NextResponse.json({ error: 'Email provider rejected the message' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed', error);
    return NextResponse.json({ error: 'Email could not be sent' }, { status: 502 });
  }
}
