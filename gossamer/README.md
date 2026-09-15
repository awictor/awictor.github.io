# Gossamer

**A hanging cloth you can grab, billow, and tear apart — with threads that glow hotter the closer they are to snapping.**

Gossamer is a single-file, zero-dependency canvas toy: a verlet-integrated curtain pinned along its top edge. Grab it and drag to stretch and swing it, sweep the mouse fast to slice through the weave, toggle wind to make it billow, and pin or unpin the top-edge anchors. The signature move is stress-reactive coloring — every thread is tinted by how strained it is, from calm cyan when slack, through gold, to incandescent red just before it fails. The result is a live X-ray of the forces inside the fabric, so tearing feels earned rather than random.

## Why it's cool

Cloth sims are already mesmerizing, but the stress heatmap adds a genuinely readable layer: you can *see* exactly where the fabric is about to rip before you rip it. That single idea turns dragging and slicing from a random shredder into something intentional and physical.

## Run it

No build step, no dependencies, no network calls. Just open the file:

- Double-click `index.html`, or
- Drag `index.html` into any modern browser tab.

That's it. Works from `file://`.

## Controls

| Action | How |
|---|---|
| Grab & swing | Press and drag on the cloth — nearby points spring to the cursor |
| Slice / tear | Sweep the mouse fast across threads to cut them |
| Pin / unpin | Click the dots along the top edge to toggle fixed anchors |
| Presets | `curtain` / `banner` / `net` / `canvas` — one-click scenes |
| Repair | Toggle on, then drag over torn areas to re-link threads |
| Sound | Toggle the twang-on-snap audio |
| Reset | Restore all sliders and pinning to defaults and re-weave the cloth |

**Sliders:** gravity, stiffness (constraint relaxation iterations), wind strength, tear threshold, and mesh resolution.

Threads also auto-snap on their own when strained past the tear threshold, so cranking gravity or wind high enough will make the fabric rip under its own load.

## Share a setup

Every knob — gravity, stiffness, wind, tear threshold, mesh resolution, mute, and pin mode — serializes into the URL hash and restores on load. Copy the URL to share an exact configuration. Values from the hash are clamped to their valid ranges, so a hand-edited or truncated link degrades gracefully instead of breaking the sim.

## How it works

- **Verlet integration** — each point stores its current and previous position; velocity is implicit in the difference, which makes the sim stable and cheap.
- **Constraint relaxation** — the grid of distance constraints is solved a few times per frame (the stiffness slider controls how many). More iterations means a stiffer, less stretchy cloth.
- **Strain-based tearing** — a constraint's strain is its current length over its rest length. Past the tear threshold it snaps; the same value drives the color ramp.
- **Fixed timestep** — the simulation steps at a fixed 1/60s (with a bounded catch-up), so behavior stays consistent regardless of frame rate.
- **Batched rendering** — threads are bucketed by strain and stroked in a single path per color bucket, with an additive bloom pass only on the hottest near-snapping threads.

## License

MIT — see [LICENSE](LICENSE).
