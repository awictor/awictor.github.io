# Cistern

**Watch a fixed tank sample an infinite stream, perfectly fairly — reservoir sampling you can feel.**

Cistern is a single-file, zero-dependency canvas explainer for **reservoir sampling** (Knuth's Algorithm R): the streaming trick that picks *k* uniformly-random items from a stream of unknown, unbounded length using O(*k*) memory.

## Why it's cool

Reservoir sampling is one of those algorithms every backend dev has read about and few truly believe: the claim that a late-arriving item has the *same* survival odds as the very first one feels wrong. Cistern turns that skepticism into a button press.

Items flow down a conveyor one at a time. A fixed bank of *k* "cistern" slots holds the current sample. As item *i* arrives, Cistern rolls a seeded die live — with probability *k/i* it splashes into a random slot (evicting the resident), otherwise it drains away. Then you hit **Run trials** to replay the whole stream thousands of times and watch the per-position survival histogram flatten to exactly *k/n*, no matter where each item appeared in the stream. A live chi-square / max-deviation readout quantifies how flat it has become.

It answers a real, load-bearing engineering question — *"how do I sample a log firehose fairly without buffering it all?"* — and proves the answer in front of you instead of asserting it.

## Features

- **Live single-item animation** of Algorithm R: each incoming item shows its acceptance probability *k/i*, a seeded dice roll, and either a splash (accept + evict) or a drain.
- **Run trials** replays the entire stream thousands of times headlessly, in `requestAnimationFrame`-chunked batches, accumulating a per-position survival histogram (auto-binned to ≤60 bins so it stays readable at large *n*).
- **Uniformity proof panel** — empirical inclusion frequency per stream position vs the theoretical line, plus a live chi-square / max-deviation statistic that shrinks as trials accumulate.
- **Click (or arrow-key) a histogram bar** to track one stream position and watch its convergence curve approach the theoretical line.
- **Weighted (A-Res) mode** — swaps in exponential-jump weighted sampling and the corresponding weight-proportional reference line.
- **Side-by-side biased sampler** (in uniform mode) rendered against Algorithm R, so correctness reads as a visual contrast.
- **Hover readout** on the histogram: guideline + per-bin correct/biased/theoretical frequencies.
- **Seeded RNG** (mulberry32) for reproducibility; full state (*n*, *k*, speed, seed, mode, tracked position) is encoded in the URL hash for shareable links.
- **CSV export** of the histogram, and a **Share** button that copies a reproducing URL.
- Only animates while something is moving (idle CPU stays at zero), and honors `prefers-reduced-motion`.

## Run it

No build, no dependencies, no network. Just open the file:

```
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

Or drag `index.html` into any modern browser tab.

## Controls

**Mouse**

| Action | How |
|---|---|
| Play / pause the stream | **Play** button |
| Advance one item | **Step ›** |
| Reset the stream | **↺ Reset stream** |
| Adjust *n*, *k*, speed | sliders |
| Set the RNG seed | Seed field |
| Run *N* replays | **Run trials** (set count in "Trials / run") |
| Track a stream position | click any histogram bar |
| Read exact per-bin values | hover the histogram |
| Switch sampler | **Uniform (Alg R)** / **Weighted (A-Res)** |
| Export / share | **Export CSV** / **Share link** |

**Keyboard**

| Key | Action |
|---|---|
| `Space` | Play / pause |
| `→` or `S` | Step |
| `R` | Reset |
| `←` / `→` (histogram focused) | Move the tracked position |
| `Enter` (histogram focused) | Track the center position |

## How the math checks out

- **Uniform mode**: every position converges to *k/n*, independent of arrival order — that order-independence is the whole point.
- **Biased sampler** (uniform mode only): a naive "fixed-accept + random-evict" sampler that skews toward recent items, shown as the orange bars so the contrast is visible.
- **Weighted mode**: uses the A-Res exponential-jump keys; the reference is the standard first-order weight-proportional approximation (labeled as such in the panel), so its chi-square plateaus slightly above the uniform case while max-deviation stays tiny.

## License

MIT — see [LICENSE](LICENSE).
