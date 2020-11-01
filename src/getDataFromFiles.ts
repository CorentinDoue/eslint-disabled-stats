import { getFileContent } from './getFiles';
import { getEslintDisabledTokens, getTokens } from './tokens';
import { parseEslintRules } from './eslintDisabledRules/eslintParser';
import { AnalyseSpinner } from './display/analyseSpinner';
import { EslintDisabledRule } from './eslintDisabledRules/types';

export type ParsedData = {
  filePath: string;
  eslintDisabledRules: EslintDisabledRule[];
  totalLines: number;
};

const getTotalLines = (fileContent: string): number =>
  fileContent.split('\n').length;

export const getDataFromFiles = async ({
  filePaths,
  spinner,
}: {
  filePaths: string[];
  spinner: AnalyseSpinner;
}): Promise<ParsedData[]> =>
  Promise.all(
    filePaths.map(async (filePath) => {
      const fileContent = await getFileContent(filePath);
      const totalLines = getTotalLines(fileContent);
      const tokens = getTokens(fileContent);
      const eslintDisabledTokens = getEslintDisabledTokens(tokens);
      const eslintDisabledRules = parseEslintRules(
        eslintDisabledTokens,
        filePath,
      );
      spinner.tick();
      return { filePath, eslintDisabledRules, totalLines };
    }),
  );
