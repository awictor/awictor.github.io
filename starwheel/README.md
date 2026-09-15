# Starwheel

**Fly around a living procedural spiral galaxy, rendered from density-wave physics in a single HTML file.**

Starwheel is a real-time spiral galaxy you can orbit, zoom, and tune — one zero-dependency HTML file, raw WebGL, no build step, no network.

## Why it's cool

Instead of scattering random dots, Starwheel models a galaxy the way astronomers do. Tens of thousands of stars ride slowly-precessing elliptical orbits, and where those orbits crowd together they trace luminous spiral arms — the [density-wave model](https://en.wikipedia.org/wiki/Density_wave_theory) behind real galactic structure.

Every star's animated position is computed analytically **in the vertex shader** straight from a compact per-star seed buffer plus a single time uniform. So 100k+ additively-blended point sprites wind up and rotate smoothly with zero per-frame CPU work and no transform feedback. Stars are colored by blackbody temperature, dimmed by procedural dust lanes, and punctuated by bright blue OB associations and pink HII glow along the arm crests, with a warm bulge lighting the core.

## Features

- **Density-wave arms** — each star follows a precessing elliptical orbit whose orientation rotates with radius, so overlapping orbits self-organize into genuine logarithmic spiral arms (not noise).
- **GPU-analytic animation** — star positions and rotation derive entirely from a per-star seed VBO + a time uniform; no CPU particle updates.
- **Photographic look** — blackbody star coloring, procedural dust lanes, blue OB clusters, pink HII regions, and a warm central bulge, all additively blended, with an optional real bloom post-process (bright pass → separable Gaussian blur → Reinhard tonemap).
- **Orbit / zoom / pan camera** for mouse and touch, with inertial smoothing, an auto-rotate toggle, and a cinematic guided-tour autopilot that runs by default and pauses on interaction.
- **Live control panel** — star count, arm count, spiral pitch, eccentricity, arm width, precession, bulge size, dust, color temperature, exposure, star size, and bloom.
- **4 presets** — Milky Way, Grand Design, Flocculent, Tight Ring — each sets params, seed, and a flattering camera.
- **Deterministic seeds** — reroll a whole new galaxy instantly; any seed is reproducible.
- **PNG export** at up to 2x resolution, and a **full-state shareable URL hash** so a specific galaxy + camera angle is one link.
- **Graceful degradation** — a friendly message where WebGL is unavailable, adaptive DPR/star-count clamps for weak GPUs, point-size clamping to the hardware cap, and a sprite-only fallback where framebuffers aren't supported.

## Run it

Open `index.html` in any WebGL-capable browser — double-click it, or drag it into Chrome / Firefox / Edge / Safari. That's it: no build, no server, no dependencies, no network.

## Controls

**Mouse**
- Drag to orbit
- Wheel to dive toward the core
- Right-drag or Shift-drag to pan

**Touch**
- Drag to orbit
- Pinch to zoom
- Tap a preset to explore

**Panel**
- **Presets** — jump to a hand-tuned galaxy + camera
- **Structure / Light & dust** — live sliders for every parameter
- **Camera** — Guided tour, Auto-rotate, Bloom glow toggles
- **Galaxy seed** — type a seed or hit 🎲 to reroll
- **Copy link** — puts the full current state in the URL hash and copies it to the clipboard
- **Export PNG** — saves the current view at 2x resolution
- **Reset defaults** — restore params, seed, and framing

## How the galaxy is built

Each star gets two `vec4` seed attributes (radius / arm key / angular scatter / orbital phase, and vertical spread / temperature / size / population flag). The vertex shader turns those plus the time uniform into a precessing elliptical orbit: the arm crest angle grows logarithmically with radius, radial oscillation from orbital eccentricity sharpens the density wave, and the whole pattern precesses over time. Color comes from a blackbody ramp warmed toward the bulge, dust lanes darken the inner arm edges procedurally, and a small fraction of mid-disk stars are promoted to blue OB clusters or pink HII regions. The bulge is a single soft additive sprite; deep space is a faint drifting nebula pass plus a parallax background starfield.

## License

MIT — see [LICENSE](LICENSE).
