# Aplomb

**The cart-pole RL benchmark, but you're the controller. Keep it upright.**

Cart-pole (the inverted pendulum) is the "hello world" of control theory and reinforcement learning — the toy problem agents are trained to solve. Aplomb flips it: instead of watching an agent balance the pole, *you* do it, with a mouse. It's humblingly hard, and there's a one-key PID autopilot ghost so you can watch how the algorithm does it (and how much better it is than you).

It's one HTML file. No build, no server, no dependencies, no network.

## Why it's cool

- **Real cart-pole dynamics.** The canonical inverted-pendulum equations (cart `x`/`ẋ` + pole angle `θ`/`ω`) integrated at a fixed 60 Hz with gravity, force coupling, and cart friction. It's twitchy and alive — over-correct and it whips over, under-correct and it drifts past vertical.
- **Fair, deterministic difficulty ramp.** Seeded wind gusts shove the pole tip, the pole slowly lengthens (raising its center of mass), the rail ices over (friction drops), and weights parachute down and stick to the tip (shifting the balance point). Every gust and drop is telegraphed a beat before it hits.
- **Seeded, shareable runs.** All randomness derives from the URL hash, so `#seed` reproduces the exact same gauntlet. Copy a challenge link and dare a friend to beat your time on the identical chaos.
- **PID autopilot ghost.** Toggle a translucent controller that balances the same seeded run alongside you. Your topple scorecard grades your RMS-tilt "efficiency vs PID."
- **Live instrumentation.** A tilt meter, wind/length/friction readouts, and a phase-space mini-portrait tracing pole angle vs. angular velocity in the corner. Best time is saved per-seed in `localStorage`, with a purple "ghost of your PB" replayed alongside your live run.

## Run it

Open `index.html` in any modern browser — double-click it, or drag it into a tab. That's the whole install.

To replay a specific gauntlet, append a seed to the URL:

```
index.html#abc123
```

A random seed is generated and written to the hash on first load, so every run is already shareable.

## Controls

| Input | Action |
|-------|--------|
| **Mouse** | Cart springs toward the cursor (default scheme) |
| **A** / **D** or **←** / **→** | Nudge the cart left / right (classic impulse scheme) |
| **Touch drag** | Cart follows your finger (mobile) |
| **C** | Toggle control scheme (mouse ⇄ keys) |
| **G** | Toggle the PID autopilot ghost |
| **R** / **Space** / **Enter** | Restart the run |

Keep the pole balanced overhead as long as you can. Survival time is your score. When it topples, the scorecard shows your time, your per-seed best, and your efficiency grade against the PID controller — then you can retry the same seed or copy the challenge link.

## License

MIT © Alex Wictor. See [LICENSE](LICENSE).
