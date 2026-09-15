# Asterism

Draw your own constellations across a seeded night sky, name them, and share the whole sky as a link.

## Why it's cool

The sky is fully deterministic from a tiny seed, so "share your sky" actually works pixel-for-pixel: the seed *and* every line you drew are packed into the URL hash. Open someone's link and the same 760 stars appear in the same places on your screen, with their constellations traced over the exact same points — no backend, no accounts, no database. It's a quiet, self-contained toy: a twinkling starfield with a faint Milky Way band and the occasional meteor you might miss, and a place to leave your own marks on it.

One file, zero dependencies, pure `<canvas>`.

## Run it

No build step, no install, no network.

- **Open directly:** double-click `index.html` (or open it in any modern browser). The share link works over `file://` too.
- **Or serve statically** if you prefer a real URL:
  ```bash
  python3 -m http.server 8080
  # then visit http://localhost:8080
  ```

## How to use

1. **Click a star**, then click another — a glowing line connects them and snaps to the nearest star. Keep clicking to extend the chain; a dashed rubber-band line follows your cursor.
2. **Press `N`** (or **Finish**) to name the constellation. The name glows in soft serif at the pattern's center; add an optional caption to narrate a shared sky.
3. **Copy Link** to get a URL that reproduces the entire sky — the seed plus every constellation — on anyone's screen.

Opening a shared link plays a gentle line-by-line reveal of the constellations; tap or press any key to skip it, or click the title to replay.

## Controls

| Control | Action |
|---|---|
| **Click / tap** | Select a star, then a second to draw a segment |
| **New Sky** | Reseed a fresh random starfield (asks to confirm if you've drawn anything) |
| **Undo** | Remove the last segment (or the last figure) |
| **Finish (N)** | Name and save the current chain |
| **Labels** | Toggle constellation names |
| **Guide** | Suggest real asterisms (Big Dipper, Orion's Belt, Southern Cross) fitted to the current sky's bright stars |
| **Sound** | Ambient drone + a pluck per connection, pitched to each star's color temperature |
| **Save Sky** | Download the current sky as a 2× PNG postcard |
| **Copy Link** | Copy a shareable URL that rebuilds this exact sky |

### Keyboard

- **Arrow keys** — move the focus between stars
- **Enter** — connect the focused star
- **N** — name the current constellation
- **Ctrl/Cmd+Z** — undo
- **Esc** — cancel the in-progress line

The canvas carries an ARIA label and a live region, so keyboard navigation and star selection are announced to screen readers.

## How the shareable sky works

The URL hash encodes the seed (base-36) followed by each constellation as a comma-separated list of star indices plus its name and caption. A [mulberry32](https://en.wikipedia.org/wiki/Xorshift) PRNG seeded from that value places every star deterministically, so the same seed always produces the same sky. On load, the hash is parsed, the sky is rebuilt, and the figures are drawn back over their original stars.

## License

MIT — see [LICENSE](LICENSE).
