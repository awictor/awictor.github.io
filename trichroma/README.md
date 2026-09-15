# Trichroma

See any image through eight kinds of color vision — locally, in one file.

Trichroma is a zero-dependency, single-HTML color-blindness image simulator. Drop, paste, or open an image (or use a built-in test chart) and view it through eight color-vision-deficiency (CVD) models using proper linear-RGB CVD transforms. Compare original vs. simulated side-by-side or with a draggable slider-wipe, flip on a daltonization pass, and read an auto-computed legibility note that flags color pairs likely to collapse. Everything runs on the canvas in your browser — no upload, no server, no tracking.

## Why it's cool

Most online CVD tools are ad-laden, upload your image to a server, or only cover the three "classic" dichromacies. Trichroma is a self-contained accessibility instrument you can keep in a repo: it does the real color-space math (not a cheap RGB desaturation), covers the full anomalous-to-dichromat-to-monochromat spectrum with a severity slider, and turns "is my chart readable?" into a concrete before/after you can wipe through — all offline, in one ~440-line file. Settings (not the image) serialize to the URL hash, so you can bookmark or share an exact view.

## Features

- **Eight CVD models:** protanomaly, deuteranomaly, tritanomaly, protanopia, deuteranopia, tritanopia, plus achromatomaly and full achromatopsia.
- **Physically-grounded pipeline:** sRGB → linearize (LUT) → 3×3 CVD matrix → gamma-encode. The three anomalous/dichromat families use the Machado, Oliveira & Fernandes (2009) matrices interpolated across a 0–100% severity slider; monochromacy uses a luminance projection (Rec. 709 weights).
- **Three compare modes:** single view, side-by-side (labeled Original / Simulated), and a draggable slider-wipe over the same frame.
- **One-click Daltonize:** redistributes lost color-channel error into visible channels to recover contrast (family-aware; skipped for achromatic types).
- **Problem heatmap:** red overlay whose intensity tracks how far each pixel shifts under the simulation — candidate confusion zones at a glance.
- **Legibility note:** samples dominant colors, finds the pairs whose perceptual separation collapses under the deficiency, and gives a good / caution / fail verdict. A heuristic, not a certified audit.
- **CVD-safe recolor:** maps collapsing dominant colors to the nearest Okabe–Ito colorblind-safe swatches.
- **Eyedropper spot-compare:** click two points to read their original vs. simulated hex plus a WCAG contrast ratio and perceptual delta for the pair.
- **Local-only intake:** drag-drop, file picker, or clipboard paste. The working canvas downscales to 1000px max for interactivity.
- **PNG export:** downloads exactly what's on the stage (respects the active compare mode, heatmap, and markers).
- **Shareable state:** CVD type, severity, compare mode, daltonize, and selected demo serialize to the URL hash. The image never leaves your machine.

## Run it

No build, no dependencies, no server:

```
open index.html      # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

Or just double-click `index.html`. It works from `file://` in any modern browser (Chrome 99+, Firefox 103+, Safari 16+). On first load it auto-shows the Ishihara demo.

## Usage

1. **Load an image** — drop it on the stage, paste from the clipboard (Ctrl/Cmd-V), click **Open image…**, or click a demo tile in the gallery.
2. **Pick a CVD type** from the dropdown; the severity resets to a sensible default per type.
3. **Drag Severity** (0–100%) to interpolate from normal vision toward the full deficiency.
4. **Choose a compare mode** — Single / Side / Wipe. In Wipe, drag the divider across the image.
5. **Toggle Daltonize** to preview a contrast-recovery correction, **Problem heatmap** to highlight shifting regions, or **Eyedropper** then click two points to compare exact colors and contrast.
6. Read the **Legibility note** and **CVD-safe recolor** panels for collapsing pairs and suggested swatches.
7. **Download PNG** to save the current view.

Demo gallery tiles are keyboard-accessible: Tab to a tile and press Enter or Space to load it.

## URL hash reference

Settings serialize to the hash (the image never does), e.g. `#type=deuteranopia&sev=100&mode=wipe&dalt=1`:

| Param   | Values | Meaning |
|---------|--------|---------|
| `type`  | `protanomaly`, `deuteranomaly`, `tritanomaly`, `protanopia`, `deuteranopia`, `tritanopia`, `achromatomaly`, `achromatopsia` | CVD model |
| `sev`   | `0`–`100` | Severity percent |
| `mode`  | `single`, `side`, `wipe` | Compare mode |
| `dalt`  | `1` | Daltonize on |
| `heat`  | `1` | Problem heatmap on |
| `demo`  | `ishihara`, `chart`, `status`, `transit` | Built-in demo to load |

## Accuracy notes

The dichromat/anomalous simulation uses the Machado, Oliveira & Fernandes (2009) matrices ("A Physiologically-based Model for Simulation of Color Vision Deficiency", IEEE TVCG). These are a widely-used approximation, not a per-individual clinical measurement — real CVD varies between people. The legibility note is a dominant-pair heuristic (perceptual distance + WCAG-style contrast), useful for spotting risk but not a substitute for testing with affected users.

## License

MIT © 2026 Alex Wictor. See [LICENSE](LICENSE).
