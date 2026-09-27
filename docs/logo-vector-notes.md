# Mantiq logo vector reconstruction

The two SVGs were reconstructed from the supplied PNG foregrounds. The original PNG files were only read and remain unchanged. The interrupted image-generation request was abandoned when SVGs were requested; these outputs use vector paths rather than generated raster assets.

| File | Source foreground bounds (pixels) | SVG viewBox | Closed contours |
| --- | --- | --- | --- |
| `assets/brand/mantiq-symbol.svg` | x 376–878, y 449–764 | `0 0 506 319` | 2 |
| `assets/brand/al-mantiq-lockup.svg` | x 284–976, y 393–813 | `0 0 696 424` | 13 |

Each viewBox has two pixels of transparent padding around the traced foreground. The full lockup preserves the supplied symbol placement and original AL MANTIQ letterforms as paths, including the counters in both A letters and Q. There is no SVG text, embedded PNG, background rectangle, or external font dependency.

Foreground extraction selected blue pixels with B > 100, B > 1.5R and B > 1.2G, plus the original white lettering with min(R,G,B) > 160. Pixel-edge contours were simplified using a 0.95 source-pixel Douglas–Peucker tolerance. Fine edge variations from the supplied raster are retained rather than replacing its shapes with a different logo design.

Both SVGs use `fill="currentColor"` and `fill-rule="evenodd"`. Inline SVGs inherit text color. For separately loaded image assets that must vary with the webpage theme, use the SVG as a CSS mask and set the element's background color. Both files have accessible title elements.

Validation: source contour counts, tight bounds and XML structure checked; all expected lettering contours and counter holes are present. The root agent handles screenshot review after integrating the SVG masks.
