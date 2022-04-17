# CHANGES for `@es-joy/escodegen`

## 3.4.0

- feat: process any `jsdocBlocks` on `Program`

## 3.3.2

- chore: stop minifying Node build

## 3.3.1

- fix: for `jsdoc` on statements or expressions

## 3.3.0

- feat: check for `jsdoc` on statements or expressions

## 3.2.1

- fix: attempt to fix stale `dist` files

## 3.2.0

- feat: allow supplying own `CodeGenerator` factory

## 3.1.1

- fix: `exports` for `import` and `browser`

## 3.1.0

- feat: export `version` and export `browser: false` for Node
- chore: switch to `@es-joy/estraverse`

## 3.0.2

- fix: ESM `exports` paths

## 3.0.1

- docs: fix install target

## 3.0.0

Initial fork of [`escodegen`](https://github.com/estools/escodegen).

- feat: ESM
- chore: update `estraverse`, `optionator`, `esutils`, optional `source-map`
    and devDeps.
- chore: Restore `optionator` to a regular dep. (used in published binary file)
- chore: Drop unused `semver`, `minimist`
- chore: Drop `bluebird` in favor of ES Promises
