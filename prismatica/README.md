# Prismatica

**Rotate prism tiles to route and mix beams of colored light onto every target.**

Prismatica is a light-routing tile puzzle that lives in a single HTML file — zero dependencies, no build step, no network calls. Emitters fire red, green, and blue beams across a grid. You rotate the tiles in their path — mirrors, splitters, prisms, and color filters — to bend, branch, and blend light until every receiver glows with exactly the color it demands.

## Why it's cool

The twist beyond a stock pipe-rotator is **additive color mixing**. Two beams arriving at the same target combine (red + green = yellow, all three = white), prisms split a white beam into its three primaries, and filters tint a beam as it passes. So most puzzles are really about routing the *right primaries to the right junctions*.

Every interactive tile is **rotate-only**, which means every generated board is solvable *by construction* — the generator places a verified solution, confirms it with the real beam simulator, then scrambles the rotations. You can never be handed an impossible board.

## Features

- **Beam ray tracer** — DFS across the grid tracking color and direction per segment, with a visited-edge guard so splitter/mirror loops always terminate.
- **Additive RGB mixing** — colors accumulate as a bitmask (R+G=yellow, R+G+B=white); a receiver locks only when incoming light *exactly* matches its requirement.
- **Six tile types** — emitters (fixed source), mirrors (reflect 90°), splitters (pass + reflect), prisms (fan white into R/G/B), filters (tint to one primary), walls (block), and receivers (colored targets).
- **12-level handcrafted campaign** that teaches each mechanic in turn, plus a move counter versus per-level par and a star rating.
- **Endless generator** and a **daily seeded challenge** with a localStorage streak and a copy-paste emoji result.
- **Level editor** with live solvability validation using the real simulator, and one-click shareable links.
- **Shareable levels** encoded into a compact, URL-safe `#lvl=...` hash — share any campaign, generated, or hand-built board.
- **Undo / redo / reset / hint**, keyboard controls, an optional strict "no leaks" mode, and a **colorblind mode** with distinct shape glyphs (triangle=R, circle=G, square=B).
- **Accessibility** — respects `prefers-reduced-motion`, allows pinch-zoom, and works on touch.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder and visit it:

```sh
# double-click index.html, or:
python3 -m http.server 8000    # then open http://localhost:8000
```

No install, no build, no dependencies.

## Controls

| Action | Mouse / Touch | Keyboard |
| --- | --- | --- |
| Rotate tile clockwise | Left-click / tap | `Space` / `Enter` |
| Rotate tile counter-clockwise | Right-click / long-press | `Backspace` |
| Move cursor | — | Arrow keys |
| Undo / Redo | Undo / Redo buttons | `Z` / `Y` |
| Reset level | Reset button | `R` |
| Hint (highlights a tile to rotate) | Hint button | `H` |
| New random puzzle | New button | `N` |

Only mirrors, splitters, prisms, and filters rotate — emitters, receivers, and walls are fixed. Toolbar buttons cover Levels, Daily challenge, Editor, Share, Strict mode, and Colorblind mode.

## Sharing a level

Hit **Share** (or **Copy Link** in the editor) to copy a URL with the whole board packed into the hash. Anyone who opens the link plays that exact board. Links work over `http(s)://` and `file://`.

## License

MIT — see [LICENSE](LICENSE).
