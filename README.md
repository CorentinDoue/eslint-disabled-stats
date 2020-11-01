# eslint-disabled-stats

Compute statistics about the eslint rules disabled

It could be useful to track the correction of legacy eslint errors on your codebase

The number of analysed files and number of analysed lines could be useful to track the evolution of the eslint errors
compared to the evolution of the codebase.

## Usage

```
$ npx eslint-disabled-stats -g -p "example/**/*.(js|ts)"
  _____     _ _       _     ____  _           _     _          _   ____  _        _
 | ____|___| (_)_ __ | |_  |  _ \(_)___  __ _| |__ | | ___  __| | / ___|| |_ __ _| |_ ___
 |  _| / __| | | '_ \| __| | | | | / __|/ _` | '_ \| |/ _ \/ _` | \___ \| __/ _` | __/ __|
 | |___\__ \ | | | | | |_  | |_| | \__ \ (_| | |_) | |  __/ (_| |  ___) | || (_| | |_\__ \
 |_____|___/_|_|_| |_|\__| |____/|_|___/\__,_|_.__/|_|\___|\__,_| |____/ \__\__,_|\__|___/

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

- The `--pattern` / `-p` flag allows to specify
  the glob pattern of files on which the statistics are computed.
  The default pattern is `**/*.(js|ts|jsx|tsx)`

- The `--quiet` / `-q` flag makes the console output lighter.
  The details of the errors by rules and by files will be omitted.

## License

MIT
