# Elytra

**Type in a word, get a beetle.** A deterministic procedural generator that grows a fully-formed, anatomically-plausible beetle from any seed and pins it to a Victorian specimen plate — handwritten label, cast shadow, aged paper and all.

Single file. Zero dependencies. Zero network calls. Everything runs in `index.html`.

## Why it's cool

Beetles are the most species-rich group of animals on Earth, so "infinite plausible beetles from a number" lands as delightful rather than gimmicky. Every seed deterministically drives a small PRNG that decides body plan, proportions, surface sculpture, structural-color iridescence, armament and name — then draws it as crisp, bilaterally-symmetric SVG. The same seed always produces the exact same beetle, down to every puncture and hair, so a specimen is just a string you can share, bookmark and remix.

Flip on **Cabinet mode** and you get a whole expedition drawer of distinct specimens from one master seed, exportable as a single print-ready poster.

## Run it

No build step. Open the file:

```
# just double-click index.html, or:
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

Any modern browser works (Chrome, Firefox, Safari, Edge). Nothing is installed, fetched, or phoned home.

## Controls

**Specimen Seed**
- **Seed field** — the string that determines the whole beetle. Same seed → same beetle, forever.
- **Lock** — protects the current seed from *Randomize*.
- **Randomize** — rolls a fresh readable seed (unless locked).
- **Copy Link** — copies a shareable URL with the full state packed into the `#` fragment.

**Morphology**
- **Archetype** — Auto (from seed) or force one of: Stag, Rhinoceros/Hercules, Weevil, Longhorn, Ground, Jewel/Buprestid, Ladybird, Dung. Each biases proportions, armament, antennae and palette.
- **Size / Elongation** — overall scale and how stout vs. slender the body reads.
- **Armament** — amount of horn / mandible / rostrum development.
- **Iridescence** — strength of the metallic structural-color sheen.
- **Pattern density** — striae, punctures, spots/bands/chevrons/speckle.
- **Palette** — Auto (from seed) or a fixed palette (Emerald, Cobalt, Amethyst, Copper, Gold, Obsidian, Crimson, Bronze).

**Presentation**
- **Light direction** — drives both the specular highlight and the direction of the cast shadow.
- **Spread wings** — swings the elytra open on their hinge to reveal translucent veined hindwings.
- **Cabinet mode** — tiles a full drawer of specimens from one master seed. **Drawer specimens** sets how many.

**Hybridize**
- Enter two seeds (or hit **Seed** to fill from the current seed + a random one) and **Breed hybrid** to blend the two morphologies and palettes into a single hybrid with a blended binomial name. The *Breed hybrid* button stays lit while a hybrid is on screen; editing the seed box returns to a single specimen.

**Export**
- **SVG** — clean vector of the current specimen (or cabinet).
- **PNG ×3** — high-resolution raster of the current specimen.
- **Whole-plate poster (PNG)** — the entire expedition drawer as one poster. Very large exports are automatically scaled down to stay within browser canvas limits.

## Sharing & seeds

Every parameter — seed, all sliders, archetype, palette, spread/cabinet mode and hybrid parents — is serialized into the URL hash. Copy the link and anyone who opens it sees the identical specimen and can keep tweaking from there. This works whether the page is served over `http(s)://` or opened directly from disk (`file://`).

## Architecture

- **PRNG:** `xmur3` seed hash → `mulberry32` generator, salted per morphological aspect so independent traits don't correlate.
- **Morphology model:** the seed + control state produce a full spec (dimensions, sculpture, armament, antennae, legs, palette). Everything downstream is a pure function of that spec.
- **Renderer:** hand-built SVG, bilaterally symmetric, with gradient-based "structural color," a light-driven specular highlight, and self-contained CSS animation (antenna/tarsi sway + a shimmer sweep).
- **Presentation:** procedural aged-paper background, entomology pin, soft shadow, and a morphology-aware Latin binomial + handwritten specimen label.

**Note on typography:** the handwritten labels use a web-safe cursive/serif font stack (Segoe Script, Bradley Hand, Snell Roundhand, …) with generic fallbacks. No font is bundled, so label typography — and any PNG you export — will look slightly different depending on which fonts your OS has installed.

## License

MIT © 2026 Alex Wictor
