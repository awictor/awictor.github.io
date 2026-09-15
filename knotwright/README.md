# Knotwright

**Weave endless Celtic interlace knots from a grid of walls — a real over-under braid engine in one file.**

Knotwright is a zero-dependency, single-file interlace-knot studio. You lay out a grid and drop *walls* on cell edges; a faithful mirror-curve / plait solver then threads one or more continuous cords through every free cell, weaving them strictly over-under-over. The result looks like genuinely woven cord — not clip-art with a drop shadow.

## Why it's cool

Celtic knotwork looks like magic but is governed by an elegant, teachable algorithm. Almost every "knot generator" online just pastes together pre-drawn SVG tiles. Knotwright runs the *actual* interlace math: a cord travels at 45° across a fine lattice, reflecting off walls and the border like light in a hall of mirrors, and a checkerboard parity rule guarantees a globally alternating weave. Place a wall and the whole braid reroutes and the loop count changes in front of you. Turn on **Teardown** to watch the algorithm trace itself.

It also computes a genuine topological invariant — how many distinct closed loops the interlace resolves into — and recomputes it on every edit.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a browser window. No server, build step, install, or network access required. It works straight from `file://`.

Optionally append a shared state hash (from **Copy link**) to load a specific knot.

## Features

- **Real interlace engine** — mirror-curve / plait traversal threading continuous cords with strict alternating over-under crossings.
- **Edge-wall editor** — click or drag on cell edges (and the border) to place/remove walls; the weave re-solves live. A ghost preview shows the wall you're about to toggle.
- **Symmetry-locked drawing** — none / horizontal mirror / vertical mirror / 2-fold / 4-fold rotation, so complex designs emerge from a few strokes.
- **Seeded generator** — a seed scatters walls deterministically for instant knots, reproducible from the URL.
- **Topology readout** — live loop count and crossing count.
- **Style controls** — rounded vs pointed corners, cord width, 7 palettes, 6 background themes, and per-loop / gradient-along-cord / single-cord coloring.
- **Cord flow** — animated markers trace each loop to reveal how the strand travels (respects `prefers-reduced-motion` with a static beaded path).
- **Teardown** — overlays the secondary lattice and wall mirrors and traces the traversal step by step.
- **Seamless** — solve on a torus and preview a genuinely tileable repeat.
- **Full state in the URL hash** — grid size, every wall (bit-packed), style, palette, and symmetry round-trip exactly, so any knot is a shareable link.
- **Export** — clean SVG (grouped per loop, or a seamless `<pattern>` tile), transparent PNG at selectable resolution, and a WebM recording of the cord-flow animation.
- **12 curated presets**, undo, keyboard shortcuts, and touch/pointer support.

## Usage

**Mouse / touch**

- Click or drag on the weave to add or remove a wall on the nearest cell edge. The outer border always reflects. Whatever symmetry mode is active mirrors every stroke.

**Keyboard**

| Key | Action |
|---|---|
| `R` | scatter a new random knot |
| `C` | clear all walls |
| `D` | load today's daily knot |
| `F` / `E` / `T` | toggle cord-flow / teardown / seamless |
| `P` / `G` / `O` | cycle palette / theme / corner style |
| `[` `]` | thinner / thicker cord |
| `-` `=` | smaller / larger grid |
| `1`…`5` | symmetry mode (none, mirror ↔, mirror ↕, 2-fold, 4-fold) |
| `S` / `I` | export SVG / PNG |
| `Z` | undo |
| `?` | help overlay |

## How it works (short version)

Each W×H grid of cells maps to a 2W×2H *fine* lattice. Walls live on interior edge midpoints; the solver runs a 45° billiard that reflects at walls and the border and crosses straight through free edges. Each crossing is drawn over or under by the rule *over ⇔ x-parity ⊕ diagonal-orientation*, which is provably alternating. Loop detection uses a directed-state visited set (marking each loop and its reverse traversal) so every geometric loop is counted once. Ribbon rendering uses cased strokes with gap breaks at under-crossings so over-strands cleanly occlude the strands beneath.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
