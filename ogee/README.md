# Ogee

**Drag two points and watch a CSS easing curve build itself, one linear interpolation at a time.**

Every web developer types `cubic-bezier()` but few actually picture what it does. Ogee is a single-screen interactive explainer that fixes that. The endpoints are pinned at (0,0) and (1,1); you drag the two control handles **P1** and **P2** — the exact four numbers CSS wants — and a t-scrubber sweeps `0..1` while animating the **de Casteljau construction** live: three handle segments collapse to two, then to one point that traces the curve.

The aha: an easing curve isn't magic. It's nested linear interpolation, and the control points *are* the CSS arguments.

Named after the ogee — the architectural S-curve that is literally the shape of `ease-in-out`.

## Why it's cool

Curve editors like cubic-bezier.com let you *tune* a curve. Ogee turns it into an *explainer*: it animates the geometry so you finally see why dragging a handle bends the curve the way it does, then connects that directly to the CSS you paste every day. Grab a curve, copy the string, and the concept sticks.

## Features

- **Two draggable handles** on a pinned unit square (time on x, progress on y). Endpoints locked at 0,0 and 1,1, just like real CSS. X is clamped to `[0,1]`; y is free so overshoot/anticipation curves work, and the plot viewport auto-expands to keep them on screen.
- **Animated de Casteljau scaffold**, color-coded by depth: 3 handle segments (blue) → 2 interpolated segments (green) → 1 point (orange) collapsing onto the traced curve.
- **Velocity companion curve** beneath the plot showing `dprogress / dtime` — where motion speeds up, slows, or reverses — with reversal (overshoot) regions shaded and a live marker at the current time.
- **Feel it, don't just see it**: a demo dot, a sliding card that scales, and a progress bar all move timed by the current easing. Time→progress uses proper x→t bisection, not a naive linear map. A motion strip shows dots bunching where the curve is slow.
- **Two-way CSS I/O**: four numeric fields with arrow-key nudging (Shift = ×5), a paste box that reverse-loads any `cubic-bezier(...)` string, plus copy-short and copy-full-snippet buttons (with a clipboard fallback for `file://`).
- **Preset chips** (linear, ease, ease-in-out, back-out, anticipate) that *morph* the handles to the target with a fading ghost of the previous curve.
- **Shareable links**: the full curve lives in the URL hash (`#x1,y1,x2,y2`) and loads on open.
- Responsive layout, honors `prefers-reduced-motion`.

## Run it

No server, no build, no dependencies. Open the file in any modern browser:

- Double-click `index.html`, or drag it into a browser tab.
- Optionally jump straight to a curve via the hash, e.g. `index.html#.34,1.56,.64,1`

## Controls

| Action | How |
|---|---|
| Bend the curve | Drag handle **P1** or **P2** on the plot |
| Set exact values | Type into the x1 / y1 / x2 / y2 fields |
| Nudge a value | Focus a field, press ↑ / ↓ (hold **Shift** for ×5) |
| Play / pause the scrubber | The play button (or drag the slider to scrub manually) |
| Load a curve | Paste a `cubic-bezier(...)` string and press **load** (or Enter) |
| Copy for CSS | **copy** (short string) or **copy CSS snippet** (transition + keyframes) |
| Try a preset | Click a chip — the current curve morphs into it |
| Share | Copy the URL — the curve is encoded in the hash |

## License

MIT © Alex Wictor
