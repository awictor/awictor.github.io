# Keywell

**Settle the QWERTY-vs-Dvorak argument with your own words.**

Keywell is a single-file, zero-dependency typing-effort analyzer and keyboard-layout duel. Paste any text and it scores that exact text across seven layouts at once, then ranks them by how much work your fingers would actually do.

## Why it's cool

Layout debates are usually argued with someone else's benchmark corpus. Keywell makes the argument personal: it analyzes *your* text — the code, prose, or gibberish you actually type — and shows, with a live heatmap and an animated leaderboard, which layout costs your fingers the least. No corpus, no build step, no network. One HTML file you double-click.

## Features

- **Seven layouts scored at once** — QWERTY, Dvorak, Colemak, Workman, Halmak, Norman, plus an editable **Custom** sandbox.
- **Duel leaderboard** — every layout ranked by composite effort for your text. The winner (least effort) fills its bar; the row you're inspecting is highlighted so the chart and the detail panels stay linked.
- **Live keyboard heatmap** — key color intensity scales with press frequency and eases toward its new state as you type; pressed keys pulse in real time.
- **Bigram arcs** — arcs trace your most frequent letter pairs across the keyboard, with same-finger bigrams (the painful ones) drawn in red.
- **Metrics panel** — effort/char, total finger travel, SFB %, hand-alternation %, row jumps, and busiest finger, each tagged with which direction is good.
- **Per-finger load** — a bar chart across the eight typing fingers, flagging pinky overload.
- **Worst offenders** — the five costliest letter pairs for the current layout, with SFBs called out.
- **Custom sandbox** — click any two keys to swap them and instantly re-score every panel.
- **Sample presets** — pangram, prose, and code, for instant comparison.
- **Shareable links** — full state (your text, selected layout, and any custom swaps) round-trips through the URL hash; hit *Copy share link*.

## Run it

No install, no server, no build:

1. Open `index.html` in any modern browser (double-click it, or drag it into a tab).
2. Type or paste text, or click a preset.

That's it. Everything runs locally in the page.

> Note: when opened from `file://`, some browsers block the async clipboard API. Keywell falls back to a manual copy and, if even that is blocked, tells you to copy the URL from the address bar — it never claims a copy that didn't happen.

## Controls

- **Text box** — type or paste; analysis is debounced (~120ms) so large pastes stay responsive.
- **Pangram / Prose / Code** — load a sample; the active sample stays highlighted until you edit the text.
- **Layout tabs** — pick which layout the keyboard, metrics, and offenders panels inspect.
- **Custom tab** — click one key, then another, to swap them and re-score.
- **Copy share link** — writes the current state to your clipboard as a URL.

## How the effort model works

Keywell is a **self-consistent heuristic**, not a claim of exact keystroke science. Each layout is a coordinate map of `(x, y, finger, hand)` per key with home-row rest positions. For every keystroke it adds the Euclidean travel distance from that finger's home key, then applies penalties for same-finger bigrams and multi-row jumps. The composite effort score is:

```
composite = travel + 2·(same-finger bigrams) + (row jumps) + 0.5·(shifted keys)
```

Characters outside the 30 mapped keys (spaces, digits, most punctuation) are skipped and break the current bigram. The numbers are meaningful *relative to each other* within Keywell — they're designed to rank layouts on your text, not to match any external SFB tool exactly.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
