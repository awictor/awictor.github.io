# Linear System Solver

Solve a system of linear equations **Ax = b** (2×2 up to 5×5) by **Gaussian elimination with partial pivoting**. Reports the unique solution or flags a singular (no-unique-solution) system.

**[Open the tool →](https://awictor.github.io/linear-system/)**

- Editable coefficient grid, live solve
- Partial pivoting for numerical stability
- Determinant helper; singular-system detection
- Dark mode, 100% offline, no dependencies, no eval()

## Example

`2x + y = 5`, `x + 3y = 10` → **x = 1, y = 3**. Classic 3×3 gives x = 5, y = 3, z = −2.

## Tests

```
node tests/selftest.mjs
```

Part of the [Toolkit](https://awictor.github.io/toolkit/).

## License

MIT
