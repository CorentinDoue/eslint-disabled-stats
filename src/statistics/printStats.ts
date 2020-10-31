import { bold, cyan, yellow } from 'chalk';
import { Statistics } from './types';
import { Unicode } from '../unicode';

const printList = <T>(dictionary: { [key: string]: T[] }): void =>
  Object.entries(dictionary).forEach(([key, disabledRules]) =>
    console.log(
      `${Unicode.ListDot} ${bold(key)}: ${cyan(disabledRules.length)}`,
    ),
  );

export const printStats = (stats: Statistics): void => {
  const { totalRulesDisabled, byRules, byFiles } = stats;
  console.log(`\nRules disabled by rule:`);
  printList(byRules);
  console.log(`\nRules disabled by files:`);
  printList(byFiles);
  console.log(`\nTotal rules disabled: ${yellow.bold(totalRulesDisabled)}\n`);
};
