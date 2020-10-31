import { printTitle } from './print';
import { getFileContent, getFilesPaths } from './getFiles';

export const computeEslintDisabledStats = async (options: Options) => {
  const { pattern } = options;
  printTitle('Eslint Disabled Stats');
  const filePaths = await getFilesPaths(pattern);
  await Promise.all(
    filePaths.map(async (filePath) => {
      const fileContent = await getFileContent(filePath);
    }),
  );
};
