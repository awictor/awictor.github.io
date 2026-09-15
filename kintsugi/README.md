# Kintsugi

**Strike the porcelain, watch it fracture, then heal every crack in molten gold.**

A single-file, zero-dependency generative art toy inspired by *kintsugi* — the Japanese
craft of repairing broken ceramics with gold. Press and hold anywhere on a glazed plate to
strike it: radial cracks shoot out from the impact and concentric ring cracks arc between
them, growing in real time exactly like a stone hitting glass. Each crack halts the instant
it runs into another (stress relief), so repeated strikes carve the plate into ever-finer
shards. When the fracture network settles, the cracks slowly fill with shimmering molten
gold — the breakage becomes the ornament.

## Why it's cool

- **Real impact-fracture topology.** Radial + Hertzian ring cracks, curvature jitter,
  branching, and true segment-intersection collision — cracks stop where they meet older
  cracks, subdividing the surface into believable shards.
- **Destruction that turns beautiful.** The heal pass flows gold outward from each impact
  with a bright leading meniscus cooling into layered shadow/glow/core veining.
- **Deterministic and shareable.** A seeded PRNG plus the full strike list are packed into
  the URL hash, so any plate you make reproduces pixel-for-pixel from its link (at the same
  window size). Live play and URL replay grow strikes in the exact same order and precision.
- **One file, no build, no network.** ~490 lines of HTML/CSS/JS. Open it and go.

## Run it

No server, no build step, no install:

```
# clone or download, then just open the file
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or double-click `index.html` in any modern browser.

## Controls

| Action | What it does |
| --- | --- |
| **Press & hold** on the plate | Charge a strike — a longer hold shatters harder |
| **Release** | Fire the fracture from that point |
| **Shift + press** | Maximum-intensity strike (hardest shatter) |
| `S` | Save the current plate as a PNG |
| `G` | Toggle gold healing on/off |
| `M` | Toggle sound (ceramic *tink* + heal shimmer; off by default) |
| `N` | New blank plate (fresh random seed) |

The toolbar along the bottom cycles the **glaze** (off-white / celadon / oxblood), the
**vein** metal (gold / silver / lacquer), and toggles **heal** and **sound**. Every button
carries its keyboard shortcut in a tooltip.

## Sharing

The URL hash always reflects the current seed, look, and every strike. Copy the address bar
to share a plate; open that link to reproduce it exactly. `New plate` gives you a fresh seed
and a clean surface.

## License

MIT — see [LICENSE](LICENSE).
