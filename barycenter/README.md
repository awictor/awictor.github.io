# Barycenter

**Fling worlds into orbit and watch gravity do the rest.**

A tactile N-body gravity sandbox in a single HTML file — no build, no dependencies, no server. Drag on empty space to slingshot a new body into existence (the drag vector sets its launch velocity), then watch it fall into orbit, whip through close passes, and leave glowing trails. Grab any body to reposition or flick it. Overlapping bodies merge with conserved momentum.

## Why it's cool

Everyone recognizes orbital gravity, but few compact toys nail the *tactile* part. As you aim a throw, a dashed ghost forward-integrates the prospective body through the current gravity field and draws its real curved future path — so you can feel out a stable orbit before you let go. Emergent behavior (slingshots, resonances, chaotic three-body tumbles, dramatic merges) means no two sessions are alike, and the entire system serializes to the URL hash, so any configuration you stumble into is a link you can share.

## Features

- **N-body inverse-square gravity** with a softening term and velocity-Verlet (symplectic) integration, plus adaptive sub-stepping that shrinks the time-step during close passes so orbits stay stable instead of blowing up. Comfortable up to ~60 bodies.
- **Slingshot spawn** — drag from empty space to birth a body; the drag vector is its launch velocity, with a live field-aware trajectory ghost while you aim.
- **Grab & flick** — click any body to drag it live; release to impart velocity from your pointer motion.
- **Momentum-conserving merges** — overlapping bodies coalesce (mass adds, radius scales as mass^(1/3), velocity from conservation).
- **Glowing velocity-tinted trails** on an additive fade layer, with an adjustable persistence slider. Trails stay locked to world space even with auto-recenter on.
- **Barycenter crosshair** marking the true center of mass, with optional view auto-recenter.
- **Gravitational-potential heatmap** you can toggle behind the scene.
- **Curated presets** — binary star, the stable figure-8 three-body choreography, a mini-solar system, and a chaotic 3-body tangle.
- **Shareable state** — params + every body round-trip through the URL hash; one-click Copy share link.

## Run it

Open `index.html` in any modern browser — double-click it, or serve the folder statically:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

Zero dependencies and no build step.

## Controls

**Pointer**
- **Drag on empty space** — slingshot a new body; drag length/direction = launch velocity. The dashed ghost previews its path.
- **Drag on a body** — grab and reposition it; release to flick it with your pointer's velocity. The cursor shows `grab` / `grabbing` when you're over a body.

**Keyboard**
- `Space` — pause / resume
- `→` or `.` — step one frame (while paused)
- `r` — randomize
- `c` — clear
- `h` — collapse / expand the panel

**Panel**
- Presets, plus Pause / Step / Randomize / Clear and **Copy share link**.
- Toggles: merge, barycenter, auto-recenter, field heatmap.

## Parameter glossary

| Slider | What it does |
|---|---|
| **gravity G** | Overall strength of gravity. Higher pulls bodies together harder and faster. |
| **softening** | How close bodies can get before gravity is capped. Larger = gentler close passes, no slingshot blow-ups. |
| **spawn mass** | Mass of the next body you fling. Heavier bodies pull harder and draw larger. |
| **sim speed** | Time-step size — how far the simulation advances per frame. Higher = faster but rougher. |
| **trails** | How long motion trails linger before fading. 0% = none, 100% = near-permanent streaks. |

## State lives in the URL

Every change is written to the URL hash (`#G,soft,mass,speed,persist,flags|body;body;…`). Copy the link to share an exact configuration, or bookmark a lucky stable orbit. A malformed or hand-truncated hash safely falls back to the figure-8 preset.

## License

MIT — see [LICENSE](LICENSE).
