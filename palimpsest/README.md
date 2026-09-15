# Palimpsest

**A typing game where you race the translucent ghosts of your own past runs.**

Most typing trainers give you an abstract WPM number and leave it at that. Palimpsest layers every attempt over the recorded ghosts of your previous runs on the *exact same text* — so you watch a shimmering caret of your past self scroll ahead of or behind you, keystroke for keystroke, in real time. Beat the ghost and it fades. Lose and it haunts the next run.

Because the text is seed-deterministic, a given seed always generates byte-identical passages. That means a share link lets a friend race the identical text — and optionally your actual recorded ghost — with zero backend. It's the layered-manuscript idea applied to typing: each run written over the faint traces of the last.

## Why it's cool

- **Ghost racing.** Your keystroke timeline (char index + ms) is recorded every run. The fastest run per seed is stored locally and replayed as a translucent caret you race live. A real shadow of your past self is far more motivating than a static PB.
- **Deterministic text.** A small seeded PRNG plus curated word banks / code snippets turn any seed into identical passages, so ghosts and shared links always line up.
- **Async competition, no server.** Share links encode the seed, difficulty, your result, and (when it fits) a compressed copy of your ghost. Your friend races your exact passage and shadow. Everything is offline and in one file.

## Features

- Live **net & raw WPM**, **accuracy**, **progress**, and a **vs-ghost gap** readout
- Real-time **WPM-over-time sparkline** with error positions marked, drawn on canvas
- Per-character color feedback, a **combo multiplier** with particle bursts and subtle screen shake on clean streaks
- Difficulty modes: **Easy** (common words, forgiving), **Normal**, **Hard** (capitals + punctuation + rare words), **Code** (real snippets), plus a no-backspace **Sudden Death** toggle
- **Local best-scores board** per seed + difficulty
- Post-run **replay scrubber** that scrubs both your run and the ghost together
- **Shareable URL** carrying seed + difficulty + result summary and an optional compressed ghost, with graceful fallback to seed-only if the ghost would make the link too long

## Run it

It's a single static HTML file with **no dependencies and no build step.**

- Double-click `index.html`, or
- Serve the folder and open it:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Works fully offline. Any modern browser (Chrome, Firefox, Safari, Edge).

## How to play

1. Pick a **difficulty** and optionally toggle **Sudden Death**.
2. Enter a **seed** (or hit 🎲 for a random one) and choose how many words.
3. Press **Start run**. Start typing — the timer begins on your first keystroke.
4. The **orange caret** is you; the **purple caret** is your best past run on this seed. Beat it to make it fade.
5. On the results screen, scrub the **replay** to watch both runs side by side, or copy a **share link** (with ghost) so a friend can race your exact passage.

### Controls

| Key | Action |
|-----|--------|
| Any character | Type the current character |
| `Backspace` | Correct a mistake (disabled in Sudden Death) |
| `Enter` | Newline in Code mode |
| `Esc` or **← menu** | Bail out to the menu |

## Where your data lives

Ghosts and best scores are stored in this browser's `localStorage`, keyed by seed + difficulty. Nothing is uploaded. Clearing site data resets your ghosts. A format version tag is baked into stored ghosts and share links so future word-bank tweaks won't silently invalidate old runs.

## License

MIT — see [LICENSE](LICENSE).
