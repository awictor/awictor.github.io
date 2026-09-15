# Chaff

**A word-search forge that hides a secret message in the leftover letters — separate the wheat from the chaff.**

Most word-search generators dump random junk into the cells your theme words don't cover. Chaff fills that leftover space — the "chaff" — with the letters of a secret message, in reading order. Solve every word and the untouched cells left behind spell your hidden phrase. It's one HTML file, no dependencies, no build step, no network calls.

## Why it's cool

- **The leftover cells mean something.** After the theme words are packed in, every remaining cell is filled — left to right, top to bottom — with your secret message (it repeats to fill the space). Finding the words uncovers the message.
- **Every puzzle is a shareable link.** The whole puzzle (words, message, size, seed, difficulty) round-trips through the URL hash. Send the link and your friend gets a byte-identical grid from the same seeded RNG.
- **Self-contained.** You supply the words, so there's no dictionary and no backend. Open the file and it works.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's the whole install.

To share a link with someone on another device, serve it over your network so the URL is portable:

```
python -m http.server 8000
```

Then open `http://localhost:8000/index.html` (or `http://<your-LAN-IP>:8000/index.html` from another device).

> Copy/share works from a plain `file://` open and from `localhost`. On a non-secure LAN address (`http://<IP>:8000`) it falls back to a legacy copy path automatically. A share link generated from a `file://` open points at a local path on your machine — the button flags it as a local link. Serve over HTTP (above) to produce a link others can open.

## How to play

1. **Forge a puzzle** (left panel): type your theme words (one per line or comma-separated), a hidden message, and pick a grid size and difficulty. Hit **Generate**.
2. **Find the words** in the grid three ways:
   - **Drag** across a run of letters (mouse or touch).
   - **Click** a start cell, then the end cell.
   - **Keyboard:** focus the grid, move with **arrow keys**, press **Enter/Space** to pick the start cell and again on the end cell. **Esc** cancels a pick.
   - Wrong guesses flash red; correct words turn green and cross off the word bank.
3. **Reveal the payoff:** solve all the words (or click **Reveal secret**) to dim the found words and light up the chaff cells that spell the hidden message. Reveal is a toggle — click it again to keep playing.

### Controls

| Button | What it does |
|---|---|
| **Generate** | Build a puzzle from the current inputs (uses/records a seed). |
| **Auto-size** | Find the smallest grid (8–24) where every word fits. |
| **Daily puzzle** | Load a date-derived puzzle from the built-in packs — same for everyone that day. |
| **Reveal secret** | Toggle the solved/decoded view on and off. |
| **Copy share link** | Copy the current puzzle's URL (state lives in the `#hash`). |
| **Copy grid text** | Copy the grid + word list as plain text. |
| **Print / PDF** | Print the grid with a separate solution key page. |

**Difficulty** gates the word directions: Easy = right/down only; Medium = adds reverse (left/up); Hard = all 8 directions including diagonals. The active directions are shown above the grid.

**Fit meter** shows grid occupancy and warns when the grid is too dense or a word is longer than the grid — use Auto-size to find a roomier fit. If words still don't fit they're reported as "dropped" rather than hanging the placer.

## Notes

- The secret message **repeats** across the leftover cells to fill the grid, so the final copy may be partial. Leave the message blank for random filler instead.
- The seed makes puzzles reproducible: the same words + message + size + seed always produce the same grid.
- Interpolated user text (e.g. the message on the print key) is HTML-escaped, so puzzles opened from a shared link can't inject markup.

## License

MIT — see [LICENSE](LICENSE). Author: Alex Wictor.
