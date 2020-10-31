import { tokenize, TokenizeOptions } from 'esprima';
import { Token, TokenType } from './types';

const eslintDisablePattern = 'eslint-disable';

const tokenizeOptions: TokenizeOptions = {
  comment: true,
  tolerant: true, // to not throw on invalid js files, this is not the purpose of this tool
  loc: true,
};

export const getTokens = (fileContent: string): Token[] =>
  tokenize(fileContent, tokenizeOptions) as Token[];

const isComment = ({ type }: Token): boolean =>
  type === TokenType.LineComment || type === TokenType.BlockComment;

const containsEslintDisable = ({ value }: Token): boolean =>
  value.includes(eslintDisablePattern);

export const getEslintDisabledTokens = (tokens: Token[]): Token[] =>
  tokens.filter((token) => isComment(token) && containsEslintDisable(token));
