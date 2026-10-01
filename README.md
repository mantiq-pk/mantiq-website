# Mantiq website designs

Five independent visual directions for the AL MANTIQ website, presented together on a comparison page. All directions share the October 2026 website content for the company, services, offshore-team offering, ILMA CMS, Pakistan Education AI, and contact journey.

**Live site:** [mantiq-pk.github.io/mantiq-website](https://mantiq-pk.github.io/mantiq-website/)

## Preview

From this directory, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [the comparison page](http://127.0.0.1:4173/), then select a design:

- [Design 1 — Editorial](http://127.0.0.1:4173/designs/editorial/): cream and forest green, a split layout, school illustration, Outfit headings, and DM Sans body text.
- [Design 2 — Modern](http://127.0.0.1:4173/designs/modern/): white and cobalt blue, centered hero, and asymmetric feature layouts.
- [Design 3 — Graphic](http://127.0.0.1:4173/designs/graphic/): dark and lime, oversized type, and geometric artwork.
- [Design 4 — Systems](http://127.0.0.1:4173/designs/modern-artifacts/): the Modern direction with original product-delivery and connected-platform vector artifacts.
- [Design 5 — Plain](http://127.0.0.1:4173/designs/modern-plain/): the Modern direction with all hero artifacts removed.

Editorial, Modern, Systems, and Plain open in dark mode by default and include a navigation toggle that remembers the visitor's preference across those designs.

There are no dependencies to install and no build step. Web fonts use Google Fonts with local fallbacks.

## Files

```text
index.html                       Comparison page
assets/
  css/base.css                   Original shared website styles
  css/brand.css                  Shared logo presentation
  css/gallery.css                Comparison-page styles
  css/theme.css                  Shared light/dark toggle presentation
  js/content.js                  Shared content, page templates, and routing
  js/gallery.js                  Comparison-page behavior
  js/theme-init.js               Early theme selection to prevent flashing
  js/theme.js                    Theme toggle and saved preference behavior
  brand/mantiq-symbol.svg        Transparent symbol used by the website
  brand/al-mantiq-lockup.svg      Transparent full logo used by the website
  brand/mantiq-symbol.png        Preserved supplied blue-symbol PNG
  brand/al-mantiq-lockup.png      Preserved supplied full-logo PNG
designs/
  editorial/                     Design 1: index.html, styles.css, presentation.js
  modern/                        Design 2: index.html, styles.css, presentation.js
  graphic/                       Design 3: index.html, styles.css, presentation.js
  modern-artifacts/              Design 4: Modern replica with meaningful system artwork
  modern-plain/                  Design 5: Modern replica without hero artwork
reference/original.html           Unmodified supplied HTML reference
docs/design-notes.md              Design and maintenance notes
docs/previews/                    Preview screenshots
variant-1.html                    Compatibility redirect to Editorial
variant-2.html                    Compatibility redirect to Modern
variant-3.html                    Compatibility redirect to Graphic
```

Each design loads the shared content script and adds its own styles and presentation enhancements. The legacy `variant-*.html` links redirect to the corresponding design and preserve hash routes, including the dedicated ILMA CMS and Pakistan Education AI pages.

## Maintenance

Edit a design's `styles.css` for its visual treatment and `presentation.js` for presentation enhancements. Keep shared brand styling in `assets/css/brand.css` and comparison-page changes in its dedicated files. The transparent SVG logos are applied as CSS masks and inherit each design’s `--brand-color`; the original PNGs remain preserved.

`assets/js/content.js` owns the shared wording, product data, page rendering, hash routing, offshore-team configurator, and contact behavior. Keep content changes there rather than duplicating them inside a design's presentation layer. `reference/original.html` remains the unchanged historical source for comparison.

See [design notes](docs/design-notes.md) for further context.
