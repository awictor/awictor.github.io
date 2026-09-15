# Governor

**Tune a PID controller by hand and watch a ball levitate — or wobble, or crash.**

Governor is a single-file, zero-dependency interactive explainer for PID feedback
control, named after the centrifugal flyball governor that kicked off control theory.
A ping-pong ball floats in a vertical air column: gravity pulls it down, a fan pushes
it up, and a PID controller you tune in real time decides how hard the fan blows to
hold the ball at a target height. Drag the setpoint, nudge the Kp / Ki / Kd sliders,
and watch the ball settle smoothly, overshoot and ring, or wind up and slam the ceiling.

## Why it's cool

Control theory is catnip for developers, but almost nobody has *felt* PID tuning in
their hands. Governor makes the abstract three-term equation tactile:

- The levitating-ball demo is visually alive — you see the bob rise, hunt, and settle.
- A scrolling chart turns overshoot, steady-state error, ringing, and settling time
  into things you can literally read off the trace.
- Live P / I / D contribution bars expose exactly which term is producing the control
  signal at every instant — the internals most tutorials hide.
- Turn off anti-windup and watch the integrator visibly saturate and overshoot. That's
  the "oh, *that's* what the integral term does" moment.

## Features

- **Live physics sim** — ball levitating in an air column, PID-driven fan thrust against
  gravity and drag, integrated on a fixed 10 ms substep loop (frame-rate independent),
  fan output clamped 0–100%.
- **Three gain sliders + draggable setpoint** — Kp, Ki, Kd with numeric readouts, plus a
  target line you drag directly on the column. Everything updates the sim instantly.
- **Scrolling time-series chart** — measured height vs. setpoint (with a tolerance band),
  overlaid with fan output on a shared 0–100 axis.
- **P / I / D contribution bars** — signed bars around a zero midline showing where the
  control signal comes from, plus a Fan output bar.
- **Live metrics** — overshoot %, steady-state error, settling time, and IAE (integral of
  absolute error).
- **Disturbance controls** — a "flick the ball" impulse button and an adjustable
  turbulence slider to stress-test disturbance rejection.
- **Sensor realism** — measurement-noise slider, anti-windup toggle (conditional
  integration), derivative-on-measurement toggle, and a derivative low-pass filter.
- **Presets** — one-click sluggish / aggressive / ringing / critically-damped tunings.
- **Challenge mode** — a scripted sequence of setpoint steps and timed kicks, scored by
  integrated absolute error, with a best score saved in `localStorage`.
- **Ghost trace** — freezes your previous response as a faded dashed overlay whenever you
  change a gain, so you can A/B two tunings.
- **Shareable state** — every knob is encoded in the URL hash, so a good (or hilariously
  bad) tuning is a link.

## Run it

No build, no dependencies, no network. Just open the file:

```
# double-click index.html, or:
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Any modern browser works. If you'd rather serve it over HTTP (enables the async
clipboard for the Share button):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Controls

| Input | Action |
|-------|--------|
| Drag the air column | Set the target height |
| Kp / Ki / Kd sliders | Tune the controller gains |
| Preset buttons | Load a sluggish / aggressive / ringing / critically-damped tuning |
| **F** | Flick the ball (impulse disturbance) |
| **C** | Start / stop the challenge |
| **R** | Reset the sim (or restart the challenge if one is loaded) |
| Turbulence slider | Add continuous random disturbance |
| Measurement-noise slider | Add sensor noise to what the controller sees |
| Anti-windup / D-on-measurement / D-filter | Toggle sensor-realism behaviors |
| Share link | Copy the current tuning as a URL |

## How it works

The controller runs `u = Kp·e + Ki·∫e + Kd·(de/dt)`, clamps the output to 0–100%, and
feeds it to a fan whose thrust competes with gravity and velocity-proportional drag.
Because hovering requires more than 50% output, an integral term is genuinely needed to
kill steady-state error — so you feel *why* the "I" exists rather than reading about it.
Anti-windup uses conditional integration (the integrator freezes only while the output
is saturated in the error's direction); turn it off to watch it wind up.

## License

MIT — see [LICENSE](LICENSE).
