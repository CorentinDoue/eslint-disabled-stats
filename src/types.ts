import { Token as EsprimaToken } from 'esprima';
export type Options = {
  pattern: string;
};

type TokenLocation = {
  line: number;
  column: number;
};

export enum TokenType {
  LineComment = 'LineComment',
  BlockComment = 'BlockComment',
}

export type Token = EsprimaToken & {
  type: TokenType;
  loc: { start: TokenLocation; end: TokenLocation };
};
