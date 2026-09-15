# Chainbloom

**One click. One expanding bloom. A whole cascade of light and sound.**

A single-screen chain-reaction arcade toy in one HTML file. You get exactly one
detonation per round: click anywhere to plant a bloom — an expanding-then-fading
ring. Any drifting dot the ring touches ignites its own bloom, which can catch
more dots, cascading outward across a dark neon field.

## Why it's cool

Every pop plays a WebAudio chime pitched by its depth in the chain (minor
pentatonic, rising through octaves), so a long cascade literally performs an
ascending arpeggio — the reward is audiovisual, not just a number going up.
Boards are fully determined by a seed in the URL hash, so any layout is a
reproducible, shareable puzzle: copy the link and challenge someone to *beat
your board*. Zero dependencies, zero build, zero network calls — one file.

## Features

- **One detonation per round** — timing and placement are the whole skill.
- **Chain propagation** — any dot an active bloom overlaps ignites recursively.
- **Musical cascades** — each pop's pitch rises with chain depth over a quiet
  ambient drone, fed through a feedback delay.
- **Special dots** — `✸` bomb (oversized bloom), `◈` prism (splits into child
  blooms), `◐` slow-mo (eases the drift). A legend shows on the start screen.
- **Seeded, shareable boards** — mulberry32 PRNG; the seed lives in the URL hash.
- **Round progression** — hit the target chain length to advance; best score per
  board is saved to `localStorage`.
- **Share card** — end-of-round combo count-up, an animated ghost-replay of the
  cascade path, copy-link, and a downloadable PNG snapshot.
- **Accessible-minded** — honors `prefers-reduced-motion` (drops screen shake,
  dampens pulsing) and leaves pinch-zoom enabled.

## Run it

No build, no dependencies.

- **Double-click `index.html`**, or open it in any modern browser.
- Audio starts on your first click (browsers require a user gesture).

To share a link that works for *other people*, serve the folder over HTTP
instead of `file://` (a `file:///…` link only resolves on your own machine):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static host works too.

## Controls

- **Click / tap anywhere** — detonate your one bloom for the round.
- **New seed** — jump to a fresh random board.
- **Share** — copy the current board's link to the clipboard.
- On the round-result card: **Copy board link**, **Download snapshot** (PNG),
  and **Next round / Retry board**.

## How it works

The board (dot count, positions, drift, and special-dot placement) is derived
deterministically from the seed plus the round number, so the same link always
produces the same puzzle. The seed is base-36 encoded in `location.hash`.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
