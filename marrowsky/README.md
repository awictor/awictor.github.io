# Marrowsky

**A tactile spoonerism bench — click two words and their beginnings trade places.**

A *marrowsky* is an archaic word for a spoonerism. This is a single-screen word toy: type a phrase, it splits into word-chips, and when you pick two chips their leading consonant clusters (the "onsets") fly between them. "a loving shepherd" becomes "a shoving leopard."

## Why it's cool

The swap isn't a naive first-letter flip. A small phonetic engine understands real onset clusters — `str`, `thr`, `qu`, `sh`, `wh`, `wr`, `spl`, `squ` and friends — and treats vowel-initial words as having an empty onset, so the results read like genuine tongue-twisters. It flags swaps that produce unpronounceable clusters, keeps capitalization sensible per word position, and encodes every arrangement in the URL hash so any twist is a shareable link. Zero dependencies, one HTML file, no network calls.

## Features

- **Editable phrase → word-chips.** The onset shows in orange, the rime in ink.
- **Click-to-swap or drag.** Tap one chip then another to trade onsets (tap the same chip again to deselect), or drag a highlighted onset onto another word. Works with mouse and touch.
- **Keyboard accessible.** Tab to a chip, press Enter/Space to select, Enter/Space on a second chip to swap.
- **Onset engine.** Recognizes multi-letter clusters and vowel-initial (empty-onset) words, with `y` treated as a vowel after the first position.
- **Pronounceability guard.** Swaps that form an illegal onset cluster get a dashed-red chip plus an inline "hard to say" caption.
- **Auto modes.** *Adjacent* spoonerizes consecutive pairs, *Classic* swaps just the first two words, *Shuffle* randomly pairs and swaps. The active mode stays highlighted.
- **Delight meter.** Counts how many onsets have moved from home, plus alliteration and rhyme.
- **Read aloud.** Speaks the current phrase via the Web Speech API (where available).
- **Shareable links.** The URL hash encodes the phrase plus the applied swap-pairs, so a link reproduces the exact mangled phrase.
- **Surprise me.** Seeds famous Spooner lines and classic tongue-twisters.
- **Save card.** Exports a before/after PNG social card on the warm off-white theme.
- **Reset** restores the original phrase.

## Run it

No build step, no server, no dependencies. Open the file in any modern browser:

```
# double-click index.html, or:
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Controls

| Action | How |
|---|---|
| Swap two onsets | Click one chip, then another (or drag an onset onto another word) |
| Keyboard swap | Tab to a chip, Enter/Space to select, then Enter/Space on the second chip |
| Deselect | Click/Enter the already-selected chip |
| Auto-spoonerize | **Adjacent** / **Classic** / **Shuffle** buttons |
| Undo everything | **Reset** |
| Watch it happen | **Replay** re-applies your swaps step by step |
| Hear it | **Read aloud** |
| Copy the phrase | **Copy** |
| Share this exact twist | **Copy link** (copies the URL with state in the hash) |
| Export an image | **Save card** (PNG) |
| Get a classic | **Surprise me** |

## Share format

State lives in the URL hash:

```
#p=<url-encoded phrase>&s=<i-j>.<i-j>...
```

`p` is the phrase; `s` is a dot-separated list of applied swap-pairs by word index (e.g. `0-1.2-3`). Loading such a URL reproduces the exact result.

## License

MIT — see [LICENSE](LICENSE).
