# Sluice

**Watch four rate-limiting algorithms decide the same traffic in real time.**

Sluice feeds one live request stream into four classic limiters at once — **Token Bucket**, **Leaky Bucket**, **Fixed Window Counter**, and **Sliding Window Log** — stacked side by side so their differences pop instantly. Because all four judge the *identical* stream, you can literally watch Fixed Window's boundary double-burst fire while Sliding Window stays smooth, and see Leaky Bucket smear a spike into a steady drip.

Single HTML file. Zero dependencies. Zero build. Nothing hits the network.

## Why it's cool

Rate limiting gets argued about constantly but rarely *seen*. Running one traffic stream through four algorithms simultaneously makes the tradeoffs visceral in seconds — especially the notorious fixed-window boundary double-burst, where twice the limit sails through across a window edge. It reads like a playground and teaches like a lecture, and it fits on one screen.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's it.

(If your browser blocks the clipboard on `file://`, the **Copy link** button falls back to a legacy copy and tells you honestly if it couldn't; everything else works identically from disk.)

## What you're looking at

Four horizontal panels, one per algorithm, sharing a common time axis:

- **State meter** (left) — bucket fill / queue depth / rolling window count, animated live.
- **Timeline strip** — every request is a tick, colored **green (accepted)** or **red (rejected)**.
- **Stats** — accept %, total rejects, and effective throughput per algorithm.
- **Sparkline** — rolling effective throughput with a dashed reference line at the target rate (`N / period`), so smoothing vs. burst-then-starve reads as a curve.
- **Faint verticals** across all four strips mark fixed-window boundaries.

## Controls

| Control | What it does |
| --- | --- |
| **Traffic (req/s)** | Mean rate of the seeded Poisson arrival stream. |
| **Limit N** | Requests allowed per window (Fixed/Sliding) — also sets the Token/Leaky refill/drain rate via `N/period`. |
| **Period (s)** | Window length (Fixed/Sliding) — also part of the `N/period` refill/drain rate. |
| **Capacity** | Bucket size for Token & Leaky Bucket only (burst allowance / queue depth). Fixed/Sliding ignore it. |
| **Seed** | RNG seed — same seed reproduces the exact traffic stream. |
| **Tap** | Fire a single manual request into all four. |
| **Burst** | Hold to spam requests (~40/s). Hold and drag off the button — it keeps firing until you release. |
| **Pause / Step / Reset** | Freeze, advance one 100 ms step, or restart from the seed. |
| **Scenario** | Presets: **Steady** (~0.9× rate), **Bursty** (~1.7× rate), **Thundering Herd** (recurring `2N` spike at each window edge). |
| **Burst at window edge** | Deterministically schedules `N` requests just before and `N` just after the next fixed-window boundary — the reliable way to reproduce the double-burst. |
| **Highlight divergences** | Amber connector + dots wherever the four algorithms disagreed on a request. |
| **◐ Theme** | Toggle light / dark. |
| **Copy link** | Copies a URL encoding the full scenario — seed, N, period, capacity, rps, scenario, theme, and divergence view — so any setup is one paste away. |

Hover any tick to see *why* that algorithm accepted or rejected that request at that instant (e.g. `0.30 tokens < 1`, `8/8 in window #3`).

## Teaching note: Fixed Window vs. Sliding Window

A Fixed Window Counter resets its count at hard clock boundaries. Fire `N` requests just before a boundary and `N` just after and *all `2N` succeed* — twice the intended limit inside a span shorter than one window. That's the fixed-window boundary burst, and it's a real production footgun.

A Sliding Window Log counts requests in the trailing `period` from *now*, with no fixed boundary to exploit, so it holds the true limit across the same edge. Load the demo, hit **Burst at window edge**, and watch the top-third panel (Fixed) light up green on both sides of the faint boundary line while the bottom panel (Sliding) rejects the overflow.

## License

MIT — see [LICENSE](LICENSE).
