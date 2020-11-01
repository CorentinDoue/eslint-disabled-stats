import { bold, cyan, yellow } from 'chalk';
import { Statistics } from './types';
import { Unicode } from '../unicode';
import { Options } from '../types';

const printList = <T>(dictionary: { [key: string]: T[] }): void =>
  Object.entries(dictionary).forEach(([key, disabledRules]) =>
    console.log(
      `${Unicode.ListDot} ${bold(key)}: ${cyan(disabledRules.length)}`,
    ),
  );

export const printStats = ({
  statistics,
  totalLines,
  totalFiles,
  options,
}: {
  statistics: Statistics;
  totalLines: number;
  totalFiles: number;
  options: Options;
}): void => {
  const { quiet } = options;
  const { totalRulesDisabled, byRules, byFiles } = statistics;
  if (!quiet) {
    console.log(`\nRules disabled by rule:`);
    printList(byRules);
    console.log(`\nRules disabled by file:`);
    printList(byFiles);
  }
  console.log(`\nTotal rules disabled:  ${yellow.bold(totalRulesDisabled)}\n`);
  console.log(`Analysed files:        ${yellow.bold(totalFiles)}`);
  console.log(`Analysed lines:        ${yellow.bold(totalLines)}\n`);
};
