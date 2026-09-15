# Verge

**A double-pendulum chaos lab: release a swarm and watch determinism unravel.**

Verge is a single-file, zero-dependency toy that turns the butterfly effect into
something you can *see*. It integrates the true double-pendulum equations of motion
with RK4, draws a glowing phosphor trail from the swinging bob-tip, and — its
signature move — releases a **swarm** of N pendulums whose starting angles differ by
a whisper (down to 1e-9 rad). For a few seconds they move as one indistinguishable
arc; then the swarm blooms open into a chromatic fan of divergent fates.

The name nods to the *verge escapement*, the earliest pendulum-clock mechanism — and
to a system perpetually on the verge of chaos.

## Why it's cool

- **Sensitive dependence, made visceral.** A famous, abstract idea becomes a
  five-second visual gut-punch you can share as a link.
- **Honest physics.** Real coupled Lagrangian dynamics, RK4 integration, and a live
  energy-drift readout that tells you when the numerics (and the chaos) stop being
  trustworthy — instead of hiding it.
- **Hackable in one file.** No build, no dependencies, no server. Open it and poke.

## Run it

Open `index.html` in any modern browser. That's it — no build step, no server, no
dependencies.

```
# macOS
open index.html
# Linux
xdg-open index.html
# Windows
start index.html
```

Optionally append a state hash to load a specific run:

```
index.html#L1=1&L2=1&M1=1&M2=3&g=9.81&damping=0&theta1=1.9&theta2=2.4&swarmN=120&epsilon=-5&trailFade=0.06&timeScale=1
```

## Controls

**Canvas**
- **Drag** the highlighted bob (swarm[0]) to set a new starting angle, then release
  to re-launch the swarm from there.

**Keyboard**
- `Space` — play / pause
- `C` — clean mode (hide all UI for screenshots)

**Panel buttons**
- `Pause` / `Step` / `Reset` — playback
- `Clean` — toggle clean mode
- `Copy shareable link` — copies the current URL (state lives in the hash)
- `● Record WebM` — records the composited trail + pendulum layers and downloads
  `verge-bloom.webm`
- **Preset gallery** — one-click curated states; the active preset stays highlighted

**Analysis panel**
- **Phase θ₁ vs ω₁** — phase-space scatter of the lead pendulum
- **ln(spread) vs t** — log of the swarm's RMS state spread over time, with a
  least-squares fit line whose slope is the on-screen Lyapunov estimate (λ)

## The physics

Each pendulum's state is `[θ₁, ω₁, θ₂, ω₂]`, advanced by RK4 at a fixed 1 ms substep
(the render loop accumulates real frame time and steps as many substeps as needed, so
motion is framerate-independent). The accelerations are the exact coupled equations —
no small-angle approximation:

```
Δ   = θ₁ − θ₂
den = 2·M₁ + M₂ − M₂·cos(2θ₁ − 2θ₂)

α₁ = [ −g(2M₁+M₂)sin θ₁ − M₂·g·sin(θ₁−2θ₂)
       − 2·sin Δ·M₂(ω₂²·L₂ + ω₁²·L₁·cos Δ) ] / (L₁·den)  − damping·ω₁

α₂ = [ 2·sin Δ ( ω₁²·L₁(M₁+M₂) + g(M₁+M₂)cos θ₁ + ω₂²·L₂·M₂·cos Δ ) ] / (L₂·den)
       − damping·ω₂
```

The HUD's **energy drift** compares current total mechanical energy to the initial
value. RK4 keeps this tiny for reasonable settings (order 1e-7 % over 10 s with zero
damping), which is what makes the divergence you see genuine chaos rather than
integration error. On a chaotic system, long runs eventually become
trajectory-meaningless — the drift readout is there so you can tell.

The **swarm** seeds N copies whose `θ₁` is spread linearly across ±ε (ε = 10^epsilon).
`divergence t` marks when the swarm's RMS spread first crosses a threshold; **λ** is
the fitted exponential growth rate of that spread — a live Lyapunov-exponent estimate.

## Parameter / hash reference

All state lives in the URL hash and is written back as you interact, so any run is a
bookmarkable, shareable link. Values are clamped to the ranges below on load, so a
hand-edited or truncated link can't produce a broken page.

| Key         | Meaning                              | Range          |
|-------------|--------------------------------------|----------------|
| `L1`, `L2`  | Arm lengths                          | 0.2 – 2        |
| `M1`, `M2`  | Bob masses                           | 0.2 – 5        |
| `g`         | Gravity                              | 0 – 30         |
| `damping`   | Angular damping                      | 0 – 0.5        |
| `theta1`    | Initial angle of arm 1 (rad)         | free           |
| `theta2`    | Initial angle of arm 2 (rad)         | free           |
| `swarmN`    | Number of pendulums in the swarm     | 1 – 400        |
| `epsilon`   | log10 of the starting-angle spread ε | −9 – −1        |
| `trailFade` | Phosphor trail persistence           | 0.001 – 0.2    |
| `timeScale` | Simulation speed multiplier          | 0.1 – 3        |

Trails are drawn per pendulum up to 220; above that they are thinned (every Nth
pendulum) to stay fast, and the HUD notes when this is happening.

## Presets

Classic bloom · Near-vertical · Heavy tip · Lunar drift · Single trace · Slow decay —
each is just an encoded hash, so clicking one also updates the shareable link.

## License

MIT — see [LICENSE](LICENSE).
