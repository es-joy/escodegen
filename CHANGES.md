# CHANGES for `@es-joy/escodegen`

## ?

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
