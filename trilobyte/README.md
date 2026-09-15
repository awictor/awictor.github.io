# Trilobyte

**A procedural trilobite fossil generator — seed a slab, get a museum-grade extinct arthropod with its own Latin name.**

Trilobyte grows plausible trilobites — the segmented marine arthropods that ruled the Paleozoic seas for ~270 million years — and renders each one as a fossil relief pressed into a stone matrix. One number (the seed) drives a whole specimen: its anatomy, an auto-generated genus/species binomial, a geologic period, and a fake locality, all typeset onto a specimen label like a real cabinet drawer.

It is a single HTML file. No build step, no dependencies, no network calls.

## Why it's cool

Trilobites are wildly diverse, gorgeously bilaterally symmetric, and instantly recognizable — ideal generator fodder. Trilobyte turns a seed into a carved-relief fossil using an anatomy *grammar* rather than a fixed template, so every seed reads like a distinct collectible. The fossil-on-slab look (procedurally speckled stone, bump-mapped depth, weathering cracks) makes each output screenshot-worthy, and the seed lives in the URL so any specimen is a shareable, reproducible link.

## Features

- **Anatomy grammar, not a template.** Each specimen is built from a cephalon (head-shield with a lobed glabella, axial/dorsal furrows, and genal cheek spines), an articulated thorax of *N* segments with pleural spines, and a fused ribbed pygidium (tail-shield) — all mirrored across the central axial lobe for exact bilateral symmetry.
- **Live body-plan sliders.** Reshape the specimen in real time: thorax segment count, body taper, elongation, glabella bulge, spininess, genal-spine length, and eye size.
- **Eye morphology toggle.** Switch between holochroal (many tiny lenses) and schizochroal (few large lenses) compound eyes.
- **Smooth enrollment.** An enrollment slider plus an eased **Roll / Unroll** animation curls the specimen into the classic defensive roll by compounding a rotation through a per-segment joint chain.
- **Auto-generated taxonomy.** A seed-derived Latin binomial (e.g. *Selennoides magnifer*), a geologic period (Cambrian / Ordovician / Silurian / Devonian) with a period-tinted palette, and a plausible locality — printed on a typeset label with a 10 mm scale bar.
- **Cabinet drawer mode.** A 3×3 grid of related seeded specimens; click any one to deep-link into its own full view.
- **Shareable seeds.** The seed is stored in the URL hash, so copying the link reproduces the exact specimen.
- **Export.** One-click SVG (vector, fidelity-safe) or PNG (2.5× raster of the specimen card).

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's it.

To load a specific specimen, append the seed to the URL hash:

```
index.html#123456
```

## Controls & usage

| Control | What it does |
|---|---|
| **Seed** box | Type a number and press Enter to generate that specimen. Out-of-range values are coerced to a 32-bit seed and the box updates to the canonical value. |
| **⟳** (next to seed) | Generate a fresh random specimen. |
| **↺ Reset to seed** | Appears once you tweak a slider or the eye type. Discards manual tweaks and restores the seed's canonical fossil. |
| **Shape sliders** | Segments, taper, elongation, glabella bulge, spininess, genal spines, eye size — reshape the specimen live. |
| **Compound eyes** | Toggle holochroal / schizochroal eye morphology. |
| **Enrollment** slider | Manually curl/uncurl the specimen. |
| **Roll ⟲ / Unroll** | Animate between flat and fully enrolled; the label reflects the next action. |
| **Ease** | Toggle eased vs. linear roll timing. |
| **Cabinet drawer** | Show a 3×3 drawer of related seeds; click a cell to open it. (Shape controls are dimmed here — they apply to a single specimen, not the grid.) |
| **Export PNG card** / **Export SVG** | Download the full specimen card. |

### Sharing and reproducibility

The **seed** is what gets shared: it lives in the URL hash, and anyone who opens that link regenerates the identical canonical specimen. Manual slider/eye tweaks are intentionally **not** encoded in the link — they stay local to your session. Use **Reset to seed** to return to the canonical fossil at any time.

### Export notes

- **SVG** is the fidelity-safe path: it preserves the speckled stone, carved-relief depth, and weathering cracks exactly as rendered.
- **PNG** rasterizes the on-screen SVG via a canvas. The SVG filters are fully self-contained (no external references), so there is no canvas tainting. Note that some WebKit/Safari builds render SVG filters (`feTurbulence`, `feSpecularLighting`, `feDisplacementMap`) inconsistently when an SVG is drawn as an image — the stone speckle and relief depth may come out flatter in the PNG there. If the PNG looks off, use the SVG export. A failed PNG export surfaces a visible message rather than silently doing nothing.

## License

MIT — see [LICENSE](LICENSE).
