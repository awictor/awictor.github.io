# Snellwork

**A light-bending optical bench in your browser.** Drag lenses, prisms and mirrors onto a dark canvas and watch thousands of rays refract, split into rainbows, and pool into glowing caustics — real physics, zero dependencies, one HTML file.

## Why it's cool

Most "optics toys" fake the light. Snellwork traces it. Every ray obeys Snell's law at each surface, flips to total internal reflection past the critical angle, bounces off curved mirrors, and bends by a wavelength-dependent index — so a white beam through a prism fans into a true spectrum and a convex lens shows real chromatic fringing. Rays deposit energy into an additive float buffer that builds up over frames, so convergence zones bloom into the shimmering caustics you see on a pool floor. And the entire scene lives in the URL, so any arrangement is a shareable link.

It's a teaching toy, a design sandbox, and a self-running light show at the same time.

## Run it

No build, no server, no network. Open the file:

```bash
# just open it
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or serve it statically if you prefer (`python3 -m http.server` then browse to the file). Any modern browser works.

## Controls

| Action | How |
|--------|-----|
| Move an element | **Drag** its body |
| Rotate | Grab the **orange ring handle** and drag |
| Tune the main parameter | **Scroll** over a selected element |
| Fine-tune any parameter | Use the sliders in the **Selected** panel |
| Add an element | Click one in the **Add element** palette |
| Load / remix a preset | Pick from the dropdown or click a **gallery** thumbnail |
| **Undo** | `Ctrl+Z` (restores after delete/clear) |

Keyboard: `D` drift · `E` export PNG · `Del`/`Backspace` delete selected · `C` clear scene (press twice to confirm) · `S` copy share link · `Ctrl+Z` undo.

### Elements

- **Sources** — point (radial fan), beam, laser (tight, few rays), and white (full-spectrum).
- **Glass** — convex/concave lenses, triangular prism, rectangular block. Adjustable index of refraction, dispersion, curvature, and aperture.
- **Mirrors** — flat, parabolic, and spherical, with adjustable reflectivity.
- **Blockers** — aperture (adjustable slit gap) and absorber.

Select any element to see a live physics readout: angle of incidence, refraction angle, a **total internal reflection** indicator, the index at 589 nm, and — for lenses and curved mirrors — the marked focal point via the lensmaker / mirror formulas.

## Modes

- **Drift** (`D`) — elements gently perambulate and rotate for a hands-off generative screensaver.
- **Export** (`E`) — renders an offscreen buffer at 2× over ~180 accumulated frames and downloads a high-res PNG wallpaper of the glowing caustics.
- **Share** (`S`) — the whole scene (elements, transforms, parameters, exposure) is base64-encoded into the URL hash; copy the address bar or hit Share to put a link on your clipboard.

## The physics

- **Refraction** — Snell's law in vector form at every surface; curved lenses and mirrors are finely tessellated into segments for numerical robustness at grazing angles.
- **Total internal reflection** — when the refracted angle would exceed 90°, the ray reflects instead (watch it in the fiber-waveguide preset).
- **Dispersion** — a Cauchy-style model makes the index wavelength-dependent, so shorter (blue) wavelengths bend more than longer (red) ones — the source of every rainbow here.
- **Caustics** — rays accumulate energy in a float buffer that is exposure- and gamma-tone-mapped each frame. A static scene keeps integrating (crisp convergence); a moving scene decays gently so it stays responsive.

## URL hash schema

The hash is `#` + base64 of JSON:

```json
{ "v": 1, "ex": 1.6, "e": [ { "t": "prism", "x": 520, "y": 480, "a": 0.55, "ior": 1.53, "dispersion": 0.03, "size": 150 } ] }
```

`v` schema version · `ex` exposure · `e` array of elements (`t` type, `x`/`y` position, `a` angle in radians, plus that element's physical parameters). Unknown element types are skipped on load.

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Alex Wictor.
