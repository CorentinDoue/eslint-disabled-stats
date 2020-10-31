import { flatten } from 'lodash';
import { printInfo, printSuccess, printTitle } from './print';
import { getFileContent, getFilesPaths } from './getFiles';
import { getEslintDisabledTokens, getTokens } from './tokens';
import { Options } from './types';
import { parseEslintRules } from './eslintDisabledRules/eslintParser';
import { computeStatistics } from './statistics/computeStats';
import { printStats } from './statistics/printStats';

export const computeEslintDisabledStats = async (options: Options) => {
  const { pattern } = options;
  printTitle('Eslint Disabled Stats');
  const filePaths = await getFilesPaths(pattern);
  printInfo(`Analysing ${filePaths.length} files...`);
  const eslintDisabledRules = flatten(
    await Promise.all(
      filePaths.map(async (filePath) => {
        const fileContent = await getFileContent(filePath);
        const tokens = getTokens(fileContent);
        const eslintDisabledTokens = getEslintDisabledTokens(tokens);
        return parseEslintRules(eslintDisabledTokens, filePath);
      }),
    ),
  );
  const statistics = computeStatistics(eslintDisabledRules);
  printSuccess('Statistics computed');
  printStats(statistics);
  printSuccess('Done');
};
