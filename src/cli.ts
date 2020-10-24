#!/usr/bin/env node
import meow from 'meow';
import chalk from 'chalk';
import { computeEslintDisabledStats } from './index';
import { printError } from './print';

const defaultPattern = '**/*.(js|ts|jsx|tsx)';
const cli = meow(
  `
  Usage
    $ eslint-disabled-stats

  Options
    --pattern,    -p ${chalk.gray(
      `Glob pattern of matching files ( default: "${defaultPattern}" )`,
    )}
`,
  {
    flags: {
      pattern: {
        type: 'string',
        alias: 'p',
      },
    },
  },
);

const options: Options = {
  pattern: cli.flags.pattern ?? defaultPattern,
};

computeEslintDisabledStats(options).catch((error) => printError(error));
