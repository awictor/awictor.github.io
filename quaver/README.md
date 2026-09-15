# Quaver

**Scatter sand on a singing plate and watch it flee to the silence.**

Quaver is a single-screen [Chladni](https://en.wikipedia.org/wiki/Ernst_Chladni#Chladni_figures)
cymatics toy. A square steel plate vibrates at a chosen mode; thousands of sand grains
get shaken off the antinodes and pile up along the nodal lines — the still curves where the
plate isn't moving — self-organizing into the iconic, eerily symmetric Chladni figures.

Tune the mode live and the sand doesn't jump to the new pattern: it flows, breaks apart, and
re-settles, so the whole surface breathes between figures. Zero config, zero deps, one HTML
file, and every pattern is a shareable URL.

## Why it's cool

Chladni plates are a jaw-dropping physics demo people usually only see in slow-mo videos.
Here it's live and tunable — sweep frequencies and watch ~4,000 grains reorganize themselves
into new figures in real time. Genuinely educational, and eminently GIF-able.

## The physics (in two lines)

Each grain descends the gradient of the plate's squared displacement field
`u(x,y) = cos(nπx)cos(mπy) − cos(mπx)cos(nπy)`, so it slides toward the nodal lines (`u = 0`).
Jitter is scaled by the local amplitude `|u|`, so grains on antinodes shake loose while grains
on nodes lock into crisp dark curves.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. No build
step, no dependencies, no network access. That's the whole app.

## Controls

| Input | Action |
|---|---|
| `←` `→` | change **m** |
| `↑` `↓` | change **n** |
| drag / tap the plate | tune (m, n) directly |
| `Space` | re-scatter the sand |
| `S` | toggle hands-free sweep |
| `A` | hear the plate sing (audio) |
| `N` | toggle the nodal answer-key overlay |
| `C` | cycle color palettes |
| `P` | save a PNG |
| `R` | record a WebM (falls back to PNG where WebM isn't supported) |

Every dock control has an equivalent button, and the preset strip holds eight famous modes.

## Shareable snapshots

The full state (mode, grain count, seed, palette) lives in the URL hash, so any figure is a link:

- `#m=5&n=4&c=4000&s=7&p=0` — the default
- `#m=6&n=7&c=5000&s=3&p=1` — dense figure, ember palette
- `#m=3&n=7&c=4000&s=12&p=2` — ocean palette

Hash params: `m`,`n` (1–12), `c` grain count (500–6000), `s` seed, `p` palette (0–2).

## License

MIT © Alex Wictor
