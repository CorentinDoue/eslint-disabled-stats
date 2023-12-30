# eslint-disabled-stats

Compute statistics about the eslint rules disabled

[![npm version](https://badge.fury.io/js/eslint-disabled-stats.svg)](https://badge.fury.io/js/eslint-disabled-stats)
[![CI-CD](https://github.com/CorentinDoue/eslint-disabled-stats/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/CorentinDoue/eslint-disabled-stats/actions/workflows/ci-cd.yml)

It could be useful to track the correction of legacy eslint errors commented with a tool such as https://github.com/CorentinDoue/eslint-disable-inserter on your codebase.

The number of analyzed files and number of analyzed lines could be useful to track the evolution of the eslint errors
compared to the evolution of the codebase.

## Usage

```
$ npx eslint-disabled-stats -g -p "example/**/*.(js|ts)"

ℹ Analysing 2 files...
✔ Statistics computed

Rules disabled by rule:
• prefer-const: 1
• eqeqeq: 1
• curly: 1
• ALL_RULES: 1

Rules disabled by file:
• example/index.ts: 3
• example/legacy/legacy-file.js: 1

Total rules disabled:  4

Analysed files:        2
Analysed lines:        19

✔ Done
```

### Options

- The `--pattern` / `-p` flag allows specifying
  the glob pattern of files on which the statistics are computed.
  The default pattern is `**/*.(js|ts|jsx|tsx)`

- The `--quiet` / `-q` flag makes the console output lighter.
  The details of the errors by rules and by files will be omitted.

## License

MIT
