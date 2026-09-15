# Tower of Hanoi

A single-file, offline **Tower of Hanoi** solver. Choose a disk count to see the minimum number of moves (`2ⁿ − 1`), the full optimal move sequence, and how often each disk moves.

**Live:** https://awictor.github.io/tower-of-hanoi/

## Features

- **Minimum moves** `2ⁿ − 1` (exact up to 53 disks)
- **Optimal move sequence** as `disk: from → to` (up to 15 disks)
- **Per-disk move counts** — smallest moves 2ⁿ⁻¹ times, largest once
- Dark mode, 100% offline, zero dependencies

## Fun fact

The legendary 64-disk version needs 18,446,744,073,709,551,615 moves — longer than the age of the universe at one move per second.

## Tests

```
node tests/selftest.mjs
```

10 checks including a legality simulator that verifies every generated solution completes without illegal moves. No dependencies.

## License

MIT — part of the [Toolkit](https://awictor.github.io/toolkit/).
