# Headway

**Generate a beautiful, believable metro map for a city that never existed.**

Headway is a single-file, zero-dependency procedural transit-map generator. Give it a
seed and it invents an entire fictional city's rapid-transit network — a coastline and
river underneath, a downtown core with radial and orbital lines, branching suburban
tails, interchange hubs and terminus stubs — then draws it as a crisp octilinear
(Beck/Vignelli-style) schematic. Every line gets a colour and a name; every station gets
a plausible name from an invented-but-coherent place-name grammar that drifts between
neighbourhoods. It's deterministic from the seed, fully live-controllable, and exportable
as SVG, PNG, or a framed poster. The whole map state lives in the URL hash, so any map you
make is a shareable link.

## Why it's cool

Diagram-style metro maps are some of the most beloved information design on earth, but
there's no dead-simple, no-build, shareable tool that *generates* convincing ones from
scratch. Headway does the genuinely hard parts in the browser: it lays out a network
topology, snaps every route to 45° octilinear geometry with rounded corners, resolves
parallel-line offsets so co-running lines run side-by-side cleanly, places
tick/interchange/terminus markers, dodges label collisions, and invents names that feel
like they belong to one fictional culture. Hit Randomize and you get a map you'd actually
frame.

## Run it

There is no build step and no server required.

- **Open `index.html`** directly in any modern browser (double-click it, or drag it into a
  tab).

That's it — zero dependencies, zero network calls. If you'd rather serve it (e.g. to test a
shared link on your phone over LAN):

```bash
python3 -m http.server 8000   # then open http://localhost:8000/index.html
```

## Controls

**Seed**
- **Seed field** — type any text; the same seed + preset always draws the identical city.
  Press Enter to apply.
- **🎲 Randomize** — jump to a new random city.
- **Step ▸** — nudge the seed to the next city (increments a trailing number).

**Civic style**
- **Presets** — London, NYC MTA, Moscow Metro, Tokyo, Paris. Each changes the colour
  palette, network geometry (diagonal bias, ring presence, branch rate, line count) *and*
  the naming grammar (NYC uses letter/number lines; the rest use invented place names).
- **Map theme** — Light, Dark, Night.

**Network** (sliders)
- **Lines** — number of transit lines.
- **Density** — how much the network branches and wiggles.
- **City size** — grid extent.
- **Water** — how much coastline and river appears.

**Rendering** (sliders)
- **Corner radius** — rounding on route bends.
- **Label density** — how tightly stations (and their labels) are packed.

**Export & share**
- **SVG** / **PNG** — export the bare map.
- **🖼 Framed poster PNG** / **Poster SVG** — export a print-style poster with a title
  cartouche (city name, preset, seed, date), a legend, a north arrow and a paper texture.
- **🔗 Copy link** — copy the current URL; it encodes the full map state.

**On the map**
- **Drag** to pan, **scroll** to zoom, **double-click** to reset the view.
- **Hover or tap a station** for its name, district, type and lines.
- **Click a line in the legend** to isolate it (dim the rest); click again to clear.
- **↻ Replay** the build animation, **⤢ Fit** to view, **+ / −** to zoom.

Chips, the legend and map tools are keyboard-operable (Tab to focus, Enter/Space to
activate) and the build animation respects `prefers-reduced-motion`. On narrow screens the
control panel becomes an off-canvas drawer toggled by the **☰** button.

## How the generator works

1. **Determinism** — a `mulberry32` PRNG seeded from `seed + preset` drives every random
   choice, so a given seed/preset always reproduces the exact same city, names and colours.
2. **Geography** — a wavy coastline fills one corner and a meandering river crosses the
   sheet, scaled by the Water slider.
3. **Topology** — radial trunk lines fan out through the core, an optional orbital/ring line
   circles it as an octagon, and suburban branch tails split off the trunks.
4. **Octilinear routing** — routes are traced on a grid, so every segment is already 0/45/90°;
   a per-edge bundle solver offsets co-running lines so they sit parallel instead of
   overlapping, and corners are rounded.
5. **Naming** — each district gets a "dialect" (a drifted subset of the preset's onset /
   nucleus / coda / suffix pools); station and line names are coined from it, with
   interchanges and termini named more grandly.
6. **Labels** — a greedy 8-anchor pass places names, skipping any that would collide.
7. **State** — all parameters serialise to the URL hash (base64 JSON), so links are
   reproducible; `history.replaceState` keeps the Back button usable.

## License

MIT — see [LICENSE](LICENSE).
