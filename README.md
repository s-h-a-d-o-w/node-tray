My personal, bare minimum boilerplate for node projects.

# ESLint 9?

Not feasible yet: https://github.com/import-js/eslint-plugin-import/issues/2948

# Bun?

Would be very fast and convenient but...
- (as runtime) Debugging problems https://github.com/oven-sh/bun/issues?q=is%3Aissue+is%3Aopen+debug
- (as package manager) Flaky native addon support

# tsimp

Too many problems with `ts-node` these days. `tsimp` is slow when running for the first time but starts a daemon that keeps running - fast afterwards. `tsx` can be a consideration - doesn't do type checking though and is a tad slower when run repeatedly.
