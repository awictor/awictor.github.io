# Sunaba 砂場

**A pocket zen sand garden you rake with your cursor — grooves that part around the stones like water.**

Sunaba (Japanese for "sandbox") is a single-file, zero-dependency dry-landscape (*karesansui*) zen garden you rake in the browser. Drag anywhere to carve parallel sand grooves that automatically bend and part cleanly around placed stones, the way a monk's rake flows around a rock.

## Why it's cool

Most fake zen-garden toys let you drag a brush and the lines just cut straight through the rocks — it breaks the illusion instantly. Sunaba computes a real scalar **distance field** from the stones (and the garden walls), and every rake tine rides the field's contours instead of a straight line. So the sand crowds and curves near stones and relaxes into calm open sweeps in the empty spaces — no manual fiddling, it just looks right.

The whole thing is ~350 lines of vanilla JS in one HTML file. Opens from a `file://` URL, and a finished garden is just a link you can text to someone.

## Features

- **Field-based raking** — dragging lays down N parallel tines whose paths follow a distance field generated from all stones + moss + garden edges, so grooves visibly part around obstacles.
- **Embossed dry-sand rendering** — grooves drawn with a top-left light model (bright crest / dark trough) over a cached procedural sand grain + vignette, for tactile raked relief with no image assets.
- **Stones & moss** — click to add a rock (organic blob with soft shadow), drag to reposition (grooves re-part live), long-press or right-click to remove. Paint soft moss patches that the rake flows around.
- **Meditation rings** — tap empty sand to emit concentric ripples; they settle gently (or appear instantly under reduced motion).
- **Comb width (1–7 tines)** plus Tight/Wide spacing presets.
- **Light / time-of-day slider** — one control drives both the emboss light angle and a warm→cool sand palette.
- **Curated starter gardens** — Ryōan-ji (15 stones), a three-stone triad, and an island-flow layout, auto-raked so first open is screenshot-ready.
- **Shareable state** — the full layout (stones, moss, user strokes, comb, light) is serialized into the URL hash. Reload or share the link to restore the garden.
- **PNG export** — high-resolution download via canvas `toBlob` (scale is clamped to stay under browser canvas-area limits).
- **Ambient audio** (muted by default) — a WebAudio rake whoosh that tracks drag speed, plus a struck-bowl tone on ripple taps. No audio files.
- **Reduced-motion aware** — ripple animation and easing are disabled under `prefers-reduced-motion`; instructional hints are still shown, just without the fade.

## Run it

No build step, no dependencies, no network calls.

```
# just open the file
open index.html            # macOS
xdg-open index.html        # Linux
start index.html           # Windows
```

Or double-click `index.html`, or serve the folder with any static server (`python3 -m http.server`) and visit it. Any modern browser works.

## Controls

| Action | How |
|---|---|
| Rake sand | Drag on the canvas (Rake mode) |
| Add a stone | Click empty sand (Stone mode) |
| Move a stone | Drag it (Stone mode) — grooves re-part live |
| Remove a stone/moss | Long-press, or right-click |
| Paint moss | Drag (Moss mode) |
| Send a ripple | Tap empty sand (Ripple mode) |
| Comb width | Comb slider, or number keys `1`–`7` |
| Spacing | Tight / Wide buttons |
| Light / time of day | Light slider |
| Load a garden | Gardens… menu |
| Undo last rake stroke | Undo button, or `U` |
| Clear everything | Clear button |
| Save PNG | ⤓ PNG button |
| Toggle ambient sound | ♪ button (off by default) |

**Keyboard:** `R` Rake · `S` Stone · `M` Moss · `P` Ripple · `1`–`7` comb width · `U` undo.

## How the distance-field raking works

On boot (and whenever a stone or moss patch moves) a coarse scalar field is computed on a grid: each cell stores the signed distance to the nearest obstacle (stones, moss, and the four walls). When you rake, each tine point is nudged along the field's gradient — away from nearby obstacles — before it's drawn. Bilinear sampling keeps it smooth, and because the field is cached and only rebuilt when geometry changes, dragging a wide comb near several stones stays cheap. The rake strokes are stored as compact polylines (not per-pixel), so redraws are fast and the shareable URL hash stays small — the auto-generated garden fill is reconstructed from a single comb value on load rather than serialized point-by-point.

## License

MIT — see [LICENSE](LICENSE).
