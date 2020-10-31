import { Statistics, StatsByFiles, StatsByRules } from './types';
import { EslintDisabledRule } from '../eslintDisabledRules/types';
import { groupBy } from 'lodash';

const groupByRules = (disabledRules: EslintDisabledRule[]): StatsByRules =>
  groupBy(disabledRules, 'rule');

const groupByFiles = (disabledRules: EslintDisabledRule[]): StatsByFiles =>
  groupBy(disabledRules, 'file');

export const computeStatistics = (
  disabledRules: EslintDisabledRule[],
): Statistics => {
  const totalRulesDisabled = disabledRules.length;
  const byRules = groupByRules(disabledRules);
  const byFiles = groupByFiles(disabledRules);
  return { totalRulesDisabled, byFiles, byRules };
};
