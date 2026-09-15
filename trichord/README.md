# Trichord

**One question, three correct answers — the paradox of a "random" chord.**

Trichord is a single-file, zero-dependency canvas explainer for **Bertrand's Paradox**:
the unsettling fact that "pick a random chord of a circle" has no single well-defined answer.

It asks one crisp question:

> Pick a random chord of a circle. What is the probability it is **longer than the side
> of the inscribed equilateral triangle** (i.e. length > r√3)?

Then it watches three equally valid ways of choosing a "random" chord converge, live, to
**three different probabilities — 1/3, 1/2, and 1/4.**

## Why it's cool

"At random" sounds precise. It isn't. The answer to this one question depends entirely on
an unstated choice of *how* you sample — the measure, not the geometry. Trichord makes that
visceral: chords rain onto the circle in real time, color-coded long vs short against the
triangle threshold, and the running estimate for each method ticks toward its own limit
while a per-method chord-length histogram shows *why* the distributions differ. No trick —
every method is internally consistent. That's the whole point.

## The three methods

| # | Method | How a chord is chosen | Converges to |
|---|--------|-----------------------|--------------|
| 1 | **Endpoints** | Two independent random points on the circumference | **1/3** |
| 2 | **Radial** | A random radius, then a random point along it as the chord midpoint | **1/2** |
| 3 | **Midpoint** | A point uniform in the disk as the chord midpoint | **1/4** |

A chord is "long" (> r√3) exactly when its midpoint lies within **r/2** of the center — the
dashed threshold ring drawn inside each circle.

## Features

- **Three sampling methods**, switchable individually or shown **side-by-side** in Compare mode, all driven by one shared simulation tick.
- **Live Monte-Carlo animation** — chords accumulate on the circle, gold (long) vs slate (short), with the inscribed triangle and r/2 threshold ring as reference.
- **Convergence chart** — running estimate per method on a log-x axis, easing toward its dashed theoretical limit.
- **Per-method chord-length histogram** on shared axes with a √3 marker, showing why identical questions yield different answers.
- **Reveal the measure** — toggle a chord-midpoint density heatmap per method (edge-biased vs center-concentrated vs uniform-in-disk).
- **Self-verification** — the live estimate turns green with a ✓ once it lands within 0.02 of the exact value (after 300+ samples).
- **Seeded PRNG** (mulberry32) for fully reproducible runs.
- **Shareable URL hash** — method, seed, sample count, speed, and reveal state are encoded in the hash and replayed deterministically on load.

## Run it

No build, no dependencies, no network.

- **Double-click `index.html`**, or drag it into any modern browser tab.

That's it. It starts running immediately.

## Controls

| Control | What it does |
|---------|--------------|
| **1 · Endpoints / 2 · Radial / 3 · Midpoint** | Show a single method |
| **Compare all** | Show all three circles side by side |
| **Reveal the measure** | Toggle the chord-midpoint density heatmap (label flips to "Hide measure") |
| **speed** | Samples drawn per animation tick (1–500); live readout shown |
| **⏸ Pause / ▶ Run** | Pause or resume the simulation |
| **+1k / +10k** | Draw a burst of samples instantly |
| **Clear** | Reset counts and restart from the current seed |
| **seed** | Set the PRNG seed for a reproducible run |
| **Share run** | Copy a URL that reproduces the exact current state |

## License

MIT — see [LICENSE](LICENSE).
