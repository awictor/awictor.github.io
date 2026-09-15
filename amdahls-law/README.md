# Amdahl's Law

A single-file, offline calculator for parallel speedup. See how much faster your code can run across N cores using **Amdahl's Law** (fixed workload) and **Gustafson's Law** (scaled workload), plus the theoretical maximum speedup and parallel efficiency.

**Live:** https://awictor.github.io/amdahls-law/

## Features

- **Amdahl speedup** — `1 / ((1−p) + p/N)` for a fixed problem size
- **Gustafson speedup** — `(1−p) + p·N` for a workload that scales with the machine
- **Max speedup** — the hard cap `1/(1−p)` regardless of core count
- **Parallel efficiency** — speedup per core
- Slider for the parallelizable fraction; dark mode; 100% offline; zero dependencies

## Why it matters

If 90% of your work is parallelizable, you can *never* exceed a 10× speedup — the serial 10% dominates. Amdahl's Law makes that ceiling obvious before you throw more hardware at a problem.

## Tests

```
node tests/selftest.mjs
```

10 checks on the pure functions. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
