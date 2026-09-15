# Imago

**Seed a hash, hatch a one-of-a-kind moth or butterfly.**

Imago is a single HTML file — no build, no dependencies, no network — that procedurally generates bilaterally symmetric lepidoptera. Type a seed (or hit Randomize) and a museum-drawer specimen hatches: forewing and hindwing silhouettes from bezier control points, a venation skeleton, then a stack of pattern "genes" (base wash, discal eyespots, marginal bands, submarginal lunules, dapple speckles, iridescence) painted in a family palette. Every specimen is deterministic from its seed, so the URL hash reproduces the exact same insect. Export any specimen as a crisp 2x PNG or a true vector SVG.

## Why it's cool

- **Deterministic all the way down.** A `mulberry32` PRNG seeded from a hashed string drives wing shape, venation, and every pattern layer. Same seed → same specimen, always. The seed lives in the URL hash, so a link _is_ the specimen.
- **One primitive list, two renderers.** Canvas and SVG both consume the same list of rects/ellipses/bezier paths/gradients, so the raster PNG and the vector SVG are the same picture. The SVG is real geometry — print it, sticker it, laser-cut it.
- **Turn a slider, shift the species.** Wing span, sweep, tail/lobe length, scallop depth, pattern density, eyespot count, band width, and asymmetry jitter all reshape the living specimen in real time. Layered "genes" make the internals feel biological.
- **Breeding.** Cross two parent seeds' gene vectors into a hybrid offspring, with a mutation slider to spread the genome.
- **Collection mode.** A 3x3 contact sheet of nine seeds; click any cell to load it full-size, or export the whole sheet as one PNG/SVG.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's the whole install.

Optionally seed it from the URL:

```
index.html#Morpho1
```

To share a specimen, copy the address-bar URL (or use the **Copy link** button); the `#seed` hash reproduces it exactly.

## Controls

| Control | Effect |
|---|---|
| **Seed field** | Type any string and press Enter to hatch that specimen. |
| **Randomize** | New random seed. |
| **Collection** | Toggle a 3x3 contact sheet of random seeds. Click a cell to load it; the button becomes **Back to specimen**. |
| **Export PNG / SVG** | Download the current specimen (or the whole contact sheet) with the seed in the filename. |
| **Copy link** | Copy the shareable `#seed` URL to the clipboard. |
| **Palette** | Family recolor — Swallowtail, Morpho (iridescent), Tiger moth, Underwing, Sphinx, Monarch. |
| **Moth mode** | Fatter body + plumose (feathered) antennae instead of clubbed. |
| **Wing span / shape / tail-lobe / scallop** | Wing morphology: overall size, forewing sweep, hindwing tail length (swallowtail vs rounded), and scalloped-margin depth. |
| **Pattern density** | Amount of venation and dapple speckling. |
| **Eyespots** | Number of concentric discal eyespots (0–6). |
| **Band width** | Thickness of the marginal band. |
| **Asymmetry jitter** | Subtle left/right variation for an aberrant / gynandromorph look. |
| **Breed** | Enter two parent seeds and cross their gene vectors into an offspring; the mutation slider controls the spread. |

### Notes

- Editing any slider, the palette, or Moth mode moves the specimen away from its seed's deterministic genome. When that happens the panel shows a **Custom variant** note and exports are tagged `_custom`, because a hand-tweaked specimen is not reproducible from the seed alone.
- Filenames: single specimens export as `imago_<seed>.png` / `.svg` (or `imago_<seed>_custom.*` when edited); contact sheets export as `imago_collection_<firstSeed>.*`.

## License

MIT — see [LICENSE](LICENSE).
