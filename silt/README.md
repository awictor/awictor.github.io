# Silt

**Grainy mesh-gradient studio — paint with light, dust it with film grain, copy the CSS.**

Silt is a single-file, zero-dependency browser tool for designing the "grainy gradient"
look you see on modern product landing pages and app backgrounds. Drop color points on a
canvas, each becomes a soft radial glow that blends into a smooth mesh wash, then layer on
real SVG film grain to kill banding and add that tactile, print-like texture. Everything you
make exports as honest, paste-ready code — stacked CSS radial-gradients, a self-contained
SVG, or a high-res PNG.

## Why it's cool

- **The output is real CSS**, not a baked screenshot. The mesh is stacked `radial-gradient()`
  layers a developer can paste straight into any project.
- **The grain is real too** — an inline SVG `feTurbulence` overlay, so it scales, reflows, and
  weighs nothing. The on-canvas preview, the CSS/React/Tailwind snippets, and the SVG/PNG
  export all render from the same grain routine, so what you tune is what you ship.
- **A design is a link.** The full state is encoded in the URL hash, so sharing a gradient is
  just copying the address bar. No accounts, no build step, no server.

## Run it

Open `index.html` in any modern browser. Double-click it, or:

```
# optional — only if your browser blocks file:// features
python3 -m http.server 8000   # then visit http://localhost:8000
```

`file://` works fine — there are no network calls, fonts, or libraries.

## Controls & usage

**Building a gradient**
- **Click the canvas** to add a mesh point. **Drag** any point to reposition it.
- Select a point (click it, or a row in *Mesh Points*) to edit color, radius, opacity, and
  X/Y in the *Selected Point* panel — which auto-reveals on selection.
- **Arrow keys** nudge the selected point; hold **Shift** for larger steps. **Delete** removes it.
- **Palette Harmony** recolors your points from a seed hue (analogous, complementary, triadic,
  tetradic, monochrome, random).
- **Extract From Image** — drop an image on the canvas or pick a file to seed the mesh from its
  dominant colors (median-cut, runs entirely in-browser).

**Film grain**
- Tune scale, intensity, octaves, blend mode (overlay / soft-light / multiply / screen / normal),
  and monochrome vs. color grain in the *Film Grain* panel.
- **Isolate grain preview** shows the grain alone against neutral gray.

**Legibility / WCAG**
- Drop light or dark sample-text probes onto the gradient; each shows the live contrast ratio
  against the region beneath it (AA / AAA / AA-Large / FAIL) plus a summary report.

**Presets & shortcuts**
- **Preset Gallery** — click a thumbnail to load it; **right-click** or the **🔗** button copies a
  shareable link for that preset.
- **🎲 Randomize** (or press **R**) generates a fresh gradient + grain.
- **🌙 / ☀ theme toggle** switches the UI between dark and light (remembered across sessions).

**Export**
- Tabs for **CSS**, **Animated** (drifting `@property` mesh), **Tailwind**, **React**, **SVG**, and
  design-token **JSON** — each with copy-to-clipboard.
- Download a self-contained **.svg**, or a **PNG** at 1×/2×/3× or a custom width.
- **🔗 Share link** copies the current design as a URL.

## License

MIT © Alex Wictor
