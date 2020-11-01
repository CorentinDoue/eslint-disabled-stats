import { flatten, sumBy } from 'lodash';
import { printSuccess, printTitle } from './display/print';
import { getFilesPaths } from './getFiles';
import { Options } from './types';
import { computeStatistics } from './statistics/computeStats';
import { printStats } from './statistics/printStats';
import { AnalyseSpinner } from './display/analyseSpinner';
import { getDataFromFiles } from './getDataFromFiles';

export const computeEslintDisabledStats = async (
  options: Options,
): Promise<void> => {
  const { pattern } = options;
  printTitle('Eslint Disabled Stats');
  const filePaths = await getFilesPaths(pattern);
  const totalFiles = filePaths.length;
  const spinner = new AnalyseSpinner(totalFiles);
  const parsedData = await getDataFromFiles({
    filePaths,
    spinner,
  });
  const eslintDisabledRules = flatten(
    parsedData.map((data) => data.eslintDisabledRules),
  );
  const totalLines = sumBy(parsedData, 'totalLines');
  spinner.stop();
  const statistics = computeStatistics(eslintDisabledRules);
  printSuccess('Statistics computed');
  printStats({ statistics, totalLines, totalFiles, options });
  printSuccess('Done');
};
