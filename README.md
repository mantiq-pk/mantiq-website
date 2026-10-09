# AL MANTIQ website

Production source for [almantiqhub.com](https://almantiqhub.com), including the company website, services, contact journey, ILMA CMS, and Pakistan Education AI product pages.

## Structure

```text
index.html                 Final website shell used for local source previews
styles.css                 Final visual design
presentation.js            Presentation and accessibility enhancements
assets/                    Shared content, theme, styles, and brand assets
deploy/build.mjs           Production prerenderer
deploy/check-seo.mjs       SEO verification for every public route
deploy/overrides.css       Production-only CSS adjustments
```

The source site uses hash routing for a dependency-free local preview. The production builder prerenders the same content to real, SEO-friendly paths in `.deploy/`.

## Local source preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Production build

```sh
node deploy/build.mjs
python3 -m http.server 4175 --bind 127.0.0.1 --directory .deploy
CHECK_HOST=http://127.0.0.1:4175 node deploy/check-seo.mjs
```

The generated `.deploy/` directory is intentionally ignored and should not be committed.

## Maintenance

- Update shared page content and product data in `assets/js/content.js`.
- Update the finalized visual treatment in `styles.css`.
- Keep reusable brand and theme rules in `assets/css/`.
- Rebuild and run the SEO check before deployment.
