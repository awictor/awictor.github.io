# Saltation

**Drop a grain, start an avalanche — an Abelian sandpile lab where the dumbest rule builds a crystalline fractal.**

Saltation is a zero-dependency, single-file HTML lab for the Abelian sandpile — the
Bak–Tang–Wiesenfeld model of self-organized criticality. Every cell holds a pile of
grains. The instant a pile reaches the toppling threshold it collapses, kicking one
grain to each neighbor, which can push those neighbors over too, cascading into an
avalanche. From that one trivial rule — *pile too high, spill to neighbors* — with zero
randomness, a self-similar fractal crystallizes on its own.

## Why it's cool

- **Emergence from nothing.** A one-line, fully deterministic rule spontaneously produces
  a perfectly self-similar fractal. It's the purest demo of self-organized criticality.
- **A hidden second fractal.** Slide the morph control and the height field dissolves into
  the *odometer* — a map of how many times each cell toppled. Same pile, entirely
  different fractal.
- **The SOC payoff, live.** The avalanche-size distribution plots as a log–log histogram.
  As you pour, it fills into a straight line — the power law that defines criticality.
- **Reproducible specimens.** Every configuration serializes to a URL hash, so any
  specimen is a shareable, deterministic recipe.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
No build, no dependencies, no network. It boots on the "Classic fountain" specimen,
paused. Press **Play** to grow it.

## Controls

**Pour modes**
- **Center fountain** — auto-drops grains at the center; press Play to grow the iconic pile.
- **Free pour** — click and drag on the canvas to drop grains wherever you like.

**Playback**
- **Play / Pause**, **Step** (advance one frame), **Clear** (empty the field).
- **Fountain rate** — grains dropped per settle in fountain mode.
- **Turbo grow** — stabilize without animating, for fast growth.

**Keyboard**
- `Space` — play / pause
- `S` — step
- `C` — clear

**Lattice & look**
- **Lattice · symmetry** — Von Neumann (threshold 4, 4-fold) or Moore (threshold 8, 8-fold).
- **Palette** — Ember, Ice, Spectral, Mono.
- **Height ⇄ Odometer morph** — cross-fade the height fractal into the topple-count fractal.

**Presets**
- **Dump & stabilize** — drop N grains at the center and settle instantly.
- **Identity element** — compute the sandpile group's identity configuration
  (`stabilize(2·max)` then `2·max − s`, restabilized). It looks nothing like what you'd expect.
- **Specimen gallery** — six curated one-click specimens.

**Share / export**
- **Export PNG** — 2×–4× nearest-neighbor upscale.
- **Copy shareable URL** — encodes the current specimen into the URL hash.

## URL hash format

The hash is a deterministic recipe, e.g. `#v=1&nb=4&pal=0&morph=0.00&dump=40000`:

| Key | Meaning |
|-----|---------|
| `nb` | neighborhood/threshold: `4` (Von Neumann) or `8` (Moore) |
| `pal` | palette index: `0` Ember, `1` Ice, `2` Spectral, `3` Mono |
| `morph` | height↔odometer blend, `0.00`–`1.00` |
| `dump` | grains to drop at center, then stabilize |
| `identity` | if `1`, load the sandpile-group identity instead of a dump |

## How it works

The grid is a capped 141×141 typed-array field. Toppling uses an active-cell queue
(never full-grid scans): a cell at height `h ≥ z` fires `⌊h/z⌋` times at once (the model
is Abelian, so order doesn't matter), distributing grains to in-bounds neighbors; grains
that would leave the grid fall off the open boundary, so stabilization always terminates.
Animation runs on a bounded per-frame topple budget so large avalanches play smoothly
instead of freezing the tab, and heavy synchronous operations (identity, big dumps,
gallery loads) paint a "Computing…" state first.

## License

MIT — see [LICENSE](LICENSE).
