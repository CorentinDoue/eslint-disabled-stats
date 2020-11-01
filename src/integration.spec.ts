import { mocked } from 'ts-jest';
import { computeEslintDisabledStats } from './index';
import { getFileContent } from './getFiles';
import * as getFiles from './getFiles';
import { Options } from './types';
import { printStats } from './statistics/printStats';
import * as printStatsLib from './statistics/printStats';
import { Statistics } from './statistics/types';

const testPattern = 'example/**/*.(js|ts|jsx|tsx)';
const testOptions: Options = {
  pattern: testPattern,
  quiet: false,
};

describe('computeEslintDisabledStats', () => {
  it('finds the two example files', async () => {
    jest.spyOn(getFiles, 'getFileContent');

    await computeEslintDisabledStats(testOptions);

    expect(getFileContent).toHaveBeenCalledTimes(2);
    expect(getFileContent).toHaveBeenCalledWith('example/index.ts');
    expect(getFileContent).toHaveBeenCalledWith(
      'example/legacy/legacy-file.js',
    );
  });
  describe('Stats', () => {
    jest.spyOn(printStatsLib, 'printStats');
    let statistics: Statistics;
    let totalFiles: number;
    let totalLines: number;
    beforeAll(async () => {
      await computeEslintDisabledStats(testOptions);
      ({ statistics, totalFiles, totalLines } = mocked(
        printStats,
      ).mock.calls[0][0]);
    });

    it('counts 4 disabled rules', () => {
      expect(statistics.totalRulesDisabled).toEqual(4);
    });

    it('correctly computes stats by files', () => {
      expect(statistics.byFiles).toEqual({
        'example/index.ts': [
          { rule: 'prefer-const', file: 'example/index.ts', line: 6 },
          { rule: 'eqeqeq', file: 'example/index.ts', line: 8 },
          { rule: 'curly', file: 'example/index.ts', line: 8 },
        ],
        'example/legacy/legacy-file.js': [
          { rule: 'ALL_RULES', file: 'example/legacy/legacy-file.js', line: 1 },
        ],
      });
    });

    it('correctly computes stats by rules', () => {
      expect(statistics.byRules).toEqual({
        'prefer-const': [
          { rule: 'prefer-const', file: 'example/index.ts', line: 6 },
        ],
        eqeqeq: [{ rule: 'eqeqeq', file: 'example/index.ts', line: 8 }],
        curly: [{ rule: 'curly', file: 'example/index.ts', line: 8 }],
        ALL_RULES: [
          { rule: 'ALL_RULES', file: 'example/legacy/legacy-file.js', line: 1 },
        ],
      });
    });

    it('computes the number of files', () => {
      expect(totalFiles).toBe(2);
    });

    it('computes the number of lines', () => {
      expect(totalLines).toBe(19);
    });
  });
});
