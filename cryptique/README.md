# Cryptique

A tactile parlor for solving — and forging — classic substitution cryptograms. One HTML file, no dependencies, no backend.

## Why it's cool

Cryptograms are a great newspaper puzzle that rarely gets a genuinely tactile web version. Cryptique gives you a real solver's workbench:

- Click a ciphertext tile, type a letter, and your guess flips into **every** matching symbol across the whole puzzle at once — exactly like pencil-and-eraser solving.
- A live **frequency histogram** (your cipher's letter counts, sorted, overlaid with the standard English E‑T‑A‑O‑I shape) and a **pattern bench** (word-shape signatures, pattern twins, common digraphs/trigraphs) give you real leverage without ever spoiling the answer.
- **Forge mode** turns it into a social object: paste any quote, and Cryptique scrambles it into a cryptogram encoded entirely in the URL — send a friend a single link and they solve exactly your puzzle, with no server involved.

Correctness is checked against the known plaintext, so there's no dictionary to bundle. The whole thing stays tiny.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's it. No build step, no install, no network.

Optionally serve it over HTTP:

```
python -m http.server
# then visit http://localhost:8000
```

Both `file://` and `http://` work fully, including share links (the puzzle state lives in the URL hash). Note: the one-click **Copy share link** button needs a secure context (`file://`, `https`, or `localhost`); over a plain-HTTP LAN address the button falls back to asking you to copy the URL manually.

## How to play

A famous quote is hidden behind a random letter-for-letter cipher. Work out which cipher symbol decodes to which real letter. Select a tile, type your guess, and it propagates to every occurrence of that symbol. Use the frequency chart and pattern bench to make deductions. A red border flags a **conflict** — the same real letter assigned to two different cipher symbols.

### Controls

| Input | Action |
|---|---|
| Click / tap a tile | Select that cipher symbol |
| `A`–`Z` | Fill the selected symbol (and advance) |
| `Backspace` / `Delete` | Clear the selected symbol |
| `←` `→` | Move between symbols |
| `Tab` | Next symbol |
| Hover a tile | Preview its word-pattern signature and pattern-twins |

On phones and tablets, tapping a tile raises the on-screen keyboard so you can type your guess.

### Buttons

- **Daily puzzle** — the same puzzle for everyone on a given UTC date.
- **Random quote** — a fresh random puzzle from the built-in quote pack.
- **Reveal a letter** — a hint (locks one correct symbol; counts against a no-hint streak).
- **Clear guesses** — wipe your (non-locked) entries.
- **Copy share link** — copy the current puzzle's URL.
- **Forge & copy link** — encipher your own pasted quote into a shareable link.
- **◐** — toggle light / dark theme (remembered on this device).

### Scoring

An elapsed timer runs while you solve. Solving with **zero hints** grows your streak (saved locally); using a hint resets it. Streak and theme persist via `localStorage`, and degrade gracefully to no-persistence if storage is blocked.

## Sharing & Forge mode

Every puzzle is fully described by the URL hash, so links reproduce it exactly:

- Curated puzzles use `#d=<index>&s=<seed>`.
- Forged puzzles use `#f=<base64url quote>&s=<seed>&a=<base64url author>`.

The base64url encoding is unicode-safe, so quotes with accents or non-Latin characters survive a round-trip through a link.

## Implementation

Everything lives in `index.html`: layout + CSS (tile grid, frequency bars, flip animation, warm-paper theme) and vanilla JS (seeded monoalphabetic cipher generation, the propagation engine, frequency counting, conflict detection, hint/timer/streak logic, and hash encode/decode for both curated and forged puzzles). Zero dependencies, entirely client-side.

## License

MIT — see [LICENSE](LICENSE).
