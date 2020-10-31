import glob, { Options } from 'fast-glob';
import { promises } from 'fs';
const { readFile } = promises;

const globOptions: Options = {
  unique: true,
  onlyFiles: true,
};

export const getFilesPaths = async (pattern: string): Promise<string[]> =>
  glob(pattern, globOptions);

export const getFileContent = async (path: string): Promise<string> =>
  (await readFile(path)).toString();
