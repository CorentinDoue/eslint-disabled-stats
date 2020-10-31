import { EslintDisabledRule } from './types';
import { Token } from '../types';
import { flatten } from 'lodash';

const eslintDisablePattern = 'eslint-disable';
export const ALL_RULES = 'ALL_RULES';

export const valueContainsEslintDisable = (value: string): boolean =>
  value.includes(eslintDisablePattern);

const valueIsAEslintRule = (value: string): boolean =>
  !valueContainsEslintDisable(value);

const splitValue = (value: string): string[] =>
  flatten(
    value
      .trim()
      .split(' ')
      .map((splitOnce) =>
        splitOnce
          .trim()
          .split(',')
          .filter((splitTwice) => splitTwice !== ''),
      ),
  );

export const parseEslintRules = (
  tokens: Token[],
  filePath: string,
): EslintDisabledRule[] =>
  flatten(
    tokens.map(({ value, loc }) => {
      const formatEslintRule = (rule: string) => ({
        rule,
        file: filePath,
        line: loc.start.line,
      });
      const eslintRules = splitValue(value).filter(valueIsAEslintRule);
      if (eslintRules.length === 0) {
        return [formatEslintRule(ALL_RULES)];
      }
      return eslintRules.map<EslintDisabledRule>(formatEslintRule);
    }),
  );
