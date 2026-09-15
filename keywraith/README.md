# Keywraith

**Race the ghost of anyone's keystrokes — the whole run lives in the URL.**

Keywraith is a single-file typing race. When you finish a passage, your run —
not just the score, but the exact keystroke-by-keystroke timing — is losslessly
encoded into the URL hash. Send that link to someone and their screen replays a
translucent "wraith" cursor typing at your real cadence while they try to beat
it. Beat the wraith and your winning run becomes the next ghost to pass on.

No accounts, no backend, no dictionary, zero dependencies. The shareable ghost
*is* the link.

## Why it's cool

The URL is the multiplayer. Most typing tests are single-player or need a server
to run head-to-head races. Here a plain link carries a replay of how a specific
human actually typed — every hesitation and burst — so you can race their hands
asynchronously with zero infrastructure. The entire app, including a from-scratch
QR encoder and a varint timing codec, is one HTML file you can read in a sitting.

## Features

- **Ghost-in-the-URL** — on finish, your text + per-keystroke timing deltas are
  quantized to milliseconds, varint-packed, and base64url'd into a `#g=...` hash.
- **Real-time wraith replay** — opening a ghost link spawns a translucent caret
  that replays the original typist's exact cadence, driven off recorded absolute
  timestamps via `requestAnimationFrame` (no drift).
- **Multi-wraith racing** — the shared challenge wraith and your local
  personal-best wraith can race at once, each its own color with its own live
  ahead/behind gap readout.
- **Live gap banner** — a smoothed `AHEAD / BEHIND N ch (±Mms)` indicator that
  flips color as your lead changes.
- **Cadence ribbon** — a per-keystroke speed heatmap of your run rendered under
  the passage (greener = faster), with the wraith's ribbon aligned on the same
  character axis, plus a per-word gained/lost timeline on the end screen.
- **Forced-correct typing** — mistakes flash red and cost real time; they don't
  advance the caret, so accuracy is pressure, not a separate stat.
- **Shareable result card + QR** — a canvas result card and a scannable QR of the
  ghost link so you can race on your phone.
- **Custom passages** — paste any text (≤180 chars) to mint a fresh no-ghost
  `#c=...` challenge link; your personal best is stored locally so you can race
  yourself offline.

## Run it

No build, no dependencies, no network.

```
# Simplest: double-click index.html, or open it in any modern browser.

# Or serve it (recommended if you want shareable links — see note below):
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Opening the file directly (`file://`) works fully offline. Serving it over
`http(s)` is only needed if you want the generated ghost links to be shareable
to another machine — a `file://` path only resolves on your own computer.

## How to play

1. Open the page. Tap or click the passage — the caret highlights where typing
   begins — and start typing.
2. Type the correct key to advance. Wrong keys flash red and cost time; they
   don't move you forward.
3. On finish you get your WPM/accuracy/time, a result card, a QR code, and a
   `#g=...` ghost link. Copy it and share.
4. Open a `#g=...` link to race that person's exact keystroke timing. Open a
   `#c=...` link for a fresh no-ghost challenge on that passage.
5. Beat your own time and it's saved as your local personal best — a magenta
   wraith you can rematch anytime with **Race my personal best**.

Controls: just type. `Race again` reloads the current race; `New random passage`
picks a fresh prompt; `Mint challenge link` turns pasted text into a challenge.

## URL hash format

- `#g=<base64url>` — a ghost: a version byte, the passage text (length-prefixed
  UTF-8), a varint mistake count, then one varint per character holding the ms
  delta since the previous keystroke (capped at 60000). Cumulative sums rebuild
  the absolute replay timeline.
- `#c=<base64url>` — a plain base64url of the passage text: a no-ghost challenge.

Ghost length grows with passage length and timing precision, which is why
prompts are capped at ~180 characters — this keeps typical links well under
browser URL limits.

## License

MIT — see [LICENSE](LICENSE).
