# Trussfall

**Draw a bridge, run the truck, watch it hold or fold — real statics in one HTML file.**

Trussfall is a single-file, zero-dependency 2D bridge builder with a genuine
spring-mass structural simulation. You draw beams between fixed stone anchors
across a river gap on a limited budget, then hit RUN and send a weighted truck
across your deck. Every member is solved in real time and colored by its axial
force — blue for compression, red for tension — so you literally watch load flow
through the truss. Overload a member and it flashes, takes damage, and **snaps**,
often taking the whole span into the water below.

## Why it's cool

- **It's actual statics, not a fake.** Members are stiff constraints solved with
  position-based dynamics (XPBD); the axial force is read straight from each
  constraint's Lagrange multiplier. Under-brace a span and it sags, redistributes
  load, and fails progressively — you learn *why* triangles beat rectangles.
- **The failure is the payoff.** When a member flushes red and pops, you get a
  slow-motion instant replay that zooms the camera onto the first member to fail
  and calls out its force vs. its limit, so you know exactly where to reinforce.
- **A bridge is one link.** The full design, the level seed, and your score are
  encoded into the URL hash. Copy the link and a friend opens your exact bridge
  and challenge — a hard level becomes a dare.

## Run it

No build step, no dependencies, no network.

- **Double-click `index.html`** to open it in any modern browser, **or**
- serve the folder statically and open the page, e.g.:
  ```
  python -m http.server 8000    # then visit http://localhost:8000
  ```

Chrome, Firefox, Safari, and Edge are all supported.

## How to play

1. **Draw the deck.** Pick **Road Deck** (green) and drag across the gap between
   the stone anchors — the truck can only drive on road.
2. **Brace it.** Switch to **Steel Truss** and add members below/around the deck.
   Triangles are stiff; rectangles rack and fold. Watch the **budget** meter.
3. **Test it.** Press **RUN** (or Space). A weighted truck rolls across at the
   level's target speed. Members color by force live; the **Live Max Stress**
   meter shows how close you are to failure.
4. **Win** by getting the truck fully across intact. Finish well under budget for
   a GOLD rating. **Lose** if the structure collapses or the truck falls in.

## Controls

| Action | Input |
|---|---|
| Place a member | Drag between two points on the canvas |
| Place a lone node | Short click on empty grid (then drag from it) |
| Steel Truss / Road Deck / Delete tool | `1` / `2` / `3` (or the toolbar) |
| Run / stop the test | `Space` (or the RUN button) |
| Delete hovered member/node | `Del` / `Backspace` (or the Delete tool) |
| Undo | `Z` or `Ctrl+Z` |
| Redo | `Ctrl+Y` or `Ctrl+Shift+Z` |
| Mute / unmute sound | Speaker button (top-right) — remembered across sessions |
| Copy shareable link | Copy Link button |

The right panel shows budget, live stress, the force legend, and your best run,
which races alongside the current attempt as a translucent ghost. On narrow /
mobile screens the toolbar reflows into a horizontal strip so every control stays
reachable.

## Levels

- **Hand-authored levels** (Prev / Next) with increasing gap width, budget, and
  truck weight.
- **Seed of the Day** — a deterministic daily procedural level everyone gets the
  same day. Beat it and share your score.
- **Shared links** — any level plus a full bridge design plus a score can ride in
  the URL hash.

## Share-link format

The hash is base64url of a pipe-delimited string:

```
T1 | <levelKey> | <players nodes> | <beams> | <score?>
```

- **`levelKey`** — `L<n>` (hand level index), `D<seed>` (daily, by its seed), or
  `S<seed>` (arbitrary procedural seed).
- **player nodes** — `;`-separated `gridX,gridY` pairs (coordinates quantized to
  the grid; anchors are implied by the level and not stored).
- **beams** — `,`-separated `a:b:mat` triples: node indices `a`,`b` and material
  `0` (truss) or `1` (road).
- **score** (optional) — `survived:spent:speed:tenthsOfSeconds`.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
