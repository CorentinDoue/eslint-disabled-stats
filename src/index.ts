import { flatten } from 'lodash';
import { printSuccess, printTitle } from './display/print';
import { getFileContent, getFilesPaths } from './getFiles';
import { getEslintDisabledTokens, getTokens } from './tokens';
import { Options } from './types';
import { parseEslintRules } from './eslintDisabledRules/eslintParser';
import { computeStatistics } from './statistics/computeStats';
import { printStats } from './statistics/printStats';
import { AnalyseSpinner } from './display/analyseSpinner';

export const computeEslintDisabledStats = async (options: Options) => {
  const { pattern } = options;
  printTitle('Eslint Disabled Stats');
  const filePaths = await getFilesPaths(pattern);
  const spinner = new AnalyseSpinner(filePaths.length);
  const eslintDisabledRules = flatten(
    await Promise.all(
      filePaths.map(async (filePath) => {
        const fileContent = await getFileContent(filePath);
        const tokens = getTokens(fileContent);
        const eslintDisabledTokens = getEslintDisabledTokens(tokens);
        const eslintRules = parseEslintRules(eslintDisabledTokens, filePath);
        spinner.tick();
        return eslintRules;
      }),
    ),
  );
  spinner.stop();
  const statistics = computeStatistics(eslintDisabledRules);
  printSuccess('Statistics computed');
  printStats(statistics);
  printSuccess('Done');
};
