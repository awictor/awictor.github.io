# Clatterboard

A split-flap departure board you can type on, in the browser.

Clatterboard is a single-file, zero-dependency simulation of a Solari split-flap
display — the mechanical airport/train-station boards where each character is a
stack of hinged flaps that clatter through the alphabet until they land on the
right letter. Type a message, run a live clock, or let it play a fake departures
board; every column independently rolls through its glyph sequence, the top flap
folding down over the bottom in perspective, snapping into place one tick at a
time.

## Why it's cool

Everyone knows the sight and sound of a split-flap board and almost nobody has
one. The whole project is one small idea done with care: the flap physics. Each
cell folds a top flap down over a stationary bottom half (vertical scale about
the center hinge), with a seam shadow, edge-on darkening, a specular sheen, a
free-edge drop shadow, and an ease-out overshoot on the final flap. Rolls stagger
left-to-right, fast multi-step rolls get a touch of motion blur, and a synthesized
WebAudio "clack" fires per landing so a full-board change reads as a cascade. The
entire board state lives in the URL hash, so any board is a link.

## Run it

Open `index.html` in any modern browser — double-click it or drag it into a tab.
No server, build step, install, or network access required.

If you prefer to serve it (e.g. to test share links over `http://`):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## Controls & usage

- **Type on it.** Click the board once (this also unlocks audio), then just type.
  Backspace deletes. Each column computes the shortest forward roll to its target
  glyph. (Typing works in *Message* mode.)
- **Message** — the text field sets the board; wraps across rows.
- **Clock** — live `HH:MM:SS`; only the digits that change re-flip each second.
- **Countdown** — the Message field becomes a `M:SS` duration (e.g. `5:00`). The
  board counts down and flashes `TIME UP` at zero. Editing the field re-arms the
  timer live.
- **Departures** — a self-shuffling destination / time / gate / status board.
- **Marquee** — scrolls the Message text across the board.
- **Theme** — Vintage Amber, Station Black, or Modern White.
- **Characters** — full set (A–Z, 0–9, symbols), alphanumeric, or letters only.
- **Columns / Rows / Flap speed** — sliders; the board resizes responsively.
- **Clack sound** — toggle the synthesized tick (volume scales with speed).
- **Copy share link** — copies a URL whose hash encodes the full board state
  (message, mode, dimensions, speed, theme, charset, sound) so a link reproduces
  the exact board.
- **Save PNG** — exports the board framed in its case bezel and vignette.
- **Scramble** — sends every cell rolling to a random glyph.

## How it works

Everything is in `index.html`: a `<canvas>` grid of flap cells, a `Cell`-style
record per column (current index, target index, fold progress, per-cell timer),
the flap renderer that draws the top/bottom halves plus the folding flap, a
roll scheduler with staggered timing, the five mode generators, and the hash
encode/decode. It's DPR-aware so it stays crisp on high-density displays. Canvas
`filter` blur is feature-detected and skipped where unsupported (older Safari),
degrading gracefully.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
