# Gamutry

An OKLCH color workbench in a single HTML file: pick a color, see the live sRGB (and Display-P3) gamut edge, build harmonies, and check WCAG contrast — no build, no deps, no network.

## Why it's cool

Most workflows bounce between an OKLCH picker, a palette generator, and a separate contrast checker. Gamutry fuses all three around the actual math of OKLCH and shows the one thing most pickers hide: **where the sRGB gamut edge really is**, traced live on a 2D slice of the color space. You can see which chroma/hue values are reachable at a given lightness and which clip — and which are reachable only on wide-gamut Display-P3.

Because harmonies are computed by rotating hue in **OKLCH** rather than HSL, the swatches stay perceptually even in lightness instead of the muddy/neon drift you get from HSL rotation.

## Features

- **Live gamut-slice canvas.** Two modes: a hue-angle / chroma-radius wheel at fixed lightness, and an L×C rectangular slice at fixed hue. The sRGB gamut edge is drawn as a solid white line and the Display-P3 edge as a dashed pink line; P3-only regions are dimmed/hatched. Drag the marker (or use arrow keys) to pick.
- **Three-way synced readout** — sRGB hex, HSL, and OKLCH — each with a one-click copy button, plus an inline "out of sRGB gamut" warning that also notes when a color is reachable on P3 only.
- **Direct color entry.** Paste a hex (`#3b82f6`, `#abc`) or an `oklch(...)` string (`oklch(0.6 0.15 250)` or `oklch(65% 0.15 250)`) and hit Enter to inspect it.
- **One-seed harmony generator** — complementary, analogous, triadic, tetradic, and a tonal ramp — via OKLCH hue rotation. Click any swatch to reseed.
- **WCAG contrast matrix.** Every palette color vs every other color plus `#000`/`#fff`, showing the ratio with AAA / AA / AA-large / fail badges. Reflects the active color-vision simulation.
- **Color-vision simulation** — protanopia, deuteranopia, tritanopia (Viénot–Brettel–Mollon) — applied across the slice, swatches, and contrast matrix.
- **Image palette extraction.** Drag-drop or click to load an image; it downsamples and k-means clusters to pull dominant colors that seed the workbench.
- **CSS export** in two forms: a `:root` custom-property block (hex fallback + `oklch()`), and a named Tailwind-style **50–950 tonal scale** with perceptually-even lightness and gamut-clamped chroma — shown as a visual swatch strip and as copyable CSS + a Tailwind config snippet.
- **Shareable state.** The full workbench state is serialized to the URL hash (via `history.replaceState`, so it never spams your Back button). Use the **Copy share link** button to grab it.

## Run

Open `index.html` in any modern browser — double-click it, or drag it into a tab. There is no build step, no server, and zero network calls or dependencies. It works from `file://`.

## Controls

| Action | How |
|---|---|
| Pick hue & chroma | Drag on the slice |
| Fine-tune | Focus the slice, then arrow keys (hold **Shift** for finer steps) |
| Change the fixed axis | The **Lightness (L)** / **Hue (H)** slider under the slice |
| Switch slice mode | **Hue / Chroma wheel** vs **L × C slice** toggle |
| Enter a color directly | Type a hex or `oklch(...)` in the **SET** field, press Enter |
| Reseed from a harmony/tonal/extracted swatch | Click it (or focus + Enter/Space) |
| Simulate color-vision deficiency | The **Color-vision simulation** dropdown |
| Extract colors from an image | Drop an image on, or click, the extract box |
| Copy any value / export | The **copy** buttons |
| Share the current state | **Copy share link** (top-right), or just bookmark the URL |

## Implementation notes

All the color math is hand-rolled and inlined from Björn Ottosson's OKLab formulas — sRGB↔OKLab/OKLCH conversion, the LMS→linear-P3 path for the P3 gamut test, a binary-search gamut-edge finder, and WCAG relative-luminance/contrast. No libraries, ~315 lines of JavaScript in one file.

## License

MIT — see [LICENSE](LICENSE).
