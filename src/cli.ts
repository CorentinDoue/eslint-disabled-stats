#!/usr/bin/env node
import meow from 'meow';
import chalk from 'chalk';
import { computeEslintDisabledStats } from './index';
import { printError } from './display/print';
import { Options } from './types';

const defaultPattern = '**/*.(js|ts|jsx|tsx)';
const cli = meow(
  `
  Usage
    $ eslint-disabled-stats

  Options
    --pattern,    -p ${chalk.gray(
      `Glob pattern of matching files ( default: "${defaultPattern}" )`,
    )}
    --quiet,      -q ${chalk.gray(
      `Only display total stat ( default: "false" )`,
    )}
`,
  {
    flags: {
      pattern: {
        type: 'string',
        alias: 'p',
      },
      quiet: {
        type: 'boolean',
        alias: 'q',
      },
    },
  },
);

const options: Options = {
  pattern: cli.flags.pattern ?? defaultPattern,
  quiet: Boolean(cli.flags.quiet),
};

computeEslintDisabledStats(options).catch((error) => printError(error));
