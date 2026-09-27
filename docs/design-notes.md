# Mantiq: three independent designs

The current requirement is to preserve the supplied website's content and offer three distinct visual designs for selection. Earlier rewritten content was removed. All designs retain the original Home, Products, Services, Contact, and five product-detail pages, including pricing, features, testimonials, FAQs, and contact information.

## Design directions

1. **Editorial** — `designs/editorial/`: warm cream and forest green, a split hero, school illustration, and editorial content rows. Typography uses Outfit for headings and DM Sans for body text. Testimonial cards have 24px horizontal padding.
2. **Modern** — `designs/modern/`: white and cobalt blue, a centered headline, feature ribbon, asymmetric content, and a split benefits layout.
3. **Graphic** — `designs/graphic/`: dark and lime, oversized typography, geometric artwork, and graphic content rows.

These are complete separate webpages, with layout differences as well as different colors. `index.html` provides the comparison interface, direct links, and live previews. Review navigation and design labels are separate from the original website content.

## Structure and content preservation

Each design directory contains:

- `index.html`: page shell and stylesheet/script references.
- `styles.css`: that design's visual treatment.
- `presentation.js`: presentation and accessibility enhancements applied after the original renderer.

Shared files live under `assets/`:

- `js/content.js` contains the exact original inline JavaScript. It supplies all original data, copy, renderers, hash routing, FAQ interaction, and contact form behavior.
- `css/base.css` contains the original shared styles; design styles override these as needed.
- `css/brand.css` applies the transparent SVG symbol and full lockup as CSS masks. Each design supplies its logo color through `--brand-color`, so no opaque background or per-theme PNG is needed.
- `css/gallery.css` and `js/gallery.js` serve the comparison page.
- `brand/mantiq-symbol.svg` and `brand/al-mantiq-lockup.svg` are the transparent vector logos used by the website. The supplied originals, `brand/mantiq-symbol.png` and `brand/al-mantiq-lockup.png`, are preserved separately.

The complete original HTML is preserved byte-for-byte in `reference/original.html`. It is the reference for future content comparisons. Preview screenshots are stored in `docs/previews/`.

The root `variant-1.html`, `variant-2.html`, and `variant-3.html` files are small compatibility redirects. They preserve old links and hashes while sending visitors to the corresponding design directory. Product routes continue to use the original `#/product/<slug>` format.

## Editing guidelines

Keep visual changes in the relevant design stylesheet or presentation script. Preserve the wording and behavior supplied by `assets/js/content.js`; presentation enhancements should not introduce replacement copy. Leave `reference/original.html` unchanged.

After changes, review the comparison page and each affected design at desktop and phone widths. Check Home, Products, Services, Contact, and product-detail routes; verify original text, keyboard navigation, FAQ behavior, and layout overflow. Screenshots should reflect the current design, not an earlier revision.

Rendered text and original-script parity were checked before the folder reorganization. Those earlier checks do not substitute for checking the current file paths and shared-script loading after structural changes.

## Local preview

Run from the project root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open [the comparison page](http://127.0.0.1:4173/). There is no build step or package installation. Fonts load from Google Fonts with system fallbacks. Contact behavior remains as supplied in the original.

## Design references

- [Anthropic frontend-design guidance](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
- [Vercel interface guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)

These references informed the visual and interaction review. No skill installer or downloaded code was executed.
