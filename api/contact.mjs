const RECIPIENT = 'contact@almantiqhub.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, maxLength) => String(value || '').trim().slice(0, maxLength);
const escapeHtml = value => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form is missing RESEND_API_KEY');
    return response.status(503).json({ error: 'Email service is not configured' });
  }

  const name = clean(request.body?.name, 120);
  const email = clean(request.body?.email, 254);
  const company = clean(request.body?.company, 160);
  const service = clean(request.body?.service, 160);
  const message = clean(request.body?.message, 5000);

  if (!name || !EMAIL_PATTERN.test(email) || !service || !message) {
    return response.status(400).json({ error: 'Please complete all required fields' });
  }

  const subject = `Project inquiry — ${service}`;
  const text = `${message}\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nLooking for: ${service}`;
  const html = `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p><hr><p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Company:</strong> ${escapeHtml(company || '—')}<br><strong>Looking for:</strong> ${escapeHtml(service)}</p>`;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
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
      return response.status(502).json({ error: 'Email provider rejected the message' });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email failed', error);
    return response.status(502).json({ error: 'Email could not be sent' });
  }
}
