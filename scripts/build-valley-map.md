# Rebuilding `public/valley-map.webp`

The service-area map is **one image, rendered once**, not a live tile layer.
This file is how to make it again.

## Why it works this way

It used CARTO's `dark_nolabels` raster tiles. In August 2026 CARTO began
requiring an API key for raster basemaps and started stamping un-keyed tiles
with a repeating **"API KEY REQUIRED"** watermark, which appeared on the live
site with no change on our side. Their free tier is real — 5M tiles/month, key
issued instantly, no account — but a static map showing eight towns should not
be a third party's uptime, terms, or billing decision.

A hand-drawn SVG replacement was tried and rejected: it removed the dependency
but did not read as a map.

So the map is rendered from open data and committed. At runtime the section
makes **one same-origin image request** and depends on nothing external.

## Constraint that will bite you

The pins are positioned by projecting real lon/lat through the same Web
Mercator maths in `valley-map.tsx`. The image must be rendered at **exactly**
the frame that component assumes, or every pin drifts off its town:

| | |
|---|---|
| centre | `34.157, -118.617` |
| slippy zoom | `11` |
| layer | `2048 x 1024` |
| rendered at | `4096 x 2048` (2x) |

**MapLibre's zoom is offset by one from slippy zoom** — it counts against
512px tiles, so MapLibre zoom 11 equals slippy zoom 11 rendered at 2x. That is
why the render viewport is 4096x2048 at MapLibre zoom 11. Get this wrong and
the map looks fine on its own while sitting at the wrong scale under the pins.

If `ZOOM`, `CENTER` or `LAYER` change in `valley-map.tsx`, re-render to match.

## Steps

1. **Style.** Fetch `https://tiles.openfreemap.org/styles/dark` (free, keyless,
   OpenStreetMap data via OpenMapTiles).
2. **Tiles.** Read the vector endpoint out of
   `https://tiles.openfreemap.org/planet` (the path carries a dated build, so
   re-read it rather than hardcoding) and mirror z0–z12 for roughly
   `-119.45, 33.62 → -117.78, 34.72`. About 450 tiles. Mirror locally because
   a headless browser in a sandbox usually cannot reach the host directly, and
   because the render should not hammer a donation-funded service.
3. **Strip the style.** Point the source at the local mirror, drop the sprite
   and glyph URLs, and remove **every `symbol` layer** — OpenFreeMap's own place
   names would otherwise sit next to our pins arguing with them. Also drop the
   `ne2_shaded` raster source; it only applies below z6.
4. **Sink the water.** Stock water is `rgb(27,27,29)`, *lighter* than the land,
   so a luminance tint turns the Pacific into the brightest thing on the map.
   Set water fill to about `rgb(7,7,8)` and waterway to `rgb(20,20,22)`.
5. **Render.** MapLibre in headless Chromium, viewport 4096x2048,
   `deviceScaleFactor: 1`, `interactive: false`, `fadeDuration: 0`. Wait for the
   map's `idle` event, then a few seconds more. Chromium needs
   `--use-gl=swiftshader --enable-unsafe-swiftshader` with no GPU.
6. **Tint.** The render lands entirely in luminance 0–60. Expand that onto the
   warm palette so streets read as ink on the night ground — piecewise
   interpolation, roughly:

   ```
   0→(16,14,12)  8→(22,19,16)  12→(30,26,22)  16→(42,36,31)
   24→(70,62,53) 30→(100,88,76) 40→(130,115,100) 60→(170,151,131)
   ```

7. **Export.** WebP quality 72 — measured mean error ~1.5/255 against the
   source, and street detail survives. Write both:
   - `public/valley-map@2x.webp` — 4096x2048, ~453 KB
   - `public/valley-map.webp` — 2048x1024, ~117 KB (phones scale the layer to
     0.46 anyway, so they never need the big one)

## Licence

OpenStreetMap data is ODbL. The credit under the map in `service-area.tsx` is
required and must stay, even though nothing is fetched at runtime.
