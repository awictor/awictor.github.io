# Tumbrel

**Draw a path, watch it fall.** A domino-run designer you knock over — in one HTML file, zero dependencies.

Drag to draw any freeform curve. Tumbrel stands a row of dominoes along it at even
arc-length spacing, each tile facing perpendicular to the path. Tap the first tile (or hit
Space) and a real toppling wave cascades down the run: every domino rotates under gravity,
and the instant its falling top edge reaches its neighbor's base, that neighbor kicks off.

## Why it's cool

The trigger rule is genuinely physical. A domino tips its neighbor **only when its falling
tip actually reaches it** — so spacing is a real design variable, not a cosmetic slider. Pack
tiles tight for a fast ripple; spread them out and watch the chain dramatically stall
mid-run. The same reach rule drives cross-run hand-off too, so a single tap can fork into
several cascades where runs cross. Draw a spiral, share it as a URL, and it replays on tap
for whoever opens the link.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.

No build, no install, no server, no network. It's a single self-contained file.

## Controls

- **Drag** on the canvas to draw a run. Draw as many separate runs as you like.
- **Tap** any standing tile to start a cascade from that spot.
- **Topple** button / **Space** — topple the lead of every run at once.
- **Reset** button / **R** — stand all tiles back up.
- **Undo** — remove the last stroke, or restore a drawing replaced by Clear / a Gallery preset.
- **Clear** — remove everything (undoable).
- **Gallery** — load a curated preset (spiral, heart, switchback maze, letters "HI") and auto-topple.
- **Share** — copy a link that rebuilds the exact layout. The layout also lives in the URL hash.
- **Mute** — toggle the wooden click / payoff chime.
- **Spacing / Height / Speed** sliders — tune the run live; the topple physics respond immediately.

## Spacing matters

Because a tile only triggers its neighbor when its falling tip reaches it, the reach is a
function of tile height and lean angle. If **spacing exceeds what a falling tile can reach**,
the chain stops there. That's not a bug — it's the whole game. Tight spacing = fast reliable
ripple; wide spacing = suspense and stalls.

## Share links

The layout is encoded into the URL hash as base-36 delta-coded points, so links stay short.
Loading a page with a hash rebuilds the run exactly. Example (a zigzag run):

```
index.html#d1_q.10.1.4.8c.b4.5k.-2s.5k.46.5k.-3m
```

Open `index.html` with that hash appended and the same run appears, ready to topple.

## Tech

Vanilla JavaScript, HTML5 canvas, and WebAudio — no frameworks, no build step. Path capture,
arc-length resampling, a `requestAnimationFrame` angular-toppling physics loop, canvas
rendering with drop shadows and a per-run hue gradient, a small click/chime synth, and
compact URL-hash encode/decode. About 260 lines total.

## License

MIT — see [LICENSE](LICENSE).
