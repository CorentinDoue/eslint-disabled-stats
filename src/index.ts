import { printTitle } from './print';
import { getFileContent, getFilesPaths } from './getFiles';
import { getEslintDisabledTokens, getTokens } from './tokens';
import { Options } from './types';

export const computeEslintDisabledStats = async (options: Options) => {
  const { pattern } = options;
  printTitle('Eslint Disabled Stats');
  const filePaths = await getFilesPaths(pattern);
  await Promise.all(
    filePaths.map(async (filePath) => {
      const fileContent = await getFileContent(filePath);
      const tokens = getTokens(fileContent);
      const eslintDisabledTokens = getEslintDisabledTokens(tokens);
    }),
  );
};
