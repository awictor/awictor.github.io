# Volute

**Grow a whole galaxy from real Hubble-morphology grammar — then name it, tune it, and share it as a URL.**

Volute is a single HTML file. No build, no dependencies, no network calls. Open it and it grows an island universe on a `<canvas>`: spiral arms, a central bar, dust lanes, pink star-forming knots, a globular-cluster halo, and a scatter of background field galaxies.

## Why it's cool

Most procedural galaxies scatter noise until it looks starry. Volute instead does what astronomers do: it **commits to a morphological type first**, then derives everything downstream from that one decision. Pick a barred grand-design spiral and you get a bar, two clean arms, and crowded blue leading edges. Pick a flocculent Sc and the arms go fuzzy and multi-armed. Pick an elliptical and the arms, dust, and star-forming regions simply don't exist.

That makes the output *legible* — you can tell an SBb from an Sc from an E at a glance — while staying endlessly varied. And because the entire generator is a deterministic PRNG seeded from the URL hash, every galaxy you like is reproducible from a short link.

## What each seed decides

A seed picks a **Hubble type** from a weighted grammar table, then derives structure from it:

| Type | What it renders |
|------|-----------------|
| `SBb` / `SBc` | Barred spirals — central bar feeding grand-design (2-arm) or multi-arm structure |
| `Sa` / `Sc` | Unbarred spirals — tight grand-design vs. loose flocculent |
| `S0` | Lenticular — smooth flattened disk, faint dust, no arms |
| `(R)SB` | Ring galaxy — bright star ring with knots strung around it |
| `E` | Elliptical — smooth spheroid of old stars, nothing else |

Downstream of that: a logarithmic-spiral arm skeleton (`r = R0·e^(bθ)`, `b = tan(pitch)`), density-wave star placement (young blue stars crowd the leading edge, old red/yellow fill the disk), HII knots along the arms, dust lanes carved with subtractive compositing, a globular halo, and — sometimes — an interacting companion with a tidal bridge and counter-tail derived from the same seed.

## Run it

Open `index.html` in any modern browser:

```sh
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

Or just double-click the file. That's it — there's nothing to install.

## Controls

- **✦ Reseed** — grow a brand-new galaxy from a random seed.
- **Presets** — jump straight to a curated SBb, Sc, S0, Ring, or Elliptical.
- **Arms / Pitch / Density / Size** sliders — retune the current galaxy. (Arms and Pitch disable themselves for morphologies that have neither — ellipticals, lenticulars, rings.)
- **Companion** — toggle an interacting satellite galaxy with a tidal bridge.
- **Rotation** — slowly spin the disk.
- **Copy link** — copy the current galaxy's full-state URL to the clipboard.
- **Export PNG** — save the finished galaxy as a PNG (always captures the fully-grown frame, not a mid-animation one).

## Sharing

The complete state — seed, type, arm count, pitch, density, size, companion — lives in the URL hash. Copy the address (or hit **Copy link**) and whoever opens it sees the exact same galaxy.

## Accessibility notes

Sliders are labeled for assistive tech, pinch-zoom is left enabled, and if your OS has **reduce motion** turned on, Volute snaps straight to the finished galaxy instead of playing the wind-in animation.

## License

MIT © 2026 Alex Wictor
