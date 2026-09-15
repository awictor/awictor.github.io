# Sfumato

A density-painted strange-attractor lab that renders millions of chaotic points into smoky, silk-like filaments — in one zero-dependency HTML file.

## Why it's cool

Most attractor toys just splatter dots on a canvas, and chaos plotted that way looks like noise. Sfumato instead iterates a chaotic map millions of times and **accumulates every visit into a floating-point density buffer**, then tone-maps that buffer with log scaling and a color palette. That single step is what turns the chaos into the veined, translucent, smoke-in-water look real attractor renders are famous for — the technique is named after *sfumato*, the Renaissance method for soft, smokelike gradation (think the haze in a da Vinci).

Everything is live. Drag a coefficient slider and the image re-paints progressively across animation frames, so the UI never freezes even on a 5-million-point render. Hit **Shuffle** for a fresh chaotic attractor, tune the look in the darkroom, and share the result — the entire state lives in the URL.

## Run it

Open `index.html` in any modern browser (double-click it, or drag it into a tab). That's it — zero dependencies, zero build step, no network access.

> Tip: the **Copy link** button works over `http(s)://` and `localhost`. If you open the file directly via `file://`, clipboard access may be blocked by the browser and Sfumato falls back to a copyable prompt. To serve locally: `python -m http.server` then visit `http://localhost:8000`.

## Controls

- **Family** — pick the attractor map: de Jong, Clifford, or Svensson. All three share the same four coefficient sliders.
- **Coefficients (a, b, c, d)** — the four parameters of the chaotic map. Drag to reshape the attractor; the view auto-fits and re-renders live.
- **Presets** — curated per-family thumbnails. Click one to load its coefficients. Thumbnails re-tone-map to match your current palette/darkroom, and the active preset (if any) is highlighted.
- **Palette** — ember, ice, spectral, or ink-on-vellum, applied as a colormap over the normalized log-density.
- **Iterations** — the point budget, 0.5M to 5M. More points = denser, smoother filaments (and a longer render).
- **Dark bg** — toggle the background between dark and light.
- **Color by dynamics** — when on, hue is driven by the average step length at each pixel (fast vs. slow regions of the map) while density drives brightness; when off, the palette maps straight to density.
- **Darkroom** (instant, no re-iteration) — Exposure, Gamma, Contrast, and Vignette re-tone-map the existing density buffer on the fly.
- **Shuffle** — generate a fresh random coefficient set, guaranteed (by a bounds/spread check) to produce a bounded, non-degenerate attractor.
- **Gallery mode** — continuously morphs the coefficients between random seeds for an animated sequence.
- **Export PNG / 2× / 4×** — save the current render. The 2× and 4× options accumulate a higher point budget into an offscreen buffer for a crisp print-resolution image, with a progress bar and a **Cancel** button.
- **Copy link** — copy a permalink that encodes the exact render (family, coefficients, palette, iterations, background, darkroom, dynamics) so anyone opening it sees the same attractor.

## How it works

**The three families** are 2D iterated maps. Starting from a point `(x, y)`, each produces the next point:

- **de Jong** — `x' = sin(a·y) − cos(b·x)`, `y' = sin(c·x) − cos(d·y)`
- **Clifford** — `x' = sin(a·y) + c·cos(a·x)`, `y' = sin(b·x) + d·cos(b·y)`
- **Svensson** — `x' = d·sin(a·x) − sin(b·y)`, `y' = c·cos(a·x) + cos(b·y)`

Iterated for millions of steps, the point never settles or repeats — it traces a *strange attractor*, a fractal set the orbit is drawn to but never leaves.

**Density accumulation.** A warm-up run finds the attractor's bounds. Then each iteration maps `(x, y)` to a pixel and increments that pixel's counter in a `Float32` density grid (plus a second channel that accumulates step length, for color-by-dynamics). After millions of hits, some pixels have been visited thousands of times and others just once.

**Log tone-mapping.** Raw density spans a huge range, so plotting it linearly blows out the dense core and hides the faint threads. Sfumato normalizes `log(density + 1)`, applies an exposure curve (`1 − e^(−exposure·a)`), then gamma and contrast, and finally blends the palette color over the background by that value. The result is smooth, translucent gradation across the whole dynamic range — the sfumato look.

**Progressive rendering.** The point budget is chunked (200k points per animation frame) so the render refines visibly and the tab never locks up. The darkroom controls re-run only the tone-mapping pass, so exposure/gamma/contrast/vignette are instant — no re-iteration needed.

## License

MIT — see [LICENSE](LICENSE).
