# Meanwhile

**A coin flip that pays off on average and ruins you in particular.**

Meanwhile is a single-screen, zero-dependency canvas explainer for the *ergodicity trap*: the gap between the **ensemble average** (what happens across many people at once) and the **time average** (what happens to you over many rounds).

You play a multiplicative coin game. Heads multiplies your wealth by `1 + gain`, tails by `1 - loss`, 50/50 each round. With the default **+50% / −40%**, every flip has a clearly *positive* expected value (the mean grows ~5%/round) — yet almost every individual player is driven toward zero, because the geometric growth rate is *negative* (~−5.1%/round).

Both truths are on one canvas at once: a spaghetti of player wealth trajectories, a bold rising **ensemble-mean** curve, and a bold falling **median** curve. The paradox is visible in a single glance.

## Why it's cool

"Positive expected value" is a belief almost everyone trusts, and Meanwhile refutes it interactively in about five seconds — you literally watch the average climb while the typical player sinks. It's the intuition behind Kelly bet sizing, risk of ruin, and why naive averages lie under compounding. No libraries, no build step, one honest HTML file.

## Run it

Open `index.html` in any modern browser — double-click it, or use a `file://` URL. That's it. No server, no build, no dependencies.

To share a specific configuration, copy the URL — the full state lives in the hash, e.g.:

```
index.html#g=50&l=40&r=100&n=200&s=12345&log=1&kelly=1&f=250
```

## Features

- **Live simulation** — N players over T rounds with a seeded RNG (mulberry32), drawn as translucent wealth trajectories on a log/linear canvas.
- **The ergodicity gap, in one frame** — the ensemble **mean** (rises) and the **median** (falls) overlaid, with the divergence region shaded between the analytic mean and geometric-growth reference lines.
- **Per-flip math panel** — contrasts arithmetic EV (`½·(1+gain) + ½·(1−loss) − 1`) against the geometric/time-average growth rate (`√((1+gain)(1−loss)) − 1`), color-coded green vs red.
- **What actually happens** — % of players below their starting stake, % wiped out, rounds until the median halves, and the Kelly-optimal fraction f*.
- **Kelly panel** — a growth-rate-vs-bet-fraction curve (green above zero, red below). Drag (or focus + arrow keys) to move the bet fraction and watch full-stake betting sit on the losing side of the peak. When the game has no edge, f* is 0 and the Kelly bundle correctly disappears ("do not play").
- **Run 1000** — a large silent batch that reports the full ruin distribution as an inset histogram without cluttering the main canvas.
- **Autoplay + scrub** — animate the ensemble growing one round at a time, or scrub to any round. Respects `prefers-reduced-motion` (jumps to the final frame instead of animating).
- **Hover to spotlight** — follow a single gambler's path with running wealth, heads/tails tally, and max drawdown. Works with mouse, touch, and pen.
- **Shareable state in the URL** — gain, loss, rounds, players, seed, view toggles, and bet fraction all round-trip through the hash, so any "aha" configuration can be linked directly. The URL updates in place (no Back-button pollution).
- **Responsive** — stacks to a single scrollable column on narrow/mobile screens.

## Controls

| Control | What it does |
|---|---|
| Heads: gain / Tails: loss | Payoff multipliers per flip |
| Rounds | Number of flips per player |
| Players | Size of the visible ensemble (up to 300, ~200 paths drawn) |
| ▶ Play / scrub | Animate or seek through the timeline |
| log y | Toggle log vs linear vertical axis |
| Kelly bundle | Show/hide the bet-f* trajectory bundle |
| Run 1000 | Run a 1000-player batch and show the ruin histogram |
| new seed | Re-roll the RNG seed |
| Kelly curve | Drag, or focus + arrow keys, to set the bet fraction |
| Presets | Jump to `+50/−40`, a fair-ish coin, or a casino edge |

## The math

- **Arithmetic EV per round** — `½·gain − ½·loss`. Positive at +50/−40 (+5%).
- **Geometric (time-average) growth per round** — `√((1+gain)(1−loss)) − 1`. Negative at +50/−40 (−5.1%).
- **Kelly-optimal fraction** — `f* = (gain − loss) / (2·gain·loss)`, clamped to `[0, 1/loss)`. Betting f* of your stake maximizes long-run growth; f=1 (all-in) overshoots the peak into negative growth.

## Read more

- Ole Peters, *ergodicity economics* — the ensemble-vs-time-average distinction.
- The Kelly criterion — growth-optimal bet sizing and risk of ruin.

## License

MIT — see [LICENSE](LICENSE).
