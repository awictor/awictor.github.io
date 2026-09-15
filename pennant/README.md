# ⚑ Pennant

**Design flags from real vexillology grammar — divisions, ordinaries, and charges — with a live good-flag critique and crisp SVG/PNG export.**

Pennant is a single-file, zero-dependency flag designer. You don't drag shapes around a blank canvas — you compose a flag the way heralds actually describe one: pick a field **division**, lay an **ordinary** over it, add a single **charge**, all from a curated real-world flag palette. A live panel scores your design against NAVA's five principles of good flag design and gives plain-language hints as you work.

## Why it's cool

It treats flag design as a real design language rather than a doodle canvas. The division / ordinary / charge model is how vexillologists talk about flags, so you pick up the grammar as you play. The critique panel turns a vague "does this look nice?" into concrete feedback — color count, contrast (measured with a WCAG luminance ratio against the color actually under the charge), complexity, and balance. And because the entire design serializes into the URL hash, every flag you land on is reproducible and shareable.

## Features

- **Field divisions** rendered as clean SVG: plain, per pale (vertical), per fess (horizontal), per bend (diagonal), per saltire (X), and quarterly — each with independently chosen tinctures.
- **Ordinaries** layered on the field: Nordic offset cross (adjustable arm width + hoist offset), horizontal/vertical stripe, and hoist canton.
- **Charges**: five-point mullet (star), roundel (disc), crescent, and hoist triangle, with size, position, and color controls, drawn as exact SVG paths.
- **Curated palette** of heraldic tinctures plus canonical national-flag hues, so combinations stay legible and flag-authentic.
- **Live "Good Flag" critique** scoring the design against NAVA's five principles, plus a WCAG-ratio contrast check and an off-center balance hint.
- **Preset gallery** of eight real-world archetypes, each a live thumbnail labeled with its computed score — click to load.
- **Deterministic Randomize** (seeded PRNG) biased toward the good-flag rules, so any result is reproducible from its seed.
- **URL-hash sharing** — the full design state is encoded in the location hash for serverless sharing and reload fidelity.
- **Export**: crisp SVG, PNG at 1×/2×/4×, a flagpole mockup render, and a 3:2 / 2:1 / 1:1 aspect selector. A togglable waving preview animates the on-screen flag without affecting exports.

## Run it

No build, no dependencies, no network calls.

```
# simplest: just open the file
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or double-click `index.html` / drag it into a browser tab.

> **Sharing note:** the "🔗 Copy URL" feature encodes your design in the URL hash. When you open the file directly it's a `file://` path that only works on your own machine — Pennant will tell you so in the toast. To share a link with others, serve the folder over HTTP first:
>
> ```
> python -m http.server 8000   # then visit http://localhost:8000
> ```

## Controls

| Control | What it does |
|---|---|
| **Division** | Splits the field: plain / per pale / per fess / per bend / per saltire / quarterly. Tincture 2 appears when a division needs it. |
| **Ordinary** | Overlay band: Nordic cross, horizontal/vertical stripe, or hoist canton. Cross arm width, hoist offset, and stripe width sliders show their live values. |
| **Charge** | A single emblem: mullet, roundel, crescent, or hoist triangle, with size and hoist↔fly / top↕bottom position sliders (percentage readouts). |
| **Color swatches** | Click a tincture from the palette for each layer. The selected swatch is ringed. |
| **🎲 Randomize** | Generates a tasteful flag biased toward the good-flag rules. Type a number in **seed** to make the *next* Randomize reproducible. |
| **Waving preview** | Animates the on-screen flag (display only — exports stay crisp). |
| **Aspect** | 3:2 (default), 2:1, or 1:1 proportions. |
| **🔗 Copy URL / SVG / PNG 1–4× / 🏁 Flagpole** | Copy the shareable hash URL, or export vector SVG, rasterized PNG at three resolutions, or a flagpole mockup. |

## The grammar cheat-sheet

- **Division** — how the background field is partitioned (the base geometry).
- **Ordinary** — a broad band or cross laid across the field (cross, stripe, canton).
- **Charge** — a single symbol placed on top (star, disc, crescent, triangle).
- **Tincture** — a heraldic color. Pennant labels palette entries with their heraldic names (Argent, Or, Gules, Azure, Vert, Sable…).

## Good-flag scoring

The critique follows the North American Vexillological Association's [*Good Flag, Bad Flag*](https://nava.org/good-flag-bad-flag) five principles: keep it simple, use meaningful symbolism, use two or three basic colors, no lettering or seals, and be distinctive. Symbolism is inherently a matter of intent, so Pennant gives it the benefit of the doubt; the other four are scored from the geometry and palette. The contrast and balance lines below the score are extra guidance, not part of the five. The hints are exactly that — guidance, not verdicts.

## License

MIT — see [LICENSE](LICENSE).
