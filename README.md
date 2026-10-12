# AL MANTIQ website

The production website for [almantiqhub.com](https://almantiqhub.com), built with Next.js App Router. It includes the company website, services and contact journey, ILMA CMS, and Pakistan Education AI product pages.

## Local development

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```sh
npm run check
npm run build
npm start
CHECK_HOST=http://127.0.0.1:3000 npm run test:seo
```

Next.js server-renders every public route, generates the sitemap, robots file and web manifest, and exposes the contact form through a route handler.

## Structure

```text
app/                         App Router pages, metadata and API routes
components/site-chrome.tsx   Navigation, theme and browser interactions
lib/site.ts                  Route content, metadata and content adapter
public/assets/               Shared content and brand assets
styles.css                   Final visual design
deploy/check-seo.mjs         Live SEO verification for every public route
```

## Contact form email

The contact form sends messages through Resend to `contact@almantiqhub.com`.
Set `RESEND_API_KEY` in the deployment environment and verify `almantiqhub.com` in Resend so the default sender address (`website@almantiqhub.com`) is authorized. `CONTACT_FROM_EMAIL` can override the sender. If the email service is unavailable, the form falls back to a prefilled email draft.
