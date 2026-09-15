# Residua

**Watch modular multiplication bloom into cardioids on a circle of residues.**

Place `M` points evenly around a circle (the residues mod M). For every point `i`, draw a
chord to point `i·k mod M`. No single chord touches the curve you think you're drawing — but
their overlapping envelope traces an epicycloid: `k=2` gives a cardioid, `k=3` a nephroid, and
integer `k` in general produces a curve with `k−1` cusps.

## Why it's cool

The "times-table cardioid" is a genuine jaw-drop even if you already know the math. Residua's
twist is that the multiplier `k` is **continuous**: chord endpoints are computed by linear
interpolation of the residue index, so `k` can be fractional. Sweep it and one epicycloid
morphs smoothly into the next in real time — cardioid → nephroid → ever-more-petaled roses —
something the popular static versions never show. It's a single HTML file, zero dependencies,
and every pattern is captured in the URL, so anything you find is one copy-paste away from
being shared.

## Features

- **Chord field** — M residue points on a circle, each `i` joined to `(i·k mod M)`, drawn as
  glowing anti-aliased lines on a dark field.
- **Continuous multiplier** — non-integer `k` via interpolated endpoints, so `k` morphs curves
  smoothly instead of jumping between integers.
- **Play / pause sweep** — animate `k` over time with adjustable speed and reversible direction.
- **Live math readout** — current `k`, modulus `M`, predicted cusp count (`k−1`), and the
  curve's name (cardioid / nephroid / …).
- **Coloring** — by angle (hue) or by `gcd(i, M)` to expose symmetry classes; ice / ember /
  spectrum palettes and an optional additive bloom glow.
- **Integer-k ghost** — optional dashed overlay of the exact epicycloid envelope for the
  nearest integer `k`.
- **Afterimage trail** — during playback, fade the previous frame instead of clearing it so
  morphing envelopes leave elegant ghost curves.
- **Presets + randomize** — curated one-click patterns (cardioid, nephroid, rose, moiré,
  gcd bloom, φ spiral) plus a dice roll.
- **Export & share** — save a PNG, record the live morph to video (WebM, or MP4 where the
  browser supports it), or copy a link that encodes the full state in the URL hash.

## Run it

No build, no server, no network. Just open the file:

- Double-click `index.html`, or drag it into any modern browser tab.

That's it. Everything runs client-side in one file.

## Controls

| Action | How |
| --- | --- |
| Set modulus `M` (2–3000) | `modulus M` slider or number box |
| Set multiplier `k` (0–60) | `multiplier k` slider or number box |
| Play / pause the sweep | `▶ play` button, or press **Space** |
| Reverse sweep direction | `→ / ←` button |
| Scrub `k` by hand | **Click + drag** left↔right on the canvas |
| Sweep speed / afterimage trail | sliders (trail applies during playback) |
| Jump to a pattern | preset chips, or `🎲 randomize` |
| Color mode / palette / glow / ghost | selectors and checkboxes |
| Save a still | `⤓ PNG` |
| Record the morph | `● record webm` (starts playback; click again to stop & save) |
| Share the exact pattern | `🔗 copy link` (state is in the URL hash) |
| Hide / show the panel | `✕ hide` / the `≡` button |

The animation only runs while playing — a static pattern costs no CPU. Autoplay via a shared
link is suppressed for visitors who have `prefers-reduced-motion` set.

## License

MIT — see [LICENSE](LICENSE).
