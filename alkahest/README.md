# Alkahest

A falling-sand alchemy sandbox where every collision is a reaction waiting to be discovered.

## Why it's cool

Powder toys are fun for about ten seconds — then you've seen the sand pile up and you're done. Alkahest keeps the toy but gives you a reason to keep poking it: the **Codex**. Every element pairing that reacts (water hardening lava into obsidian, fire racing down an oil trail, acid eating through metal, salt melting ice) is a hidden entry. The first time you trigger one it flashes, chimes, and fills a slot — `7 / 26 discovered`. Aimless play becomes a treasure hunt without a single tutorial popup.

It's one `.html` file. No build step, no server, no dependencies. Double-click it.

## Features

- **Falling-sand cellular automaton** on a 200×150 typed-array grid, rendered crisp and full-window at 60fps.
- **14 paintable elements** with real physics: powders (sand, salt, ember) pile up, liquids (water, oil, lava, acid) flow and layer by density (oil floats on water), gases (steam, smoke) rise and dissipate, fire spreads and burns out.
- **26 emergent reactions** resolved per neighbor each tick — chain them together and watch systems unfold.
- **The Codex**: a live discovery log. Locked `???` entries bait exploration; each reveal flashes, chimes, and updates the counter.
- **Seedable RNG** — the seed shown in the toolbar makes a run reproducible, and it's stored in the URL hash alongside your current element and brush size, so the link is shareable.
- **Bias-free simulation** — alternating horizontal scan direction and rotated neighbor checks keep particles from all drifting one way.

## Run it

No install. No build.

1. Download or clone this repo.
2. Double-click `index.html` (or drag it into any modern browser).

That's the whole thing. Chrome, Firefox, Edge, and Safari all work. Audio (the discovery chime) starts after your first click, per browser autoplay rules.

## Controls

| Action | Control |
|---|---|
| Paint | Click and drag on the canvas |
| Pick element | Click a palette swatch, or press its hotkey |
| Brush size | Scroll wheel (1–24) |
| Pause / resume | `Space` or the Pause button |
| Single step | `N` or the Step button |
| Clear the grid | `C` or the Clear button |
| New random seed | "New seed" button |
| Collapse the Codex | Click the Codex header |

**Element hotkeys:** `0` eraser · `1` wall · `2` sand · `3` water · `4` oil · `5` lava · `6` fire · `7` acid · `8` plant · `9` salt · `q` ember · `w` ice · `r` metal · `t` stone.

## Starter reactions to try

A few to get you going — the other ~20 are yours to find:

- Drop **water** onto **lava**.
- Paint an **oil** trail and touch one end with **fire**.
- Bury **metal** under **acid**.
- Sprinkle **salt** on **ice**.

## Add your own element or reaction

The engine is data-driven, so extending it is a small edit inside `index.html`:

- **New element** — add an entry to the `E` table (name, RGB color, type, density, hotkey) and, if it's paintable, add its id to the `PALETTE` array.
- **New reaction** — add one object to the `RX` array: `{id, name, mix, a, b, toA, toB, p}` where `a` and `b` are the two colliding element ids, `toA`/`toB` are what they become, and `p` is the per-tick chance. The Codex slot and both collision orderings are wired up automatically.

## License

MIT — see [LICENSE](LICENSE).
