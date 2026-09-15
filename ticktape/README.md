# Ticktape

**A tiny Turing-machine studio where you watch computation crawl across an infinite tape.**

Ticktape is a single HTML file — no build, no server, no dependencies. Open it and you get a live Turing-machine playground: edit a state-transition table, hit play, and watch an animated read/write head crawl across an infinite tape while an auto-drawn state diagram lights up the exact rule firing on every tick.

## Why it's cool

Busy Beaver machines are catnip for anyone who likes computation theory. BB(5) runs **47,176,870 steps** before it halts — and Ticktape lets you press one button and actually watch that happen, then see the iconic space-time fractal it traces out. It turns abstract CS-theory landmarks into something you can play with, scrub backward, and share as a single link.

## Features

- **Infinite scrolling tape** with a springy animated read/write head that snaps cell-to-cell as it steps. Only visible cells render, so the tape is effectively unbounded.
- **Live transition-table editor** — `(state, read) → write, move, next` with instant validation, inline red highlighting for bad rules, and add/rename/delete state and add-symbol controls.
- **Auto-laid-out state diagram** (nodes = states, edges = transitions) that highlights the active state and the exact rule firing on each tick. Named halt states (e.g. the palindrome checker's **Y**/**N**) get their own nodes.
- **Full transport controls** — step, back, play, pause, and a log-scale speed slider from slow-motion teaching pace up to thousands of steps/sec.
- **Reversible execution** — a capped history stack lets you scrub backward through a run to see how a value was built.
- **Turbo "Run to halt"** — a background Web Worker with packed typed-array tables runs millions of steps/sec without freezing the UI, with a repeated-configuration heuristic for fast "diverged" verdicts.
- **Space-time trace heatmap** — head position over time, colored by state, bright where a `1` was written. This is what produces the famous Busy Beaver imagery.
- **Live readout** — steps, ones on tape, states visited, head, current state, and a halted / diverged verdict, plus a Busy Beaver champion-record comparison.
- **Shareable URL hash** — the full program, initial tape, and speed encode into the URL. Any link reproduces the exact machine and lets others fork it.
- **Gallery of classic machines** loadable in one click (or number keys 1–8).
- **Optional WebM recording** of the tape + pulsing state graph, and optional synced audio ticks. Light / dark theme that honors your OS preference and is remembered across reloads.

## Run it

Open `index.html` in any modern browser:

- Double-click the file, or
- `start index.html` (Windows) / `open index.html` (macOS) / `xdg-open index.html` (Linux)

That's it — no install step.

> Note: the Turbo run and WebM recording use a Web Worker and `captureStream`. These work best over `http://` (e.g. `python -m http.server`). Under `file://`, some browsers block Blob-URL workers; if Turbo is unavailable Ticktape tells you and everything else still works.

## Controls

| Key | Action |
|-----|--------|
| `space` | play / pause |
| `→` / `←` | step forward / backward |
| `↑` / `↓` | speed up / slow down |
| `R` | reset to step 0 |
| `T` | run to halt (Turbo) |
| `M` | toggle audio ticks |
| `1`–`8` | load gallery machine |

Top-bar buttons cover **Share / Fork** (copy the link), **Record**, **Sound**, and **Theme**.

## Reading the transition table

Each cell is a rule for a given `(state, read symbol)`, written as three characters: **write · move · next**.

- `1RB` = write `1`, move **R**ight, go to state **B**
- `0LA` = write `0`, move **L**eft, go to state **A**
- `H` as the next-state is the halt state; a named target that isn't a defined state (like `Y` or `N`) also halts, but keeps its name so you can tell outcomes apart.
- An **empty cell** means "no rule" — the machine halts.

## Gallery

- **Binary increment** — add 1 to a binary number
- **Unary addition** — `111 0 11 → 11111`
- **Palindrome check** — accept (`Y`) / reject (`N`)
- **Copy (unary)** — `1110 → 1110111`
- **Busy Beaver BB(2)** — halts: 6 steps, 4 ones
- **Busy Beaver BB(3)** — halts: 14 steps, 6 ones
- **Busy Beaver BB(4)** — halts: 107 steps, 13 ones
- **Busy Beaver BB(5)** — halts: 47,176,870 steps, 4098 ones

## Sharing format

The machine is serialized as base64-encoded JSON in the URL hash: the transition table, blank symbol, start state, initial tape, and speed. Copy the link (or the **Share / Fork** button) and anyone who opens it gets your exact machine, ready to run or edit.

## License

MIT — see [LICENSE](LICENSE).
