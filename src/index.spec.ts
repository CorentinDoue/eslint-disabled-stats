import { computeEslintDisabledStats } from './index';
import { getFileContent } from './getFiles';
import * as getFiles from './getFiles';
import { Options } from './types';

const testPattern = 'example/**/*.(js|ts|jsx|tsx)';
const testOptions: Options = { pattern: testPattern };

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
});
