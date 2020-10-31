export type StatsByRules = {
  [ruleName: string]: { file: string; line: number }[];
};
export type StatsByFiles = {
  [filePath: string]: { rule: string; line: number }[];
};
export type Statistics = {
  byRules: StatsByRules;
  byFiles: StatsByFiles;
  totalRulesDisabled: number;
};
