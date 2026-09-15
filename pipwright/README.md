# Pipwright

**Roll a die across a grid so its top face stamps every target — a pure orientation-logic puzzle.**

Pipwright is a single-file rolling-die puzzle. You control one six-sided die sitting on a
grid. Each move tips it 90° in that direction and — exactly like a real cube — permutes which
face points up, which face the sides, and which touches the floor. Scattered on the board are
**seals**: cells marked 1–6. A seal locks only when the die rolls onto it **while its up-facing
pip equals the seal's number**. Lock every seal to solve the level.

## Why it's cool

The up-face is a hidden function of your *entire path*, so the shortest route is almost never
the winning route — you have to choreograph tumbles to arrive at each seal showing the right
number, often taking deliberate detours just to re-orient the cube. Tracking a cube's
three-axis orientation in your head is deceptively hard, which turns simple movement into
spatial deduction.

Everything is deterministic, so every level has a repeatable optimal move count (**par**),
computed at load by a BFS solver over `(position, orientation, locked-mask)` states. That means
levels are par-scored and race-able, and the whole board packs into the URL hash — any level,
built-in or hand-authored, is one link to share. No dependencies, no build step, no network
calls; one HTML file you can read end to end.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder statically:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

That's it. No install, no build, no backend.

## Controls

| Action  | Keys / gesture                                   |
|---------|--------------------------------------------------|
| Move    | Arrow keys, `WASD`, swipe, or the on-screen d-pad |
| Undo    | `Z`                                              |
| Redo    | `Y`                                              |
| Hint    | `H` (flashes only the next optimal move)         |
| Restart | `R`                                              |
| Dismiss win card | `Esc`, or click the backdrop             |

Hover a d-pad arrow to **preview** the resulting top pip before you commit to a roll.

Buttons: **level select**, **Daily** (a date-seeded puzzle that's the same for everyone that
UTC day), **Random** (generates and verifies a fresh solvable level), **Edit** (level editor),
**Hint**, **Undo/Redo/Restart**, and **Share** (copies a link to the exact level you're on).
The Moves counter turns amber once you pass par.

## Level editor

Click **Edit**, then:

- **Click** a cell to cycle it: empty → wall → pit → seal (target 1 → … → 6 → removed).
- **Shift-click** a cell to place the die's start there.

The shareable link updates live as you build. On exit, the editor re-runs the solver and warns
if the layout is unsolvable (the link still encodes it either way).

## URL-hash level format

A level serializes to the URL fragment as `~`-separated parts:

```
WxH ~ startRow.startCol ~ orientKey ~ w<idx.idx…> ~ p<idx.idx…> ~ s<idx-target.idx-target…>
```

- `WxH` — grid width × height.
- `startRow.startCol` — starting cell (0-indexed, row-major).
- `orientKey` — 6 digits: up, down, north, east, south, west pips of the starting die
  (opposite faces sum to 7). The default is `162453`.
- `w…` — wall cell indices (`idx = row * W + col`), `.`-separated. Omitted if none.
- `p…` — pit cell indices. Omitted if none.
- `s…` — seals as `index-target` pairs. Omitted if none.

Example: `#5x5~0.0~162453~w7.12~s18-3.24-6` is a 5×5 board, die starting top-left in the default
orientation, walls at cells 7 and 12, and two seals: show a 3 on cell 18 and a 6 on cell 24.

## License

MIT — see [LICENSE](LICENSE).
