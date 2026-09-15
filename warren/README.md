# Warren

**Watch a dungeon carve itself.** An animated Binary Space Partitioning (BSP) room-and-corridor generator that runs entirely in one HTML file.

Most dungeon generators hand you a finished map. Warren shows you the algorithm: the rectangle recursively splits along alternating axes (partition lines sweep in), rooms bloom inside each leaf cell, then L-shaped corridors zipper sibling subtrees together bottom-up through the BSP tree. Toggle the tree overlay to see the partition hierarchy laid over the finished floor plan — the part that makes BSP finally click. It doubles as a clear BSP explainer and a genuinely useful roguelike floor-plan tool.

Every layout is deterministic from a seed carried in the URL hash, so any dungeon you like is one shareable link away.

## Features

- **Animated BSP carving** — splits sweep in, rooms bloom (scale + fade), corridors carve with a directional wipe, replayed frame-by-frame from a recorded step list.
- **Full transport** — play/pause, scrub, jump to the next phase boundary, replay, or snap to instant. A phase bar under the scrubber shows where Splitting → Rooms → Corridors sit on the timeline.
- **Deterministic + shareable** — a small `mulberry32` PRNG seeds the whole build; the seed and every parameter live in the URL hash, so the same link always renders the same dungeon.
- **Live parameters** — grid width/height, max recursion depth, min leaf size, room padding, corridor width, and playback speed, all re-run on release.
- **BSP tree overlay** — superimpose leaf-node bounds and split lines over the dungeon.
- **Four palettes** — Stone, Neon, Parchment, and Blueprint (which renders the floor plan as an annotated architectural draft with dimension labels).
- **Roguelike dressing + stats** — start/exit stairs placed at the endpoints of the room-tree diameter, dead-end tagging, auto-placed doors, and a six-metric readout (rooms, corridors, dead-ends, longest path, tiles carved, tree leaves).
- **Export & share** — download the finished map as a crisp PNG, copy the raw tile grid as JSON (with legend + start/exit), or copy a permalink.

Zero dependencies, zero build, zero network.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab. That's the whole setup.

To load a specific dungeon, append a hash:

```
index.html#seed=12345&w=54&h=38&d=5&ml=7&pad=1&cw=1&pal=neon
```

| Key   | Meaning         | Key    | Meaning              |
|-------|-----------------|--------|----------------------|
| `seed`| PRNG seed       | `pad`  | room padding         |
| `w`   | grid width      | `cw`   | corridor width       |
| `h`   | grid height     | `pal`  | `stone` / `neon` / `parchment` / `blueprint` |
| `d`   | max recursion depth | `ml` | min leaf size      |

## Controls

**Transport (below the canvas)**

- **▶ / ⏸** — play or pause the animation
- **⏭** — jump to the next phase boundary (Splitting → Rooms → Corridors → end)
- **scrubber** — drag to any point in the build
- **↻ Reseed** — new random seed, fresh floor
- **⟲ Replay** — restart the animation from zero
- **⏩ Instant** — snap straight to the finished map
- **seed field** — type a number and press Enter to jump to that dungeon
- **🔗 Permalink / 🖼 PNG / { } Copy grid** — copy the current URL, export a PNG, or copy the tile grid as JSON

**Keyboard**

- **Space** — play / pause
- **← / →** — step one frame back / forward
- **R** — reseed

(Keyboard shortcuts are ignored while the seed field is focused.)

**Side panel** — live sliders for grid size, depth, min leaf size, room padding, corridor width, and playback speed; a palette picker; the BSP tree-overlay toggle; and the floor-plan stats.

## License

MIT © Alex Wictor
