# Columella

**Grow a seashell from a genus grammar and a pigment cellular automaton — one HTML file, zero dependencies.**

Columella is a procedural seashell generator. You commit to a shell **genus** (cone, auger, whelk, cowrie, turban, olive), which locks a set of geometric priors — spire pitch, whorl expansion, aperture flare, ribbing. Columella builds the shell as a stack of whorls traced along a logarithmic spiral and shades it into a lit side-view specimen. The surface pattern isn't painted: it emerges from a **1D activator/inhibitor cellular automaton** running along the growing shell lip — the same class of mechanism that produces the tented triangles of a textile cone, the flames of an olive shell, and the banded dots of a whelk.

## Why it's cool

Real shell pigmentation arises from an activator/inhibitor process on the growing mantle edge. Columella runs that process directly, so the pattern and the shell come from the *same* code — the automaton is the biology, not decoration layered on top. Pair that with a genus grammar that commits to a genuine spiral archetype and you get a specimen tray of impossible-but-plausible shells you can seed, tweak, and export.

## Features

- **Genus grammar** — 6 archetypes, each with its own envelope for spire, whorl expansion, aperture, and ribbing.
- **Logarithmic-spiral builder** — stacked whorls on an equiangular spiral, shaded with a lit cylinder gradient, whorl-seam self-shadow, axial ribs, specular sheen, and a ground drop shadow.
- **Pigment cellular automaton** — a wrap-around 1D CA advances down the lip to synthesize tented triangles, flame stripes, and banded dots, mapped per growth step onto the whorl surface.
- **Live controls** — genus, whorls, spire, flare, rib density, CA rule/saturation, hue, glossiness, specular, self-shadow, drop shadow, and museum backdrop all reshape the render in real time.
- **Curated presets** — 8 species-inspired starting points (Textile Cone, Olive Flame, Banded Whelk, ...) with a baked collector's-label caption.
- **Animated accretion** — play/scrub the shell growing whorl by whorl while the CA advances down a highlighted lip.
- **Specimen gallery** — a tray of 9 related seeds; click to load.
- **Shareable permalink** — the full parameter set is serialized into `window.location.hash`, so copying the URL reproduces the exact shell (bare-seed links still work too).
- **Dual export** — crisp PNG (rasterized with the collector's label) and a true vector SVG (silhouette path + clipped pattern fill + label text).
- **HiDPI-aware** and responsive down to phone widths.

## Run

No build step, no dependencies, no network calls.

```
# just open it
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or serve statically and visit the printed URL:

```
python3 -m http.server 8000    # then open http://localhost:8000
```

Any modern browser works.

## Controls

| Control | What it does |
|---|---|
| **Genus** | Picks the archetype and its geometric priors |
| **Form** | Whorl count, spire height, aperture flare, rib density |
| **Pigment automaton** | CA rule (inhibitor radius), pigment saturation, hue |
| **Museum lighting** | Glossiness (highlight tightness), specular strength, self-shadow, drop shadow, backdrop |
| **Curated presets** | Load a species-inspired parameter set |
| **⚄ Randomize** | New seed → fresh genus and params |
| **▦ Gallery** | Open the 9-seed specimen tray (Esc or click backdrop to close) |
| **↓ PNG / ↓ SVG** | Export the current specimen with its label |
| **▶ / growth slider** | Play or scrub the accretion animation |

Dragging any slider updates the URL hash live; copy the link to share the exact shell.

## License

MIT — see [LICENSE](LICENSE).
