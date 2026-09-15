# Bellwether

**Draw any distribution. Watch it become a bell.**

Bellwether is a single-file, zero-dependency Central Limit Theorem sandbox. You
sketch an arbitrary parent population by painting a histogram with your mouse,
then Bellwether draws thousands of random samples of size *n*, averages each
one, and grows the *sampling distribution of the mean* in real time below it.
Raise the sample-size slider and watch your jagged, bimodal, or wildly skewed
hand-drawn shape collapse into a smooth Gaussian.

## Why it's cool

The Central Limit Theorem is famous, deeply counterintuitive, and almost never
shown interactively with a distribution *you* drew by hand. The payoff: drag a
violent bimodal spike-fest, crank *n*, and watch the sample means still snap
into a clean bell. The theoretical normal curve `N(mu, sigma/sqrt(n))` is
overlaid straight from the parent's exact moments, and live skewness /
excess-kurtosis readouts march toward zero as proof. It's all honest math —
real inverse-CDF sampling, real moments, a real theoretical overlay — not a
canned animation.

## Run it

Open `index.html` in any modern browser — double-click it, or File > Open.
There is no build step, no install, and no network access. It runs entirely
from `file://`.

## Controls

**Parent population (top canvas)**
- **Drag to paint** — raise or lower the bar under the cursor; a continuous
  drag paints a continuous curve.
- **Presets** — Uniform, Bimodal, Exponential, Dirac spike, U-shaped.

**Sampling**
- **Sample size n (1–64)** — values drawn per trial. Raise it to watch the
  bell tighten and straighten.
- **Speed** — trials computed per animation frame.
- **Seed** — seeds the PRNG so a run is exactly reproducible.
- **Reset** — clear the accumulated means and start over.
- **Sweep n 1→64** — auto-walks *n* upward so you can watch the bell emerge.
- **Copy shareable link** — writes the current state to the URL and copies it.

**Compare**
- **Freeze A / Freeze B** — capture the current curve as an outline. Change
  *n*, freeze again, and compare how `sigma/sqrt(n)` narrows. Frozen slots show
  their captured *n* on the button.
- **Clear A/B** — remove both snapshots.

## Reading the panels

- **Sampling distribution** — blue bars are the empirical density of the sample
  means over [0, 1]; the orange curve is the theoretical `N(mu, sigma/sqrt(n))`;
  the cyan dashed line is the running empirical mean.
- **Normal QQ plot** — standardized means vs. normal quantiles. It straightens
  onto the diagonal as the distribution becomes normal.
- **Convergence meter** — scores closeness to a bell from
  `|skewness| + |excess kurtosis|`, shifting color as it approaches 100%.
- **Stat tiles** — parent mean/sd, empirical mean/sd of the means, the
  predicted `sigma/sqrt(n)`, and the running skewness and excess kurtosis.

## Sharing / URL hash format

Full state serializes to the URL hash so a link reproduces the exact
experiment:

```
#s=<seed>&n=<sample size>&d=<RLE-encoded parent shape>
```

`d` is a run-length encoding of the 48 bin heights, each quantized to a base-36
digit (0–35) as `<run><value>` pairs — which keeps shared links short.

## How it works

- **PRNG** — `mulberry32`, seeded, for reproducible runs.
- **Sampling** — the painted bins become a CDF; each sample value is drawn by
  inverse-CDF lookup (binary search + linear interpolation within a bin).
- **Moments** — parent mean/sd are computed exactly from the bins; the means'
  mean/sd/skewness/kurtosis are accumulated online from running power sums.
- **Rendering** — a `requestAnimationFrame` loop runs a batch of trials each
  frame and redraws all three panels.

## License

MIT — see [LICENSE](LICENSE).
