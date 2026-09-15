# Guilloché

**A living engine-turning lathe — banknote-grade guilloché that endlessly re-weaves itself.**

Guilloché turns your screen into a rose-engine lathe. It continuously draws the interlaced spirograph rosettes and sinusoidal wave-bands you find on banknotes, passports, and fine watch dials — rendered as thousands of hair-thin metallic strokes on a dark intaglio ground. Slow oscillators perpetually modulate every frequency, amplitude, phase, and rotation, so the weave never settles: petals bloom and fold, moiré nodes drift across the lattice, and the whole tapestry breathes.

One file. Zero dependencies. Pure trochoid math.

## Why it's cool

- **It's real math, not a texture.** Every stroke is a sampled epi/hypotrochoid rosette or an offset sine-band — the same parametric families that engine-turning lathes cut mechanically for two centuries.
- **It never repeats.** Low-frequency oscillators drive the gear ratios, amplitudes, phase, and spin, and additive "lighter" compositing over a trail-fade gives it a silky, engraved-metal glow.
- **Every frame is a permalink.** The seed and all parameters live in the URL hash, so any moment you like is a shareable, restorable link.
- **Set-and-forget.** Leave it idle and it smoothly interpolates toward a fresh random seed instead of hard-cutting — a genuine screensaver / live wallpaper.

## Run it

Open `index.html` in any modern browser. Double-click it, or:

```
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

No server, build step, install, or network access. To restore a specific design, append its hash, e.g.:

```
index.html#s=rose-spiral-7781
```

## Controls

The control panel (top-left) exposes:

- **Symmetry** — petal count (3–13).
- **Density** — how many nested woven strokes per layer.
- **Speed** — animation rate (0 freezes time).
- **Quality / performance** — five presets (`eco` → `ultra`) that trade stroke budget and device-pixel-ratio for smoothness. Drop it on low-power devices.
- **Palette** — click a swatch to lock a palette; unlock to let them auto-crossfade.
- **Seed** — type any string for a reproducible design, or hit ↻ for a random one.
- Buttons: **Pause · Lock palette · Banknote frame · Fullscreen · Export PNG · Export SVG · Copy link · Gallery**.

The panel and gallery auto-hide when the mouse is idle; move it to bring them back.

### Keyboard shortcuts

| Key | Action | Key | Action |
|-----|--------|-----|--------|
| `Space` | Pause / play | `G` | Toggle gallery rail |
| `H` | Hide / show UI | `B` | Toggle banknote frame |
| `F` | Fullscreen | `S` | Save PNG |
| `N` | New random seed | `V` | Save SVG |

## How the seed permalink works

A small deterministic PRNG (`xmur3` + `mulberry32`) maps a seed string to a full design: symmetry order, per-layer gear ratios and harmonics, layer count, stroke density, wave-bands, and palette. The **same seed always produces the same design.** The current seed plus your slider/palette/frame overrides are written to the URL hash (debounced), so **Copy link** hands someone the exact piece you're looking at.

## Palettes

Six curated metallic inks on dark grounds: `banknote-green`, `rose-gold`, `cyanotype-steel`, `aged-copper`, `amethyst`, `monochrome-silver`. Unlocked, they crossfade slowly on rotation.

## Exports

- **PNG** renders the current frame at a multiplied resolution (with extra accumulation passes for a dense still), clamped to stay within browser canvas limits.
- **SVG** emits the frame's strokes as vector paths — plotter-friendly and infinitely scalable.

## Accessibility & performance

- Respects `prefers-reduced-motion`: draws one rich static frame and does **not** run an animation loop (no idle CPU/GPU drain). Flip the OS setting back and it resumes live.
- Visible keyboard focus on all controls; palette swatches are focusable and Enter/Space-activatable.
- `devicePixelRatio`-aware sizing and an explicit per-frame stroke budget keep the frame rate in check across the quality presets.

## License

MIT © Alex Wictor. See [LICENSE](LICENSE).
