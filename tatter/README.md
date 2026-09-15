# Tatter

**A Verlet cloth you can pin, gust, grab, and slice to shreds — one file, zero dependencies.**

Tatter is a single-screen cloth-physics sandbox. A grid of point masses linked by
distance constraints hangs from pinned nodes and settles under gravity via Verlet
integration. Grab and fling handfuls of fabric, drag a scissors cursor to cut threads
and watch the sheet rip open, toggle pins to change how it drapes, and blow adjustable
wind (with a spacebar gust) to make a flag ripple. Over-stretched threads snap on their
own, so heavy dragging or a dropped weight tears realistic gashes.

## Why it's cool

- **It's a real toy, not a static demo.** Slice with true segment intersection, drop a
  heavy ball that sags the cloth then punches through, flick a fistful of fabric and
  watch it carry momentum.
- **The cloth is a live stress map.** Toggle the heatmap and every thread is colored by
  strain — cool where it's slack, hot where it's taut — so you can *see* where it's about
  to tear.
- **Every configuration is a link.** Grid size, pin pattern, wind, gravity, tear
  tolerance, and preset all live in the URL hash, so any setup you build is a shareable
  URL. Reload restores it exactly.
- **One file you can read end to end.** No build step, no framework, no `node_modules` —
  just `index.html` (canvas + a few hundred lines of vanilla JS).

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab.
That's the whole setup. No server, no build, no dependencies.

To serve it over HTTP instead (optional):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls

**Tools** (pick one from the top bar):

| Tool | What it does |
|------|--------------|
| **Grab** | Drag a cluster of nearby points and *fling* them — release with a flick to throw the cloth. |
| **Slice** | Drag the cursor across threads to cut any constraint the path crosses. |
| **Pin**  | Click a node to pin or unpin it (pinned nodes are the orange dots). |
| **Ball** | Drag to drop a heavy ball onto the cloth; it sags, then rips through over-strained threads. |

**Sliders:** Wind strength, Gravity, and Tear tolerance (higher = threads stretch further before snapping). Live values show next to each.

**Buttons:** `Gust` fires a wind burst · `Shred it` auto-slices the sheet · `Heatmap` toggles strain coloring (with a slack→taut legend) · `Photo` hides the UI and adds a vignette for clean captures · `Reset` re-drops the current preset at its defaults.

**Keyboard:** `Space` = wind gust · `H` = heatmap · `P` = photo mode.

**Presets:** Flag, Curtain, Net, Banner — each sets grid size, pin pattern, and physics.

## URL hash reference

State is encoded in the hash, e.g. `#p=flag&g=38x24&w=35&gr=22&t=150&pn=0.228.456`:

| Key | Meaning |
|-----|---------|
| `p`  | preset name (`flag`, `curtain`, `net`, `banner`) |
| `g`  | grid as `colsxrows` (clamped 2–48 × 2–36) |
| `w`  | wind (0–100) |
| `gr` | gravity (0–100) |
| `t`  | tear tolerance (105–220, as a stretch %) |
| `pn` | pinned node indices, dot-separated (empty = nothing pinned) |

## License

MIT — see [LICENSE](LICENSE).
