# Nacre

**Living long-exposures of strange attractors — iridescent light painted from four numbers.**

Nacre renders [strange attractors](https://en.wikipedia.org/wiki/Attractor#Strange_attractor) as accumulating "long-exposure" light. Every frame iterates a chaotic map ~90,000 times, tallying each hit into an offscreen density grid. That grid is log-tonemapped to luminance and colored by a palette modulated by local step-angle and velocity, giving the shifting mother-of-pearl (nacre) iridescence the toy is named for. A "breathe" mode slowly morphs the four shape parameters while the buffer fades, so the whole structure metamorphoses like drifting smoke.

Four numbers become a mesmerizing, steerable nebula you can freeze into a poster or share by URL. Zero dependencies, one file.

## Why it's cool

- The image *develops* like film — faint filaments and dense cores both resolve because density is mapped through a log/gamma curve, not clipped.
- Color isn't flat: hue is driven by the direction the orbit is moving plus a density-gradient shimmer, layered over a palette luminance base, so the surface looks like thin-film interference.
- The entire render state (attractor, parameters, palette, zoom, pan) lives in the URL hash, so any moment is exactly reproducible and shareable.

## Run it

No build step, no server, no network. Just open the file:

```
# double-click index.html, or:
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

`file://` works fully, including PNG and video export. If you prefer a local server:

```
python -m http.server 8000   # then visit http://localhost:8000
```

Works in current Chrome, Firefox, Edge, and Safari.

## Attractor families

Each is a 2D map iterated from a seed point, with four tunable parameters `a, b, c, d`:

- **Clifford** — `xₙ₊₁ = sin(a·y) + c·cos(a·x)`, `yₙ₊₁ = sin(b·x) + d·cos(b·y)`
- **De Jong** — `xₙ₊₁ = sin(a·y) − cos(b·x)`, `yₙ₊₁ = sin(c·x) − cos(d·y)`
- **Svensson** — `xₙ₊₁ = d·sin(a·x) − sin(b·y)`, `yₙ₊₁ = c·cos(a·x) + cos(b·y)`

Non-finite or diverging points are automatically reseeded, so the render never blows up.

## Controls

| Action | Control |
|---|---|
| Steer parameters `a, b` | Drag the canvas |
| Zoom (about the cursor) | Scroll wheel |
| Zoom (touch) | Two-finger pinch |
| Pan | Shift-drag |
| Nudge `c` / `d` | Arrow keys (↑↓ = c, ←→ = d) |
| Randomize (quality-filtered) | `Space` or **Randomize** |
| Cycle attractor family | `t` or **Attractor** |
| Cycle palette | `p` or **Palette** |
| Toggle breathe morph | `b` or **Breathe** |
| Screensaver (idle auto-drift) | **Screensaver**, or wait 25s |
| Sheen / Bloom | Sliders |
| Save still | **Save PNG** (1×) / **Save 2×** (supersampled) |
| Record loop | **● Record** (captures the breathe metamorphosis) |
| Copy shareable link | **Copy link** |

Palettes: Nacre, Abalone, Aurora, Ember, Pearl. The current attractor and palette names are shown in the top bar.

## Sharing

The URL hash encodes the full state as `#type,a,b,c,d,palette,zoom,cx,cy`. Copy the link to reproduce a render exactly, or hand-edit the numbers. A few starting points:

```
#0,-1.4000,1.6000,1.0000,0.7000,0,1.000,0.000,0.000     Opal (Clifford)
#1,2.0100,-2.5300,1.6100,-0.3300,0,0.900,0.000,0.000    Cathedral (De Jong)
#2,1.4000,1.5600,1.4000,-6.5600,3,0.280,0.000,0.000     Svensson Classic
```

Nine curated seeds also appear as clickable chips in the top bar.

## Export notes

- **PNG** is rendered fresh at higher iteration counts for print quality (2× is supersampled).
- **Record** uses `MediaRecorder`; the container is feature-detected (WebM where supported, MP4 on Safari). If the browser supports neither, the button reads "unsupported".

## License

MIT — see [LICENSE](LICENSE).
